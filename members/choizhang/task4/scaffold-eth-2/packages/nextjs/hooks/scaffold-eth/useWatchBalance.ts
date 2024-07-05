import { useEffect } from "react";
import { useTargetNetwork } from "./useTargetNetwork";
import { useQueryClient } from "@tanstack/react-query";
import { UseBalanceParameters, useBalance, useBlockNumber } from "wagmi";

/**
 * 包装wagmi的useBalance钩子。每当区块变化时自动更新余额数据。
 * @param useBalanceParameters 查询余额所需的参数，包括地址及其他配置项。
 * @returns 返回useBalance钩子的结果，包含余额信息及相关功能。
 */
export const useWatchBalance = (useBalanceParameters: UseBalanceParameters) => {
  // 获取目标网络信息
  const { targetNetwork } = useTargetNetwork();
  // 获取react-query客户端实例
  const queryClient = useQueryClient();
  // 查询当前区块号并设置自动更新，以便区块变动时重新获取
  const { data: blockNumber } = useBlockNumber({ watch: true, chainId: targetNetwork.id });
  // 使用useBalance钩子获取余额信息，并提取queryKey以备后续查询失效操作
  const { queryKey, ...restUseBalanceReturn } = useBalance(useBalanceParameters);

  // 当区块号发生变化时，使查询失效以触发动态获取最新的余额数据
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockNumber]);

  // 返回useBalance钩子的结果，但不包括queryKey部分
  return restUseBalanceReturn;
};