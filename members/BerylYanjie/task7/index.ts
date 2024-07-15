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
        //input:PreContractCallInput，可以从这个文件中获取当前call的信息（input.call.xxx)
        //或是当前block的信息（input.block.xxx)
        const interval = sys.aspect.property.get<u64>("interval");
        const limit = sys.aspect.property.get<u64>("limit");
        const contractAddress = uint8ArrayToHex(input.call!.to);
        const from = uint8ArrayToHex(input.call!.from);
        //input.call!.from直接返回的是raw bytes不好处理，通过uint8ArrayToHex可以获得16进制结果
        //如果想要控制效率或控制开销，直接使用uint8Array就可以
        //目前aspect中使用的还都是kv存储，没有支持结构化存储
        const storagePrefix='${contractAddress}:${from}';

        // read the throttle config from the properties and decode

        // get the contract address, from address and build the storage prefix

        // load the current block timestamp

        //有一些需要的数据可能没法直接从aspect中获取，需要利用底层host API获取
        const blockTimeBytes = sys.hostApi.runtimeContext.get('block.header.timestamp');
        const blockTime = Protobuf.decode<UintData>(blockTimeBytes,UintData.decode).data;

        // load last execution timestamp
        const lastExecState=sys.aspect.mutableState.get<u64>(storagePrefix+'lastExecAt');
        //如果是第一次访问，没有存储的话，默认是0
        const lastExec = lastExecState.unwrap();

        // check if the throttle interval has passed, revert if not
        if (lastExec>0 && (blockTime-lastExec)<interval){
            sys.revert('throttler');
        }

        // check if the throttle limit has been reached, revert if so
        const execTimeState=sys.aspect.mutableState.get<u64>(storagePrefix+'execTimes');
        const execTime = execTimeState.unwrap();
        if (limit && execTime>=limit){
            sys.revert("execution time exceeded");
        }


        // update the throttle state
        execTimeState.set(execTime+1);
        lastExecState.set(blockTime);
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

