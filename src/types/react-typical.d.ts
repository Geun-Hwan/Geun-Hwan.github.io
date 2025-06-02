// src/react-typical.d.ts
declare module "react-typical" {
  import { ComponentType } from "react";

  interface TypicalProps {
    steps: (string | number)[];
    loop?: number | Infinity;
    wrapper?: string;
    className?: string;
  }

  const Typical: ComponentType<TypicalProps>;

  export default Typical;
}
