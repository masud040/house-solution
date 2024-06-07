import Image from "next/image";

import MethodImg from "@/public/assets/images/methods.png";
export default function CopyRight() {
  return (
    <div className="py-4 bg-gray-800">
      <div className="container flex items-center justify-between">
        <p className="text-white">&copy; TailCommerce - All Right Reserved</p>
        <div>
          <Image src={MethodImg} alt="methods" className="h-5" />
        </div>
      </div>
    </div>
  );
}
