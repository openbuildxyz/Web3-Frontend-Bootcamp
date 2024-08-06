## 补充代码
```js
 preContractCall(input: PreContractCallInput): void {
    // read the throttle config from the properties and decode
    const interval = sys.aspect.property.get<u64>("interval");
    const limit = sys.aspect.property.get<u64>("limit");

    // get the contract address, from address and build the storage prefix
    const contractAddress = uint8ArrayToHex(input.call!.to);
    const from = uint8ArrayToHex(input.call!.from);
    const storagePrefix = `{${contractAddress}:${from}`;

    // load the current block timestamp
    const blockTimeBytes = sys.hostApi.runtimeContext.get(
      "block.header.timestamp"
    );
    const blockTime = Protobuf.decode<UintData>(
      blockTimeBytes,
      UintData.decode
    ).data;

    // load last execution timestamp
    const lastExecState = sys.aspect.mutableState.get<u64>(
      storagePrefix + "lastExecAt"
    );
    const lastExec = lastExecState.unwrap();

    // check if the throttle interval has passed, revert if not
    if (lastExec > 0 && blockTime - lastExec < interval) {
      sys.revert("throttled");
    }

    // check if the throttle limit has been reached, revert if so
    const execTimeState = sys.aspect.mutableState.get<u64>(
      storagePrefix + "execTimes"
    );
    const execTimes = execTimeState.unwrap();
    if (limit && execTimes >= limit) {
      sys.revert("execution time exceeded");
    }

    // update the throttle state
    execTimeState.set(execTimes + 1);
    lastExecState.set(blockTime);
  }
```

## 创建账户
```bash
npm run account:create

> account:create
> node scripts/create-account.cjs

address:  0xDdBb67793d9b58aFD533fb957340F20101296ab5
```

## discord领水
> https://discord.com/invite/artela
```
$request 0xDdBb67793d9b58aFD533fb957340F20101296ab5
```

## 部署合约
- **安装solc**
```bash
brew update
brew upgrade
brew tap ethereum/ethereum
brew install solidity
```

- **编译**
```bash
npm run contract:build

> contract:build
> solc -o ./build/contract/ --via-ir --abi --storage-layout --bin ./contracts/*.sol --overwrite

Compiler run successful. Artifact(s) can be found in directory "./build/contract/".
```

- **部署**
```bash
npm run contract:deploy

> contract:deploy
> node scripts/contract-deploy.cjs --name Counter

from address:  0xDdBb67793d9b58aFD533fb957340F20101296ab5
deploy contract tx hash: 0x516c55936f591c8a57bb37734c0d02375791614ffbdea68de0b44d3b2bff555c
{
  blockHash: '0x7966fd84640dce2bfb08447ab54dbd570fd574849a9249dbb0ff3cd6f50bcf0a',
  blockNumber: 11118649,
  contractAddress: '0x15a17C5D61f7E0cD5d1cde747831D0D18c137e17',
  cumulativeGasUsed: 3948074,
  from: '0xddbb67793d9b58afd533fb957340f20101296ab5',
  gasUsed: 7000001,
  logs: [],
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: null,
  transactionHash: '0x516c55936f591c8a57bb37734c0d02375791614ffbdea68de0b44d3b2bff555c',
  transactionIndex: 5,
  type: '0x0'
}
contract address:  0x15a17C5D61f7E0cD5d1cde747831D0D18c137e17
--contractAccount 0xDdBb67793d9b58aFD533fb957340F20101296ab5 --contractAddress 0x15a17C5D61f7E0cD5d1cde747831D0D18c137e17
```

## 编译Aspect
> 安装依赖：`npm install -g assemblyscript`

```bash
npm run aspect:build

> aspect:build
> npm run asbuild:debug && npm run asbuild:release

> asbuild:debug
> asc aspect/index.ts --disable bulk-memory --optimize --debug --runtime stub --exportRuntime --exportStart __aspect_start__ --target debug

> asbuild:release
> asc aspect/index.ts --disable bulk-memory --optimize --debug --runtime stub --exportRuntime --exportStart __aspect_start__ --target release
```

## 部署Aspect
```bash
node scripts/aspect-deploy.cjs --interval 5 --limit 2
from address:  0xDdBb67793d9b58aFD533fb957340F20101296ab5
[
  { key: 'interval', value: Uint8Array(2) [ 0, 5 ] },
  { key: 'limit', value: Uint8Array(2) [ 0, 2 ] }
]
sending signed transaction...
{
  blockHash: '0x21835c5a6af10d8bc42371219f8bbb04944b2b41af8207890a8ada906b6805d9',
  blockNumber: 11119552,
  contractAddress: null,
  cumulativeGasUsed: 0,
  from: '0xddbb67793d9b58afd533fb957340f20101296ab5',
  gasUsed: 9000001,
  logs: [],
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: '0x0000000000000000000000000000000000a27e14',
  transactionHash: '0xc10e374eaae5bd5bb718c942c8c90ba4d07be0e385cfe2de3eaa34c20a04fd79',
  transactionIndex: 0,
  type: '0x0',
  aspectAddress: '0xF02679C3e98B49F8A0BEb8990bBc5e3DAC8EF934'
}
ret:  {
  blockHash: '0x21835c5a6af10d8bc42371219f8bbb04944b2b41af8207890a8ada906b6805d9',
  blockNumber: 11119552,
  contractAddress: null,
  cumulativeGasUsed: 0,
  from: '0xddbb67793d9b58afd533fb957340f20101296ab5',
  gasUsed: 9000001,
  logs: [],
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: '0x0000000000000000000000000000000000a27e14',
  transactionHash: '0xc10e374eaae5bd5bb718c942c8c90ba4d07be0e385cfe2de3eaa34c20a04fd79',
  transactionIndex: 0,
  type: '0x0',
  aspectAddress: '0xF02679C3e98B49F8A0BEb8990bBc5e3DAC8EF934'
}
== deployed aspectID == 0xF02679C3e98B49F8A0BEb8990bBc5e3DAC8EF934
```

## 绑定Aspect
```bash
node scripts/bind.cjs --contract 0x15a17C5D61f7E0cD5d1cde747831D0D18c137e17 --aspectId 0xF02679C3e98B49F8A0BEb8990bBc5e3DAC8EF934

{
  blockHash: '0x1f98c2d633946f4049b24cadcb52a85b73d4bd65091ce4534c43281998f43f2a',
  blockNumber: 11119630,
  contractAddress: null,
  cumulativeGasUsed: 42000,
  from: '0xddbb67793d9b58afd533fb957340f20101296ab5',
  gasUsed: 9000001,
  logs: [],
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: '0x0000000000000000000000000000000000a27e14',
  transactionHash: '0xf2e1cfcd8afe8804613c44a9ac7428e4119f4180cd517d6f28518d803ce561ee',
  transactionIndex: 2,
  type: '0x0'
}
== aspect bind success ==
```

## 查询合约绑定的情况
```bash
node scripts/get-bound-aspect.cjs --contract 0x15a17C5D61f7E0cD5d1cde747831D0D18c137e17
bound aspects : 0xF02679C3e98B49F8A0BEb8990bBc5e3DAC8EF934,1,1
```

## 限流测试
```bash
node scripts/batch-test.cjs --contract 0x15a17C5D61f7E0cD5d1cde747831D0D18c137e17
```