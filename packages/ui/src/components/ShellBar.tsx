import {
  Icon,
  Input,
  ShellBar,
  StandardListItem,
} from "@ui5/webcomponents-react";

import { useNavigate } from "react-router-dom";

const CustomShellBar = () => {
  const navigate = useNavigate();

  const onLogoClickHandler = () => {
    navigate("/");
  };

  const onClickListItemHandler = (parliamentId: string) => {
    navigate(`/parliament/${parliamentId}`);
  };

  const parliaments = [
    "Bundestag",
    "EU-Parlament",
    "Landtage",
    "Bürgerschaften",
  ];

  return (
    <ShellBar
      logo={<img alt="Windcut Logo" src="./windcut-logo.png" />}
      onLogoClick={onLogoClickHandler}
      menuItems={
        <>
          {parliaments.map((entry) => {
            return (
              <StandardListItem data-key={entry}>{entry}</StandardListItem>
            );
          })}
        </>
      }
      onMenuItemClick={(e) =>
        onClickListItemHandler(e.detail.item.dataset.key || "")
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
