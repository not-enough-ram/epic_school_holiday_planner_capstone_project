import styled from "styled-components/macro";
import { useHistory } from "react-router-dom";

export default function Holidays({ holidays }) {
  let history = useHistory();
  function handleClick() {
    history.push("/details/" + holidays.name);
  }
  return (
    <Holiday>
      <div>
        <h1>{holidays?.name}</h1>
      </div>
      <h3>Beginnen: {holidays?.startDate}</h3>
      <h3>Enden: {holidays?.endDate}</h3>
      <button onClick={handleClick}>Details</button>
    </Holiday>
  );
}

const Holiday = styled.section`
  display: flex;
  flex-direction: column;
`;
