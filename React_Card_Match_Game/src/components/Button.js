import styled, { css } from 'styled-components'

const Button = styled.button`
    font-family: inherit;
    background: transparent;
    border-radius: 3px;
    border: 2px solid chocolate;
    color: chocolate;
    margin: 0 1em;
    padding: 0.25em 1em;
    transition: all 0.3s ease;
    :hover{
        background: chocolate;
        color: white;
    }
    ${props => props.primary && css`
        background: chocolate;
        color: white;
        :hover{
            background: transparent;
            color: chocolate;
        }
    `}

`

export default Button