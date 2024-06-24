import AddImage from "@/public/assets/images/offer.jpg";
import Image from "next/image";
export default function AddSection() {
  return (
    <div class="container pb-16">
      <a href="#">
        <Image
          src={AddImage}
          width={500}
          height={500}
          alt="ads"
          class="w-full"
        />
      </a>
    </div>
  );
}
