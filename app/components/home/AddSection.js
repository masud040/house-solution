import AddImage from "@/public/assets/images/offer.jpg";
import Image from "next/image";
export default function AddSection() {
  return (
    <div className="mb-14">
      <a href="#">
        <Image
          src={AddImage}
          width={500}
          height={500}
          alt="ads"
          className="w-full"
        />
      </a>
    </div>
  );
}
