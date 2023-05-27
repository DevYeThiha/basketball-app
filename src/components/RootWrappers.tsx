"use client";

// import { wrapper } from "@/store";
import { createWrapper } from "@/next-redux-wrapper";
import { PersistGate } from "redux-persist/integration/react";
import { useStore } from "react-redux";
import { ReactNode } from "react";
import { AppStore, makeStore } from "@/store";

interface RootWrappersProps {
  children: ReactNode | ReactNode[] | undefined;
}

const wrapper = createWrapper<AppStore>(makeStore);

const RootWrappers: React.FC<RootWrappersProps> = ({ children }) => {
  const store: any = useStore();
  
  return (
    <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
      {children}
    </PersistGate>
  );
};

export default wrapper.withRedux(RootWrappers);
