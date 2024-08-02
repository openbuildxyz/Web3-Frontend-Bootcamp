
import {
  allocate,
  entryPoint,
  execute,
  IPostContractCallJP,
  PostContractCallInput,
  PreContractCallInput,
  sys,
  uint8ArrayToHex,
  UintData
} from "@artela/aspect-libs";
import { Protobuf } from "as-proto/assembly/Protobuf";
/**
 * Please describe what functionality this aspect needs to implement.
 *
 * About the concept of Aspect @see [join-point](https://docs.artela.network/develop/core-concepts/join-point)
 * How to develop an Aspect  @see [Aspect Structure](https://docs.artela.network/develop/reference/aspect-lib/aspect-structure)
 */
class Aspect implements IPostContractCallJP {

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

  PreContractCallInput(input: PreContractCallInput): void {
    // 限流器（假设限制间隔时间、限制次数）
    const interval = sys.aspect.property.get<u64>("interval");
    const limit = sys.aspect.property.get<u64>("limit");

    // 定制化存储
    const constractAddress: string = uint8ArrayToHex(input.call!.to);
    const from: string = uint8ArrayToHex(input.call!.from);
    const storagePrefix: string = `${constractAddress}-${from}`;

    // 获取当前时间
    const blockTimeBytes = sys.hostApi.runtimeContext.get('block.header.number');
    const blockTime = Protobuf.decode<UintData>(blockTimeBytes, UintData.decode).data;

    // 获取用户上次点击的时间
    const lastExecSate = sys.aspect.mutableState.get<u64>(storagePrefix + 'lastExecAt');
    const lastExecAt = lastExecSate.unwrap();

    // 间断时间限制
    if (lastExecAt > 0 && (blockTime - lastExecAt) < interval) {
      sys.revert("too frequent");
    }

    // 获取上次次数
    const execCountState = sys.aspect.mutableState.get<u64>(storagePrefix + 'limitCount');
    const execCount = execCountState.unwrap();
    // 限制次数
    if (execCount > 0 && execCount >= limit) {
      sys.revert("too many");
    }

    // 点击 + 1
    execCountState.set(execCount + 1);
    // 更新上次点击时间
    lastExecSate.set(blockTime);
  }

  /**
   * postContractCall is a join-point which will be invoked after a contract call has finished.
   *
   * @param input input to the current join point
   */
  postContractCall(input: PostContractCallInput): void {
    // Implement me...
  }
}

// 2.register aspect Instance
const aspect = new Aspect()
entryPoint.setAspect(aspect)

// 3.must export it
export { execute, allocate }

