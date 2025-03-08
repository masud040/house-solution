import Image from "next/image";
import LoadingIcon from "/public/assets/images/icons/loading.svg";
export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 mx-auto mt-[135px] md:mt-[146px] cursor-wait bg-black/30">
      <div className="flex items-center h-[calc(100vh-135px)] md:h-[calc(100vh-146px)] justify-center">
        <div className="text-3xl w-fit text-primary ">
          <Image src={LoadingIcon} alt="Loading..." width={200} height={200} />
        </div>
      </div>
    </div>
  );
}
