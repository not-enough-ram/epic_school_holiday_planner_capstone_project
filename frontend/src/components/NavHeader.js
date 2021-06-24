import { Header } from "@primer/components";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import MainMenu from "./MainMenu";

export default function NavHeader() {
  const { jwtDecoded } = useContext(AuthContext);
  return (
    <Header>
      <Header.Item>{jwtDecoded && <MainMenu />}</Header.Item>
      <Header.Item full>Epic Holiday Planner</Header.Item>
      {jwtDecoded && (
        <Header.Item mr={0}>Willkommen {jwtDecoded.sub}</Header.Item>
      )}
    </Header>
  );
}
