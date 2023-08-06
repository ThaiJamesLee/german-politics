import {
  Card,
  CardHeader,
  List,
  NumericSideIndicator,
  StandardListItem,
  Title,
} from "@ui5/webcomponents-react";
import {
  fetchParliaments,
  fetchPoliticiansByParliaments,
} from "../components/fetchParliamentData";

import CustomPage from "../components/Page";
import { PieChart } from "@ui5/webcomponents-react-charts";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

const Landtage = () => {
  const navigate = useNavigate();

  const onClickParliamentHandler = (parliamentId: string) => {
    navigate(`/parliament/${parliamentId}`);
  };

  const parliaments = useQuery("parliaments", fetchParliaments);
  const politiciansByParliament = useQuery(
    "politiciansByParliament",
    fetchPoliticiansByParliaments
  );

  const politicians = useMemo(() => {
    if (!politiciansByParliament.data) return 0;
    return Object.entries(politiciansByParliament.data)
      .filter(([key, _entry]) => key.startsWith("Landtag"))
      .reduce((acc, curr) => {
        return acc + curr[1].length;
      }, 0);
  }, [politiciansByParliament]);

  const numberPoliticianByLandtag = useMemo(() => {
    if (!politiciansByParliament.data) return [];
    return Object.entries(politiciansByParliament.data)
      .filter(([key, _entry]) => key.startsWith("Landtag"))
      .map(([name, entry]) => {
        return {
          name,
          numbers: entry.length,
        };
      });
  }, [politiciansByParliament]);

  return (
    <CustomPage>
      <Title>Landtage</Title>

      <Card
        header={
          <CardHeader titleText={`Number of Members in Landtage`}>
            <NumericSideIndicator
              number={politicians}
              titleText="Total Number of Politicians"
            />
          </CardHeader>
        }
      >
        <PieChart
          dataset={numberPoliticianByLandtag}
          dimension={{
            accessor: "name",
          }}
          measure={{
            accessor: "numbers",
          }}
        />
      </Card>
      <List title="Landtage">
        {parliaments.data?.landtage.map((entry) => {
          return (
            <StandardListItem
              key={entry.externalName}
              onClick={onClickParliamentHandler.bind(null, entry.externalName)}
            >
              {entry.externalName}
            </StandardListItem>
          );
        })}
      </List>
    </CustomPage>
  );
};

export default Landtage;
