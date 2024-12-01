import { FaceSmileIcon } from "@heroicons/react/24/outline";

const Success = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <FaceSmileIcon className="h-5 w-5" />
      </div>
      <div>Transaction finished!!</div>
    </div>
  );
};

export default Success;
