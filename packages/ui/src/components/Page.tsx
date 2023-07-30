import CustomShellBar from "./ShellBar";
import { Page } from "@ui5/webcomponents-react";

const CustomPage: React.FunctionComponent<{
  children: React.ReactNode;
}> = (props: { children: React.ReactNode }) => {
  return (
    <Page>
      <CustomShellBar />
      <div
        className="content"
        style={{ position: "absolute", width: "100%", height: "80%" }}
      >
        {props.children}
      </div>
    </Page>
  );
};

export default CustomPage;
