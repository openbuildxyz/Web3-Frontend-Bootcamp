import { useAccount, useReadContract } from "wagmi";
import { contractInfo } from "./utils/const";
import { AppLayout } from "./components/AppLayout";
import { RouterProvider } from "react-router-dom";
import { routers } from "./pages/routes";
function App() {
  const { address } = useAccount();
  const { data: paymentToken } = useReadContract({
    abi: contractInfo.Market.abi,
    address: contractInfo.Market.address,
    functionName: "paymentToken",
  });

  console.log(paymentToken, address);
  return (
    <AppLayout>
      <RouterProvider router={routers} />
    </AppLayout>
  );
}

export default App;
