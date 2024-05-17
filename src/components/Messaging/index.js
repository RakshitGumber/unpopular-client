import { createContext } from "react";

export { default as MessagingMain } from "./Main/Main";
export { default as MessagingLeft } from "./Left/Leftbar";
export { default as MessagingRight } from "./Right/Rightbar";

export const ControlContext = createContext(null);
