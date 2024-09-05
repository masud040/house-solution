import DeliveryVanImage from "@/public/assets/images/icons/delivery-van.svg";
import MoneyReturnImage from "@/public/assets/images/icons/money-back.svg";
import ServiceImage from "@/public/assets/images/icons/service-hours.svg";
import Image from "next/image";

export default function Features() {
  return (
    <div className="my-14">
      <div className="w-10/12 grid-cols-1 gap-6 mx-auto grid-center md:grid-cols-3">
        <div className="features-card">
          <div className="relative size-12">
            <Image
              src={DeliveryVanImage}
              alt="Free Delivery"
              className="object-contain"
              fill
            />
          </div>
          <div>
            <h4 className="capitalize h4-medium">Free Shipping</h4>
            <p className="text-sm text-gray-500">Order over $200</p>
          </div>
        </div>
        <div className="features-card">
          <div className="relative size-12">
            <Image
              src={MoneyReturnImage}
              alt="Money Return"
              className="object-contain"
              fill
            />
          </div>
          <div>
            <h4 className="capitalize h4-medium">Money Returns</h4>
            <p className="text-sm text-gray-500">30 days money returs</p>
          </div>
        </div>
        <div className="features-card">
          <div className="relative size-12">
            <Image
              src={ServiceImage}
              alt="Support"
              className="object-contain"
              fill
            />
          </div>
          <div>
            <h4 className="capitalize h4-medium">24/7 Support</h4>
            <p className="text-sm text-gray-500">Customer support</p>
          </div>
        </div>
      </div>
    </div>
  );
}
