import Image from "next/image";

import MethodImg from "@/public/assets/images/methods.png";
export default function CopyRight() {
  return (
    <div className="py-6 bg-secondary-darkist">
      <div className="container flex-between">
        <p className="text-background-light">
          &copy; TailCommerce - All Right Reserved
        </p>
        <div>
          <Image src={MethodImg} alt="methods" className="h-5" />
        </div>
      </div>
    </div>
  );
}
