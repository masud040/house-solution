"use client";
import AddImage from "@/public/assets/images/offer.jpg";
import { Parallax } from "react-parallax";
export default function AddSection() {
  return (
    <Parallax
      bgImage={AddImage.src}
      bgImageAlt="banner"
      strength={200}
      blur={{ min: -15, max: 15 }}
      className="py-9 h-[200px] mb-14"
    ></Parallax>
  );
}
