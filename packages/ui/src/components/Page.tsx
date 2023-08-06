import { CSSProperties } from "react";

interface Properties {
  children: React.ReactNode;
  style?: CSSProperties;
  className?: string;
}

const CustomPage: React.FunctionComponent<Properties> = ({
  children,
  style,
  className,
}) => {
  return (
    <div
      className={className}
      style={{
        padding: "40px",
        display: "flex",
        gap: "30px",
        flexDirection: "column",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default CustomPage;
