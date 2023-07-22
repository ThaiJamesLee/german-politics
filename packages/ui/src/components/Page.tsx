import {
  Avatar,
  Icon,
  Input,
  ShellBar,
  ShellBarItem,
  StandardListItem,
} from "@ui5/webcomponents-react";

import React from "react";

const Page: React.FunctionComponent<{ children: React.ReactNode }> = (props: {
  children: React.ReactNode;
}) => {
  return (
    <div>
      <ShellBar
        logo={
          <img
            alt="SAP Logo"
            src="https://sap.github.io/ui5-webcomponents/assets/images/sap-logo-svg.svg"
          />
        }
        menuItems={
          <>
            <StandardListItem data-key="1">Menu Item 1</StandardListItem>
            <StandardListItem data-key="2">Menu Item 2</StandardListItem>
            <StandardListItem data-key="3">Menu Item 3</StandardListItem>
          </>
        }
        notificationsCount="10"
        primaryTitle="Shell Bar"
        profile={
          <Avatar>
            <img src="https://sap.github.io/ui5-webcomponents-react/assets/Person-eb847016.png" />
          </Avatar>
        }
        searchField={
          <Input icon={<Icon interactive name="search" />} showClearIcon />
        }
        secondaryTitle="Fiori 3 Shell Bar"
        showCoPilot
        showNotifications
        showProductSwitch
      >
        <ShellBarItem count="3" icon="add" text="ShellBarItem" />
      </ShellBar>
      {props.children}
    </div>
  );
};

export default Page;
