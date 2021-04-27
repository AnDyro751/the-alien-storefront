import Image from "next/image";
import ComponentButton from "../Button";
const HomeBanner = () => {
  return (
    <div className="w-full h-screen relative mx-auto">
      <div className="w-full h-screen bg-black z-10 opacity-50 absolute left-0 right-0 top-0 bottom-0"></div>
      <div className="w-11/12 mx-auto h-screen z-20 relative">
        <div className="flex h-full w-full items-center z-20 flex-wrap absolute left-0 right-0 bottom-0 top-0">
          <div className="w-full space-y-6">
            <h1 className="text-6xl font-bold text-white">Alien Store</h1>
            <h2 className="text-2xl text-white font-medium tracking-wide">
              Buy your own lifesize alien doll.
              <br />
              Worlwide shipping
            </h2>
            <ComponentButton text="BUY NOW" href="/" />
          </div>
        </div>
      </div>
      <Image
        src="/images/aa26bd779bb644934077998e83557a6114.jpg"
        layout="fill"
        draggable={false}
        alt={`Alien store home banner with two womans`}
        objectFit="cover"
        quality={60}
      />
    </div>
  );
};

export default HomeBanner;
