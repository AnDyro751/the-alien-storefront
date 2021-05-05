import Link from "next/link";
import Image from "next/image";
const EmptyRecords = ({ text }) => {
  return (
    <div className="h-screen w-11/12 flex-wrap mx-auto flex items-center justify-center">
      <div className="w-full relative flex-wrap mx-auto flex items-center justify-center ">
        <div className="w-full text-center">
          <h1 className="text-4xl w-full font-medium">{text}</h1>
          <div className="relative h-60 w-full my-20">
            <Image
              src="v1620062669/kingdom-list-is-empty_iab9dw.png"
              layout="fill"
              quality={50}
              objectFit="contain"
            />
          </div>
        </div>
        <div className="flex mt-12">
          <Link href={`/products`}>
            <a className="bg-black hover:bg-gray-800 transition duration-200 text-white rounded py-3 px-8 focus:outline-none">
              Explorar productos
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyRecords;
