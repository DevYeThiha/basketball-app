"use client";

import { wrapper } from "@/store";
import { PersistGate } from "redux-persist/integration/react";
import { useStore } from "react-redux";
import { ReactNode } from "react";
import { AppStore } from "@/store";

interface RootWrappersProps {
  children: ReactNode | ReactNode[] | undefined;
}

const RootWrappers: React.FC<RootWrappersProps> = ({ children }) => {
  const store: any = useStore();
  
  return (
    <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
      {children}
    </PersistGate>
  );
};

export default wrapper.withRedux(RootWrappers);
