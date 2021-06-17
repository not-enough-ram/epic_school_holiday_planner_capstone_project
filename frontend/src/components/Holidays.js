import styled from "styled-components/macro";

export default function Holidays({holidays}) {
    return (
        <Holiday>
            <h1>{holidays.name}</h1>
            <h2>{holidays.startDate}</h2>
            <h2>{holidays.endDate}</h2>
        </Holiday>
    )
}

const Holiday = styled.section`
  background: darkgrey;
`;
