import Image from "next/image";

import poster from './poster.jpg';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Image className="w-full max-w-5xl mt-10" src={poster} alt="宣传图" />
      <p className="mt-6 text-4xl">😚 敬请期待 😚</p>
    </div>
  );
}
