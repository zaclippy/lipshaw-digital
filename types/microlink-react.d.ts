declare module "@microlink/react" {
  import type { ComponentType, CSSProperties } from "react";

  interface MicrolinkProps {
    url: string;
    size?: "normal" | "large";
    media?: string | string[];
    lazy?: boolean | { threshold?: number };
    style?: CSSProperties;
    className?: string;
    contrast?: boolean;
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    [key: string]: unknown;
  }

  const Microlink: ComponentType<MicrolinkProps>;
  export default Microlink;
}
