import styled from 'styled-components'

// language=SCSS prefix=dummy{ suffix=}
const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  display: flex;

  &:hover {
    opacity: 0.7;
  }

  &:focus {
    outline: 0;
  }
`

export default Button
