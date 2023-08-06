import CustomPage from "../components/Page";
import { fetchPoliticiansByParliaments } from "../components/fetchParliamentData";
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

  return (
    <CustomPage>
      <div>{parliamentId}</div>
      <div>{`Total Number of Politicians: ${politicians}`}</div>
    </CustomPage>
  );
};

export default Parliament;
