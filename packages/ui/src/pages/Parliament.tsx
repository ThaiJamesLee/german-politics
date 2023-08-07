import "./windcutStyle.module.css";

import {
  AnalyticalTable,
  Card,
  CardHeader,
  FlexBox,
  FlexBoxWrap,
  NumericSideIndicator,
  Text,
  Title,
} from "@ui5/webcomponents-react";
import {
  fetchAllPoliticians,
  fetchPartiesByParliament,
  fetchPoliticiansByParliaments,
} from "../components/fetchParliamentData";

import CustomPage from "../components/Page";
import { PieChart } from "@ui5/webcomponents-react-charts";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

type Politician = {
  firstName: string;
  lastName: string;
  party: string;
  birthYear: number;
};

const PoliticiansTable = ({ parliamentId }: { parliamentId: string }) => {
  const allPoliticians = useQuery("allPoliticians", fetchAllPoliticians);
  const politiciansByParliaments = useQuery(
    "politiciansByParliaments",
    fetchPoliticiansByParliaments
  );

  const dataIsLoading = () => {
    return allPoliticians.isLoading || politiciansByParliaments.isLoading;
  };

  const politiciansInParliament = useMemo(() => {
    if (!allPoliticians.data || !politiciansByParliaments.data) return [];
    const foundPoliticians: Politician[] = [];
    for (const politicianId of politiciansByParliaments.data[parliamentId]) {
      const found = allPoliticians.data.find(
        (entry) => entry.data.id === politicianId
      );

      if (found) {
        foundPoliticians.push({
          firstName: found.data.first_name,
          lastName: found.data.last_name,
          party: found.data.party.label,
          birthYear: found.data.year_of_birth,
        });
      }
    }
    return foundPoliticians;
  }, [allPoliticians, politiciansByParliaments, parliamentId]);

  return (
    <AnalyticalTable
      data={politiciansInParliament}
      data-native-scrollbar
      filterable={true}
      loading={dataIsLoading()}
      style={{}}
      columns={[
        { accessor: "firstName", Header: "First Name" },
        { accessor: "lastName", Header: "Last Name" },
        { accessor: "party", Header: "Party" },
        { accessor: "birthYear", Header: "Year of Birth" },
      ]}
    ></AnalyticalTable>
  );
};

const Parliament = () => {
  const { parliamentId } = useParams();
  const politiciansByParliament = useQuery(
    "politiciansByParliaments",
    fetchPoliticiansByParliaments
  );

  const numberOfPoliticians = useMemo(() => {
    if (!politiciansByParliament.data || !parliamentId) return 0;
    return politiciansByParliament.data[parliamentId].length;
  }, [politiciansByParliament, parliamentId]);

  const partiesByParliaments = useQuery(
    "partiesByParliaments",
    fetchPartiesByParliament
  );

  const partiesByParliament = useMemo(() => {
    if (!partiesByParliaments.data || !parliamentId) return [];
    return partiesByParliaments.data[parliamentId];
  }, [partiesByParliaments, parliamentId]);

  return (
    <CustomPage>
      <Title>{parliamentId}</Title>
      <Text>{`Total Number of Politicians: ${numberOfPoliticians}`}</Text>
      <Card
        header={
          <CardHeader titleText={`Number of Members in ${parliamentId}`}>
            <NumericSideIndicator
              number={numberOfPoliticians}
              titleText="Total Number of Politicians"
            />
          </CardHeader>
        }
      >
        <PieChart
          dataset={partiesByParliament}
          measure={{ accessor: "members" }}
          dimension={{ accessor: "party" }}
        />
      </Card>
      <FlexBox wrap={FlexBoxWrap.Wrap}>
        <Card header={<CardHeader titleText="Politicians"></CardHeader>}>
          <PoliticiansTable parliamentId={parliamentId || ""} />
        </Card>
      </FlexBox>
    </CustomPage>
  );
};

export default Parliament;
