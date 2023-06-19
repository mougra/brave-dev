import styled from 'styled-components'

const StyledHamburger = styled.button<{ isOpen: boolean }>`
  position: absolute;
  left: ${({ isOpen }) => (isOpen ? '17rem' : '1.225rem')};
  top: 30px;

  width: 2rem;
  height: 2rem;
  padding: 0;
  background: transparent;

  display: flex;
  flex-direction: column;
  justify-content: space-around;

  border: none;
  cursor: pointer;
  outline: none;
  z-index: 20;

  div {
    position: relative;
    width: 2rem;
    height: 0.25rem;
    border-radius: 10px;
    transition: all 0.3s linear;
    transform-origin: 1px;
    background-color: ${({ isOpen }) => (isOpen ? '#000000' : '#000000')};

    &:first-child {
      transform: ${({ isOpen }) => (isOpen ? 'rotate(45deg)' : 'rotate(0)')};
    }

    &:nth-child(2) {
      opacity: ${({ isOpen }) => (isOpen ? '0' : '1')};
      transform: ${({ isOpen }) =>
        isOpen ? 'translateX(20px)' : 'translateX(0)'};
    }

    &:nth-child(3) {
      transform: ${({ isOpen }) => (isOpen ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`

export type Props = {
  isOpen: boolean
  setIsOpen: (v: boolean) => void
}

const Hamburger = ({ isOpen, setIsOpen }: Props) => (
  <StyledHamburger isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
    <div />
    <div />
    <div />
  </StyledHamburger>
)

export default Hamburger
