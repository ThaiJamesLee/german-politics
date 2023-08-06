import {
  Card,
  CardHeader,
  List,
  StandardListItem,
  Text,
  Title,
} from "@ui5/webcomponents-react";
import {
  fetchParliaments,
  fetchPartiesByParliament,
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

  const partiesByParliaments = useQuery(
    "partiesByParliament",
    fetchPartiesByParliament
  );

  const politicians = useMemo(() => {
    if (!politiciansByParliament.data) return 0;
    return Object.entries(politiciansByParliament.data)
      .filter(([key, _entry]) => key.startsWith("Landtag"))
      .reduce((acc, curr) => {
        return acc + curr[1].length;
      }, 0);
  }, [politiciansByParliament]);

  const memberPartyDistributionInAllLandtage = useMemo(() => {
    if (!partiesByParliaments.data) return [];
    const partyMemberMap: {
      [key: string]: { party: string; members: number };
    } = {};
    for (const [, members] of Object.entries(partiesByParliaments.data).filter(
      ([key, _entry]) => key.startsWith("Landtag")
    )) {
      for (const member of members) {
        if (!partyMemberMap[member.party]) {
          partyMemberMap[member.party] = { party: member.party, members: 0 };
        }

        partyMemberMap[member.party].members += member.members;
      }
    }
    return Object.values(partyMemberMap);
  }, [partiesByParliaments]);

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
      <Text>{`Total Number of Politicians: ${politicians}`}</Text>
      <div style={{ display: "flex", gap: "30px" }}>
        <Card
          header={
            <CardHeader
              titleText={`Number of Members in Landtage`}
            ></CardHeader>
          }
          style={{ width: "600px" }}
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
        <Card
          header={
            <CardHeader titleText="Overall party members in all Landtage"></CardHeader>
          }
          style={{ width: "600px" }}
        >
          <PieChart
            dataset={memberPartyDistributionInAllLandtage}
            dimension={{ accessor: "party" }}
            measure={{ accessor: "members" }}
          />
        </Card>
      </div>
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
