import { FlexBox, List, StandardListItem } from "@ui5/webcomponents-react";

import { BarChart } from "@ui5/webcomponents-react-charts";
import CustomPage from "../components/Page";

const Home = () => {
  return (
    <CustomPage>
      <FlexBox wrap="Wrap">
        <List headerText="Parliaments">
          <StandardListItem>Bundestag</StandardListItem>
        </List>
      </FlexBox>
      <BarChart
        dataset={[
          {
            name: "January",
            sessions: 300,
            users: 100,
            volume: 756,
          },
          {
            name: "February",
            sessions: 330,
            users: 230,
            volume: 880,
          },
          {
            name: "March",
            sessions: 404,
            users: 240,
            volume: 700,
          },
          {
            name: "April",
            sessions: 80,
            users: 280,
            volume: 604,
          },
          {
            name: "May",
            sessions: 300,
            users: 100,
            volume: 756,
          },
          {
            name: "June",
            sessions: 330,
            users: 230,
            volume: 880,
          },
          {
            name: "July",
            sessions: 470,
            users: 20,
            volume: 450,
          },
          {
            name: "August",
            sessions: 180,
            users: 220,
            volume: 104,
          },
          {
            name: "September",
            sessions: 360,
            users: 200,
            volume: 879,
          },
          {
            name: "October",
            sessions: 500,
            users: 250,
            volume: 200,
          },
          {
            name: "November",
            sessions: 404,
            users: 240,
            volume: 700,
          },
          {
            name: "December",
            sessions: 80,
            users: 280,
            volume: 604,
          },
        ]}
        dimensions={[
          {
            accessor: "name",
          },
        ]}
        measures={[
          {
            accessor: "users",
            label: "Users",
            opacity: 0.6,
          },
          {
            accessor: "sessions",
            hideDataLabel: true,
            label: "Active Sessions",
          },
          {
            accessor: "volume",
            label: "Vol.",
          },
        ]}
        onClick={function ka() {}}
        onDataPointClick={function ka() {}}
        onLegendClick={function ka() {}}
      />
    </CustomPage>
  );
};

export default Home;
