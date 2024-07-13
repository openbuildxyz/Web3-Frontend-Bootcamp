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
import { Protobuf } from "as-proto/assembly";

/**

 */
class Aspect implements IPreContractCallJP {
  /**
   *
   * @param input
   */
  preContractCall(input: PreContractCallInput): void {
    // read the throttle config from the properties and decode
    const interval = sys.aspect.property.get<u64>("interval");
    const limit = sys.aspect.property.get<u64>("limit");

    // get the contract address, from address and build the storage prefix
    const contractAddress = uint8ArrayToHex(input.call!.to);
    const from = uint8ArrayToHex(input.call!.from);
    const storagePrefix = `${contractAddress}:${from}`;

    // load the current block timestamp
    const blockTimeBytes = sys.hostApi.runtimeContext.get(
      "block.header.timestamp"
    );
    const blockTime = Protobuf.decode<UintData>(
      blockTimeBytes,
      UintData.decode
    ).data;

    // load last execution timestamp
    const lastExecAtStatus = sys.aspect.mutableState.get<u64>(
      `${storagePrefix}:lastExecAt`
    );
    const lastExecAt = lastExecAtStatus.unwrap();

    // check if the throttle interval has passed, revert if not
    if (lastExecAt && blockTime - lastExecAt < interval) {
      sys.revert(`Action is throttled. Please wait ${interval} more seconds.`);
    }

    // check if the throttle limit has been reached, revert if so
    const execCountStatus = sys.aspect.mutableState.get<u64>(
      `${storagePrefix}:execCount`
    );
    const execCount = execCountStatus.unwrap();

    if (execCount && execCount >= limit) {
      sys.revert(
        `Action limit reached. You have exceeded the maximum of ${limit} executions.`
      );
    }

    // update the throttle state
    lastExecAtStatus.set(blockTime);
    execCountStatus.set(execCount + 1);
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
const aspect = new Aspect();
entryPoint.setAspect(aspect);

// 3.must export it
export { execute, allocate };
