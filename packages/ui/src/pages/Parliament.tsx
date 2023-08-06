import {
  Card,
  CardHeader,
  NumericSideIndicator,
  Text,
  Title,
} from "@ui5/webcomponents-react";
import {
  fetchPartiesByParliament,
  fetchPoliticiansByParliaments,
} from "../components/fetchParliamentData";

import CustomPage from "../components/Page";
import { PieChart } from "@ui5/webcomponents-react-charts";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

const Parliament = () => {
  const { parliamentId } = useParams();
  const politiciansByParliament = useQuery(
    "politiciansByParliament",
    fetchPoliticiansByParliaments
  );

  const politicians = useMemo(() => {
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
      <Text>{`Total Number of Politicians: ${politicians}`}</Text>
      <Card
        header={
          <CardHeader titleText={`Number of Members in ${parliamentId}`}>
            <NumericSideIndicator
              number={politicians}
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
    </CustomPage>
  );
};

export default Parliament;
