import styled from "styled-components/macro";

export default function Holidays({ holidays }) {
  return (
    <Holiday>
      <div>
        <h1>{holidays.name}</h1>
      </div>
      <h3>{holidays.startDate}</h3>
      <h3>{holidays.endDate}</h3>
    </Holiday>
  );
}

const Holiday = styled.section`
  display: flex;
  flex-direction: column;
  background: darkgrey;
  border: black thin;
  border-radius: 25px;
`;
