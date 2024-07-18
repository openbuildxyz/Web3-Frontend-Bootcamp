import {
    allocate,
    entryPoint,
    execute,
    IPreContractCallJP,
    PreContractCallInput,
    sys,
    uint8ArrayToHex,
    UintData,
} from "@artela/aspect-libs";
import {Protobuf} from "as-proto/assembly";

/**

 */
class Aspect implements IPreContractCallJP {
    /**
     *
     * @param input
     */
    preContractCall(input: PreContractCallInput): void {
        // read the throttle config from the properties and decode
        const interval = sys.aspect.property.get<u64>("interval")
        const limit = sys.aspect.property.get<u64>('limit')

        // get the contract address, from address and build the storage prefix
        const contractAddress = uint8ArrayToHex(input.call!.to);
        const from = uint8ArrayToHex(input.call!.from);
        const storagePrefix = `${contractAddress}:${from}:`

        // load the current block timestamp
        const blockTimeBytes = sys.hostApi.runtimeContext.get('block.header.timestamp')
        const blockTime = Protobuf.decode<UintData>(blockTimeBytes, UintData.decode).data

        // load last execution timestamp
        const lastExecState = sys.aspect.mutableState.get<u64>(storagePrefix + 'lastExecAt')
        const lastExec = lastExecState.unwrap()

        // check if the throttle interval has passed, revert if not
        if (lastExec > 0 && (blockTime - lastExec) < interval) {
            sys.revert('throttled')
        }

        // check if the throttle limit has been reached, revert if so
        const execTimesState = sys.aspect.mutableState.get<u64>(storagePrefix + 'execTimes')
        let execTimes = execTimesState.unwrap()
        if (limit && execTimes >= limit) {
            sys.revert('execution time exceeded')
        }

        // update the throttle state
        execTimesState.set(execTimes + 1)
        lastExecState.set(blockTime)
    }

    /**
     * isOwner is the governance account implemented by the Aspect, when any of the governance operation
     * (including upgrade, config, destroy) is made, isOwner method will be invoked to check
     * against the initiator's account to make sure it has the permission.
     *
     * @param sender address of the transaction
     * @return true if check success, false if check fail
     */
    isOwner(sender: Uint8Array): bool {
        return false;
    }
}

// 2.register aspect Instance
const aspect = new Aspect()
entryPoint.setAspect(aspect)

// 3.must export it
export { execute, allocate }
