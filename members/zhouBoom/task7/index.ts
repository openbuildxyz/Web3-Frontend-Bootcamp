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
        // 读取限流配置
        const interval = sys.aspect.property.get<u64>("interval"); 
        // 次数
        const limit = sys.aspect.property.get<u64>("limit");

        // get the contract address, from address and build the storage prefix
        // 获取当前调用的合约地址
        const contranctAddress = uint8ArrayToHex(input.call!.to);
        // 发送地址
        const from = uint8ArrayToHex(input.call!.from);
        const storagePrefix = `${contranctAddress}:${from}`;

        // load the current block timestamp
        // 获取区块的时间戳,通过底层hostApi获取
        const blockTimeBytes = sys.hostApi.runtimeContext.get<u64>('block.header.timestamp');
        console.log('blockTimeBytes', blockTimeBytes);
        const blockTimes = Protobuf.decode<UintData>(blockTimeBytes, UintData.decode).data;
        console.log('blockTimes', blockTimes);

        // load last execution timestamp
         // 获取最近一次区块的交易,根据获取的合约地址和交易地址组成的key，通过aspect本身存储的数据获取
         const lastExecState = sys.aspect.mutableState.get<u64>(storagePrefix + 'lastExecAt');
         console.log(lastExecState, 'lastExecState');
         const lastExec = lastExecState.unwrap();

        // check if the throttle interval has passed, revert if not
        // 交易回滚
        if (lastExec > 0 && (blockTimes - lastExec) < interval) {
            sys.revert('throttled');
        }
        // check if the throttle limit has been reached, revert if so
        // 检查执行次数
        const execTimeState = sys.aspect.mutableState.get<u64>(storagePrefix + 'execTimes');
        const execTimes = execTimeState.unwrap();
        if (limit && execTimes > limit) {
            sys.revert('exec times exceeded');
        }
        // update the throttle state
        execTimeState.set(execTimes + 1);
        lastExecState.set(blockTimes);
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

