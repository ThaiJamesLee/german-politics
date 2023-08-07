import {
  Card,
  CardHeader,
  FlexBox,
  FlexBoxWrap,
  List,
  StandardListItem,
} from "@ui5/webcomponents-react";
import {
  fetchAllPoliticians,
  fetchParliaments,
} from "../components/fetchParliamentData";

import CustomPage from "../components/Page";
import { RETIREMENT_AGE } from "./constants";
import { RadialChart } from "@ui5/webcomponents-react-charts";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

const AveragePoliticianAgeChart = () => {
  const allPoliticians = useQuery("allPoliticians", fetchAllPoliticians);

  const averageAge = useMemo(() => {
    if (!allPoliticians.data) return 0;
    const numberPoliticiansWithBirthdate = allPoliticians.data.filter((entry) =>
      Boolean(entry.data.year_of_birth)
    );
    const currentYear = new Date().getFullYear();

    return Math.round(
      numberPoliticiansWithBirthdate.reduce((acc, curr) => {
        return acc + (currentYear - curr.data.year_of_birth);
      }, 0) / numberPoliticiansWithBirthdate.length
    );
  }, [allPoliticians]);

  return (
    <RadialChart
      color="#f0ab00"
      value={Math.round((100 * averageAge) / RETIREMENT_AGE)}
      displayValue={`${averageAge} Years`}
    />
  );
};

const Home = () => {
  const parliaments = useQuery("parliaments", fetchParliaments);
  const navigate = useNavigate();

  const onClickParliamentHandler = (parliamentId: string) => {
    navigate(`/parliament/${parliamentId}`);
  };

  const parliamentList = useMemo(() => {
    if (!parliaments.data) return [];
    const others = parliaments.data.other.map((entry) => entry.externalName);
    return [...others, "Landtage", "Bürgerschaften"];
  }, [parliaments]);

  return (
    <CustomPage>
      <FlexBox wrap={FlexBoxWrap.Wrap}>
        <Card
          header={
            <CardHeader titleText="Average age of politicians in all parliaments"></CardHeader>
          }
          style={{ width: "400px" }}
        >
          <AveragePoliticianAgeChart />
        </Card>
      </FlexBox>
      <FlexBox wrap="Wrap">
        <Card>
          <List title="Parliaments">
            {parliamentList.map((entry) => {
              return (
                <StandardListItem
                  key={entry}
                  onClick={onClickParliamentHandler.bind(null, entry)}
                >
                  {entry}
                </StandardListItem>
              );
            })}
          </List>
        </Card>
      </FlexBox>
    </CustomPage>
  );
};

export default Home;
