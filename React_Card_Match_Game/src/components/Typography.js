import styled from 'styled-components'


export const H2 = styled.h2`
  font-size: 1.5em;
  text-align: center;
  color: chocolate;
`;

export const H1 = styled.h1`
  font-size: 2em;
  text-align: center;
  color: ${props => props.green ? 'green' : 'chocolate'};
`;


