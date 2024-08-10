import {
  allocate,
  entryPoint,
  execute,
  IPostContractCallJP,
  PostContractCallInput,
  IPreContractCallJP,
  PreContractCallInput,
  sys,
  uint8ArrayToHex,
  UintData,
  ethereum,
  hexToUint8Array,
  JitCallBuilder,
  uint8ArrayToString,
} from '@artela/aspect-libs'
import { Protobuf } from 'as-proto/assembly'

/**
 * Throttle the play count and record it in the Artela EVM storage , and then call jit to store it to the Contract storage
 *
 * About the concept of Aspect @see [join-point](https://docs.artela.network/develop/core-concepts/join-point)
 * How to develop an Aspect  @see [Aspect Structure](https://docs.artela.network/develop/reference/aspect-lib/aspect-structure)
 */
class Aspect implements IPostContractCallJP, IPreContractCallJP {
  /**
   * isOwner is the governance account implemented by the Aspect, when any of the governance operation
   * (including upgrade, config, destroy) is made, isOwner method will be invoked to check
   * against the initiator's account to make sure it has the permission.
   *
   * @param sender address of the transaction
   * @return true if check success, false if check fail
   */
  isOwner(sender: Uint8Array): bool {
    return false
  }

  preContractCall(input: PreContractCallInput): void {
    const calledMethod = this.parseCallMethod(uint8ArrayToHex(input.call!.data))

    // method == 'play(tokenID) view'
    if (calledMethod == '0x6898f82b') {
      // read the throttle config from the properties and decode
      const interval = sys.aspect.property.get<u64>('interval')
      const limit = sys.aspect.property.get<u64>('limit')

      // get the contract address, from address and build the storage prefix
      const contractAddress = uint8ArrayToHex(input.call!.to)
      const from = uint8ArrayToHex(input.call!.from)
      const storagePrefix = `${contractAddress}:${from}`

      // load the current block timestamp
      const blockTimeBytes = sys.hostApi.runtimeContext.get(
        'block.header.timestamp'
      )
      const blockTime = Protobuf.decode<UintData>(
        blockTimeBytes,
        UintData.decode
      ).data

      // load last execution timestamp
      const lastExecState = sys.aspect.mutableState.get<u64>(
        storagePrefix + 'lastExecAt'
      )
      const lastExec = lastExecState.unwrap()

      // Play times
      const playTimesExecState = sys.aspect.mutableState.get<u64>(
        storagePrefix + 'playTimes'
      )
      const lastPlayTimesExec = playTimesExecState.unwrap()

      // check if the throttle interval has passed, revert if not
      if (lastExec > 0 && blockTime - lastExec < interval) {
        playTimesExecState.set(lastPlayTimesExec + 1)
        sys.revert('throttled')
      }

      // check if the throttle limit has been reached, revert if so
      const execTimeState = sys.aspect.mutableState.get<u64>(
        storagePrefix + 'execTimes'
      )
      const execTimes = execTimeState.unwrap()
      if (limit && execTimes >= limit) {
        sys.revert('execution limit reached')
      }

      // update the throttle state
      execTimeState.set(execTimes + 1)
      lastExecState.set(blockTime)
      playTimesExecState.set(0)
    }
  }

  /**
   * postContractCall is a join-point which will be invoked after a contract call has finished.
   *
   * @param input input to the current join point
   */
  postContractCall(input: PostContractCallInput): void {
    // get the contract address, from address and build the storage prefix
    const contractAddress = uint8ArrayToHex(input.call!.to)
    const from = uint8ArrayToHex(input.call!.from)
    const storagePrefix = `${contractAddress}:${from}`

    // Play times
    const playTimesExecState = sys.aspect.mutableState.get<u64>(
      storagePrefix + 'playTimes'
    )
    const lastPlayTimesExec = playTimesExecState.unwrap()

    // init jit call
    let playCalldata = ethereum.abiEncode('play', [
      ethereum.Number.fromUint8Array(input.call!.data),
      ethereum.Number.fromU64(lastPlayTimesExec),
    ])

    let request = JitCallBuilder.simple(
      input.call!.from,
      input.call!.to,
      hexToUint8Array(playCalldata)
    ).build()

    // Submit the JIT call
    let response = sys.hostApi.evmCall.jitCall(request)

    // Verify successful submission of the call,
    // call may fail if room is full
    if (!response.success) {
      sys.log(
        `Failed to submit the JIT call, err: ${
          response.errorMsg
        }, ret: ${uint8ArrayToString(response.ret)}`
      )
    } else {
      sys.log(
        `Successfully submitted the JIT call, ret: ${uint8ArrayToString(
          response.ret
        )}`
      )
    }
  }

  parseCallMethod(calldata: string): string {
    if (calldata.startsWith('0x')) {
      return calldata.substring(0, 10)
    }
    return '0x' + calldata.substring(0, 8)
  }
}

// 2.register aspect Instance
const aspect = new Aspect()
entryPoint.setAspect(aspect)

// 3.must export it
export { execute, allocate }
