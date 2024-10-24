import { Toaster } from "./ui/toaster"

import Header from "./header";
import NFTGallery from "./nft-gallery";

export default function Layout() {
  return (
    <>
      <Header />
      <Toaster />
      <NFTGallery/>
    </>
  )
}