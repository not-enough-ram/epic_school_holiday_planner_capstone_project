import styled from "styled-components/macro";
import { useHistory } from "react-router-dom";

export default function Holidays({ holidays }) {
  let history = useHistory();
  function handleClick() {
    history.push("/details/" + holidays.name);
  }
  return (
    <Holiday>
      <p>{holidays?.name}</p>
      <p>Beginnen: {holidays?.startDate}</p>
      <p>Enden: {holidays?.endDate}</p>
      {/*<button onClick={handleClick}>Details</button>*/}
    </Holiday>
  );
}

const Holiday = styled.section`
  display: flex;
  flex-direction: column;
  border: darkgrey 1px solid;
  border-radius: 5px;
  padding: 5px;
  margin-top: 10px;
`;
