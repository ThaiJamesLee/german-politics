import {
  Icon,
  Input,
  ShellBar,
  StandardListItem,
} from "@ui5/webcomponents-react";

const CustomShellBar = () => {
  return (
    <ShellBar
      logo={<img alt="Windcut Logo" src="/windcut-logo.png" />}
      menuItems={
        <>
          <StandardListItem key={"Bundestag"}>Bundestag</StandardListItem>
          <StandardListItem key={"EU-Parlament"}>EU-Parlament</StandardListItem>
          <StandardListItem key={"Landtage"}>Landtage</StandardListItem>
          <StandardListItem key={"Bürgerschaften"}>
            Bürgerschaften
          </StandardListItem>
        </>
      }
      primaryTitle="Parliaments"
      searchField={
        <Input icon={<Icon interactive name="search" />} showClearIcon />
      }
      secondaryTitle={""}
    ></ShellBar>
  );
};

export default CustomShellBar;
