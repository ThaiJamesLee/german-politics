import { FlexBox, List, StandardListItem } from "@ui5/webcomponents-react";

import CustomPage from "../components/Page";
import { fetchParliaments } from "../components/fetchParliamentData";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

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
      <FlexBox wrap="Wrap">
        <List headerText="Parliaments">
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
      </FlexBox>
    </CustomPage>
  );
};

export default Home;
