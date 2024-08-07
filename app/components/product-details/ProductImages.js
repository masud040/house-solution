"use client";
import Image from "next/image";
import { useState } from "react";
import { NoDataFound } from "../shared/NoDataFound";

export const ProductImages = ({ name, thumbnail, gallery }) => {
  const [selectedImage, setSelectedImage] = useState(thumbnail);
  return (
    <div>
      <Image
        src={selectedImage}
        alt={name}
        className="w-full max-h-[440px]"
        width={500}
        height={500}
      />
      {gallery?.length > 0 ? (
        <div className="grid grid-cols-4 gap-6 mt-4">
          {gallery.slice(0, 4).map((image, ind) => (
            <Image
              onClick={() => setSelectedImage(image)}
              key={ind}
              src={image}
              alt={name}
              className={`w-full h-13 lg:h-20 cursor-pointer ${
                selectedImage === image && "border border-primary"
              }`}
              width={200}
              height={200}
            />
          ))}
        </div>
      ) : (
        <NoDataFound message="No images for this product!" />
      )}
    </div>
  );
};
