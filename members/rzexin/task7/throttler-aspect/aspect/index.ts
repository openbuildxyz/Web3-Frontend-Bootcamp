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

        // get the contract address, from address and build the storage prefix

        // load the current block timestamp

        // load last execution timestamp

        // check if the throttle interval has passed, revert if not

        // check if the throttle limit has been reached, revert if so

        // update the throttle state
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

