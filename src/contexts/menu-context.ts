import { createContext, Dispatch, SetStateAction } from "react";

export interface IMenuContext {
  currentChoosePathParent: string;
  setCurrentChoosePathParent: Dispatch<
    SetStateAction<IMenuContext["currentChoosePathParent"]>
  >;
}

const LargeScreenContext = createContext<IMenuContext>({
  currentChoosePathParent: "", // 指标数据
  setCurrentChoosePathParent: () => {},
});

export default LargeScreenContext;
