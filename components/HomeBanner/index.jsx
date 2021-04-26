import Image from "next/image";
const HomeBanner = () => {
  return (
    <div className="w-full h-screen relative">
      <div className="w-full h-screen bg-black z-10 opacity-50 absolute left-0 right-0 top-0 bottom-0"></div>
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
