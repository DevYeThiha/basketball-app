"use client";

import InputComp from "@/components/InputComp";
import { resetTabs } from "@/slices/tabSlice";
import { resetTeamPlayers } from "@/slices/teamPlayerSlice";
import { resetTeam } from "@/slices/teamSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { ReactNode, createContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

interface AuthProviderProps {
  children: ReactNode | ReactNode[] | undefined;
}

interface AuthContextProps {
  handleLogout: () => void;
}

interface Inputs {
  username: string;
  password: string;
}

const selectedTabStyles =
  "bg-primary-orange text-slate-50 font-bold px-[1rem] py-[0.4rem] rounded shadow text-sm hover:bg-primary-orange/90";

export const AuthContext = createContext({} as AuthContextProps);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });
  const dispatch = useDispatch();
  const { handleSubmit, formState, reset, register, setValue } =
    useForm<Inputs>({
      resolver: yupResolver(validationSchema),
    });

  const handleLogin: SubmitHandler<Inputs> = async (data) => {
    if (data.username && data.password) {
      setIsLogin(true);
      reset();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("persist:nextjs");
    dispatch(resetTabs());
    dispatch(resetTeamPlayers());
    dispatch(resetTeam());
    setIsLogin(false);
  };

  return (
    <AuthContext.Provider value={{ handleLogout }}>
      <div
        className={clsx(
          "fixed top-0 left-0 w-screen h-screen bg-primary-orange flex justify-center transition-opacity duration-[0.5s] ease-linear",
          isLogin
            ? "pointer-events-none opacity-0"
            : "pointer-events-auto opacity-100"
        )}
      >
        <form
          onSubmit={handleSubmit(handleLogin)}
          className={clsx(
            "relative bg-white h-max transition-all duration-[1s] ease min-w-[25rem] py-[2rem] px-[2.5rem] rounded pointer-events-auto",
            isLogin ? "mt-[-100vh]" : "mt-[5rem]"
          )}
        >
          <h3 className="font-bold text-2xl text-center">Login</h3>
          <InputComp
            label="User Name:*"
            name="username"
            hookFormProps={register("username", {
              required: true,
            })}
            error={formState?.errors?.username?.message}
          />
          <InputComp
            label="Password:*"
            name="password"
            hookFormProps={register("password", {
              required: true,
            })}
            error={formState?.errors?.password?.message}
            isPassword
          />
          <div className="flex justify-end gap-2 mt-5 border-t border-t-gray-300 pt-3">
            <button type="submit" className={selectedTabStyles}>
              Login
            </button>
          </div>
        </form>
      </div>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
