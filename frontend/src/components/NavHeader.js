import { Header, StyledOcticon } from "@primer/components";
import { ListUnorderedIcon } from "@primer/octicons-react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function NavHeader() {
  const { jwtDecoded } = useContext(AuthContext);
  return (
    <Header>
      <Header.Item>
        <Header.Link href="#" fontSize={2}>
          <StyledOcticon icon={ListUnorderedIcon} size={32} mr={2} />
          <span>Menu</span>
        </Header.Link>
      </Header.Item>
      <Header.Item full>Epic Holiday Planner</Header.Item>
      {jwtDecoded && (
        <Header.Item mr={0}>Willkommen {jwtDecoded.sub}</Header.Item>
      )}
    </Header>
  );
}
