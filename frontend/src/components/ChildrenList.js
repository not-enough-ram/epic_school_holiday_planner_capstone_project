import styled from "styled-components/macro";
import Child from "./Child";

export default function ChildrenList({ children }) {
  return (
    <Wrapper>
      {children.map((child) => (
        <Child child={child} />
      ))}
    </Wrapper>
  );
}
const Wrapper = styled.section`
  padding: 10px;
  text-align: left;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;
  margin: 10px;
`;
