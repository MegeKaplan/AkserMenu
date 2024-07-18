import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAction, registerAction } from "../redux/actions/auth";

const Auth = () => {
  const [signUp, setSignUp] = useState(true);
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
    username: "",
    menuId: "",
  });

  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    // console.log(authData);
    signUp
      ? dispatch(registerAction(authData))
      : dispatch(loginAction(authData));
  };

  return (
    <div className="w-screen h-screen bg-gray-200 flex items-center justify-center">
      <form
        className="w-10/12 md:w-1/3 h-auto min-h-96 bg-slate-100 rounded-md p-4 space flex flex-col space-y-4 items-center justify-center"
        onSubmit={formSubmitHandler}
      >
        <div>
          <h1 className="text-3xl text-center text-red-700 font-bold">
            AkserMenu
          </h1>
          <h3 className="text-xl text-center text-gray-800 font-bold">
            Panele erişmek için
            {signUp ? " Kayıt Ol" : " Giriş Yap"}
          </h3>
        </div>
        <div className="w-full flex flex-col justify-center space-y-1">
          <label className="font-semibold" htmlFor="email">
            Email
          </label>
          <input
            value={authData.email}
            onChange={onChangeHandler}
            name="email"
            className="input_style"
            type="text"
            placeholder="Bir e-posta adresi girmelisiniz"
            id="email"
          />
        </div>
        <div className="w-full flex flex-col justify-center space-y-1">
          <label className="font-semibold" htmlFor="password">
            Şifre
          </label>
          <input
            value={authData.password}
            onChange={onChangeHandler}
            name="password"
            className="input_style"
            type="password"
            placeholder="Bir şifre girmelisiniz"
            id="password"
          />
        </div>
        {signUp ? (
          <span onClick={() => setSignUp(false)} className="cursor-pointer">
            Zaten hesabın var mı?{" "}
            <span className="text-blue-700">Giriş yap</span>.
          </span>
        ) : (
          <span onClick={() => setSignUp(true)} className="cursor-pointer">
            Bir hesabın yok mu?{" "}
            <span className="text-blue-700">Şimdi kayıt ol</span>.
          </span>
        )}
        <button className="button_style">
          {signUp ? "Kayıt Ol" : "Giriş Yap"}
        </button>
      </form>
    </div>
  );
};

export default Auth;
