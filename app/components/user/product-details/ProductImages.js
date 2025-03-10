"use client";
import Image from "next/image";
import { useState } from "react";
import Magnifier from "react-magnifier";
import { NoDataFound } from "../../shared/NoDataFound";

export const ProductImages = ({ name, thumbnail, gallery }) => {
  const [selectedImage, setSelectedImage] = useState(thumbnail);
  return (
    <div>
      <div>
        <Magnifier
          src={selectedImage}
          mgHeight={120}
          mgWidth={120}
          zoomFactor={2.7}
        />
      </div>
      {gallery?.length > 0 ? (
        <div className="w-full mt-4 gap-7 flex-start">
          {gallery.slice(0, 4).map((image, ind) => (
            <div key={ind} className="relative w-16 h-10 lg:w-24 lg:h-16">
              <Image
                onClick={() => setSelectedImage(image)}
                src={image}
                alt={name}
                fill
                className={`object-cover cursor-pointer rounded ${
                  selectedImage === image && "border border-primary-light"
                }`}
              />
            </div>
          ))}
        </div>
      ) : (
        <NoDataFound message="No images for this product!" />
      )}
    </div>
  );
};
