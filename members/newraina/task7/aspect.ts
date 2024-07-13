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
    const prefix = `throttle:${contractAddress}:${from}`;

    // load the current block timestamp
    const blockTimestampBytes = sys.hostApi.runtimeContext.get(
      "block.header.timestamp",
    );
    const blockTimestamp = Protobuf.decode<UintData>(
      blockTimestampBytes,
      UintData.decode,
    ).data;

    // load last execution timestamp
    const lastExecutionState = sys.aspect.mutableState.get<u64>(
      `${prefix}:lastExecution`,
    );
    const lastExecution = lastExecutionState.unwrap();

    // check if the throttle interval has passed, revert if not
    if (lastExecution > 0 && blockTimestamp - lastExecution < interval) {
      sys.revert("throttle interval not passed");
    }

    // check if the throttle limit has been reached, revert if so
    // update the throttle state
    const countState = sys.aspect.mutableState.get<u64>(`${prefix}:count`);
    const count = countState.unwrap();
    if (limit && count >= limit) {
      sys.revert("throttle limit reached");
    }

    // update the throttle state
    countState.set(count + 1);
    lastExecutionState.set(blockTimestamp);
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
