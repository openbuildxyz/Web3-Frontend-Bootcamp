import {
    allocate,
    BlockInput,
    entryPoint,
    execute,
    IPostContractCallJP,
    IPreContractCallJP,
    parseCallMethod,
    PostContractCallInput,
    PreContractCallInput,
    PreExecMessageInput,
    sys,
    uint8ArrayToHex,
} from "@artela/aspect-libs";

/**

 */
class Aspect implements IPreContractCallJP {
    /**
     * 在合约调用之前执行的检查逻辑
     * @param input
     */
    preContractCall(input: PreContractCallInput): void {
        if (!this.validateInput(input)) {
            return;
        }

        const block: BlockInput = input.block!;
        const call = input.call!;
        const config = this.getConfig();
        const methodSig = parseCallMethod(call.data);

        if (methodSig != config.method) {
            return;
        }

        const contractAddress = uint8ArrayToHex(call.to);
        const from = uint8ArrayToHex(call.from);
        const prefix = this.getPrefix(contractAddress, methodSig, from, config.limitBy);
        const currentBlockNumber = block.number;

        const lastExecState = sys.aspect.mutableState.get<u64>(prefix + 'lastExecAt');
        const execTimesState = sys.aspect.mutableState.get<u64>(prefix + 'execTimes');

        const lastExec = lastExecState.unwrap();
        const execTimes = execTimesState.unwrap() || 0;

        if (lastExec && currentBlockNumber - lastExec <= config.interval) {
            if (execTimes >= config.limit) {
                sys.log('THROTTLE exceed limit');
                sys.revert('exceed limit');
                return;
            }

            execTimesState.set(execTimes + 1);
        } else {
            sys.log('THROTTLE first exec or interval exceeded');
            lastExecState.set(currentBlockNumber);
            execTimesState.set(1);
        }
    }

    /**
     * 验证输入
     * @param input
     */
    private validateInput(input: PreContractCallInput): bool {
        if (input.block == null) {
            sys.log('THROTTLE error: missing block');
            return false;
        }

        if (!input.call) {
            sys.log('THROTTLE error: missing contract call info or from address');
            return false;
        }
        
        return true;
    }

    /**
     * 获取配置参数
     */
    private getConfig(): Config {
        const interval: u64 = sys.aspect.property.get<u64>("interval");
        const limit: u64 = sys.aspect.property.get<u64>('limit');
        const limitBy: u8 = sys.aspect.property.get<u8>("limitBy");
        const method: string = sys.aspect.property.get<string>('method');
        return new Config(interval, limit, limitBy, method);
    }

    /**
     * 获取前缀
     * @param contractAddress
     * @param methodSig
     * @param from
     * @param limitBy
     */
    private getPrefix(contractAddress: string, methodSig: string, from: string, limitBy: u8): string {
        switch (limitBy) {
            case 1:
                return `${contractAddress}:${methodSig}:${from}:`;
            case 0:
            default:
                return `${contractAddress}:${methodSig}:`;
        }
    }

    /**
     * 检查调用者是否是所有者
     * @param sender 交易发送者的地址
     * @return true 表示检查通过，false 表示检查失败
     */
    isOwner(sender: Uint8Array): bool {
        return false;
    }
}

class Config {
    interval: u64;
    limit: u64;
    limitBy: u8;
    method: string;

    constructor(interval: u64, limit: u64, limitBy: u8, method: string) {
        this.interval = interval;
        this.limit = limit;
        this.limitBy = limitBy;
        this.method = method;
    }
}

// 注册 Aspect 实例
const aspect = new Aspect();
entryPoint.setAspect(aspect);

// 导出必须的模块
export { execute, allocate };