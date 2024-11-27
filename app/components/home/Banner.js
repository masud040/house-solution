import BannerImage from "@/public/assets/images/banner-bg.jpg";
import Link from "next/link";
export default function Banner() {
  return (
    <div
      className="bg-center bg-no-repeat bg-cover py-9 "
      style={{ backgroundImage: `url(${BannerImage.src})` }}
    >
      <div className="container space-y-8 text-secondary-dark">
        <h1 className="capitalize h3-semibold-lg-h2-semibold">
          best collection for <br />
          home decoration
        </h1>

        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam
          <br />
          accusantium perspiciatis, sapiente magni eos dolorum ex quos dolores
          odio
        </p>
        <div>
          <Link href="#" className="py-3 btn-primary">
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}
