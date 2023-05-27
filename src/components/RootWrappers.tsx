"use client";

import { wrapper } from "@/store";
import { PersistGate } from "redux-persist/integration/react";
import { useStore } from "react-redux";
import { ReactNode } from "react";
import { AppStore } from "@/store";
import AuthProvider from "@/providers/AuthProvider";

interface RootWrappersProps {
  children: ReactNode | ReactNode[] | undefined;
}

const RootWrappers: React.FC<RootWrappersProps> = ({ children }) => {
  const store: any = useStore();

  return (
    <AuthProvider>
      <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
        {children}
      </PersistGate>
    </AuthProvider>
  );
};

export default wrapper.withRedux(RootWrappers);
