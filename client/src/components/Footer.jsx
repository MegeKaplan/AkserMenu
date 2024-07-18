import React from "react";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { useLocation } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full h-44 mt-20 bg-slate-100 border-t border-gray-200 p-4 flex flex-col items-center justify-between">
      <div className="w-full flex flex-row justify-center">
        <div className="w-1/2">
          <h1 className="text-red-500 font-bold text-2xl">AkserMenu</h1>
          <p className="text-sm">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        {/* <div className="w-1/2">
          <h1 className="font-bold text-md mb-4">Yönetim paneline erişmek için giriş yapın.</h1>
          <a className="button_style" href="/auth">Giriş Yap</a>
        </div> */}
        <div className="w-1/2">
          {useLocation().pathname !== "/admin" ? (
            <>
              <h1 className="font-bold text-xl mb-2">İletişim ve Adres</h1>
              <div className="w-full flex items-center flex-row my-2">
                <FaPhone />
                <span className="ml-4">+90 554 651 82 13</span>
              </div>
              <div className="w-full flex items-center flex-row my-2">
                <FaLocationDot />
                <span className="ml-4">Serik/Antalya</span>
              </div>
            </>
          ) : (
            <>
              <h1 className="font-bold text-xl mb-4">Anasayfa</h1>
              <a className="button_style" href="/">
                Anasayfaya Dön
              </a>
            </>
          )}
        </div>
      </div>
      <span>AkserMenu &copy; 2024</span>
    </footer>
  );
};

export default Footer;
