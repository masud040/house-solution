import DeliveryVanImage from "@/public/assets/images/icons/delivery-van.svg";
import MoneyReturnImage from "@/public/assets/images/icons/money-back.svg";
import ServiceImage from "@/public/assets/images/icons/service-hours.svg";
import Image from "next/image";

export default function Features() {
  return (
    <div className="container py-16">
      <div className="grid justify-center w-10/12 grid-cols-1 gap-6 mx-auto md:grid-cols-3">
        <div className="flex items-center justify-center gap-5 px-3 py-6 border rounded-sm border-primary">
          <Image
            src={DeliveryVanImage}
            alt="Delivery"
            className="object-contain w-12 h-12"
            width={20}
            height={20}
          />
          <div>
            <h4 className="text-lg font-medium capitalize">Free Shipping</h4>
            <p className="text-sm text-gray-500">Order over $200</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-5 px-3 py-6 border rounded-sm border-primary">
          <Image
            src={MoneyReturnImage}
            alt="Delivery"
            className="object-contain w-12 h-12"
            width={20}
            height={20}
          />
          <div>
            <h4 className="text-lg font-medium capitalize">Money Rturns</h4>
            <p className="text-sm text-gray-500">30 days money returs</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-5 px-3 py-6 border rounded-sm border-primary">
          <Image
            src={ServiceImage}
            alt="Delivery"
            className="object-contain w-12 h-12"
            height={20}
            width={20}
          />
          <div>
            <h4 className="text-lg font-medium capitalize">24/7 Support</h4>
            <p className="text-sm text-gray-500">Customer support</p>
          </div>
        </div>
      </div>
    </div>
  );
}
