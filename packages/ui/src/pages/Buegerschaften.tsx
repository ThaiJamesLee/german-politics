import { List, StandardListItem, Title } from "@ui5/webcomponents-react";
import {
  fetchParliaments,
  fetchPoliticiansByParliaments,
} from "../components/fetchParliamentData";

import CustomPage from "../components/Page";
import { PieChart } from "@ui5/webcomponents-react-charts";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

const Buergerschaften = () => {
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
      .filter(([key, _entry]) => key.startsWith("Bürgerschaft"))
      .reduce((acc, curr) => {
        return acc + curr[1].length;
      }, 0);
  }, [politiciansByParliament]);

  const numberPoliticianByBuergerschaften = useMemo(() => {
    if (!politiciansByParliament.data) return [];
    return Object.entries(politiciansByParliament.data)
      .filter(([key, _entry]) => key.startsWith("Bürgerschaft"))
      .map(([name, entry]) => {
        return {
          name,
          numbers: entry.length,
        };
      });
  }, [politiciansByParliament]);

  return (
    <CustomPage>
      <Title>Bürgerschaften</Title>
      {`Total Number of Politicians: ${politicians}`}
      <PieChart
        dataset={numberPoliticianByBuergerschaften}
        dimension={{
          accessor: "name",
        }}
        measure={{
          accessor: "numbers",
        }}
      />
      <List title="Bürgerschaften">
        {parliaments.data?.buergerschaften.map((entry) => {
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

export default Buergerschaften;
