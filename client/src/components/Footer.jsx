import React from "react";

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
        <div className="w-1/2">
          <h1 className="font-bold text-md mb-4">Yönetim paneline erişmek için giriş yapın.</h1>
          <a className="button_style" href="/auth">Giriş Yap</a>
        </div>
      </div>
      <span>AkserMenu &copy; 2024</span>
    </footer>
  );
};

export default Footer;
