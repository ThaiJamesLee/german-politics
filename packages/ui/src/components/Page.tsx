import {
  Avatar,
  Icon,
  Input,
  ShellBar,
  ShellBarItem,
  StandardListItem,
} from "@ui5/webcomponents-react";
import React, { useCallback } from "react";

import { fetchParliaments } from "./fetchParliamentData";
import { useQuery } from "react-query";

const Page: React.FunctionComponent<{ children: React.ReactNode }> = (props: {
  children: React.ReactNode;
}) => {
  const parliaments = useQuery("parliaments", fetchParliaments);

  const getMenuItems = useCallback(() => {
    if (!parliaments.data) return <></>;
    return (
      <>
        {parliaments.data.other.map((entry) => {
          return (
            <StandardListItem key={entry.parliament}>
              {entry.externalName}
            </StandardListItem>
          );
        })}
      </>
    );
  }, [parliaments]);

  return (
    <div>
      <ShellBar
        logo={
          <img
            alt="SAP Logo"
            src="https://sap.github.io/ui5-webcomponents/assets/images/sap-logo-svg.svg"
          />
        }
        menuItems={<>{getMenuItems()}</>}
        primaryTitle="Shell Bar"
        searchField={
          <Input icon={<Icon interactive name="search" />} showClearIcon />
        }
        secondaryTitle="Fiori 3 Shell Bar"
      ></ShellBar>
      {props.children}
    </div>
  );
};

export default Page;
