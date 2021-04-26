import { BiWorld } from "react-icons/bi";
import { Popover } from "@headlessui/react";
import HeadersChangeCurrency from "../Headers/ChangeCurrency";
import HeadersChaneLocale from "../Headers/HeadersChaneLocale";
const HeaderChangeOptions = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <Popover className="relative">
        <Popover.Button>
          <div className="flex items-center p-2 justify-center">
            <BiWorld
              className="text-gray-700"
              title="Change locale and currency"
              size={20}
            />
          </div>
        </Popover.Button>
        <Popover.Panel className="absolute z-20 w-52 bg-white border mt-4 p-3 rounded-md -ml-32 shadow-md">
          <div className="space-y-4">
            <div className="">
              <p className="text-sm text-gray-700 mb-2">Idioma</p>
              <HeadersChaneLocale />
            </div>
            <div className="">
              <p className="text-sm text-gray-700 mb-2">Moneda</p>
              <HeadersChangeCurrency />
            </div>
          </div>
        </Popover.Panel>
      </Popover>
    </div>
  );
};

export default HeaderChangeOptions;
