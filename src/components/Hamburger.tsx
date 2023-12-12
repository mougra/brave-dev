import styled from 'styled-components'

const StyledHamburger = styled.button<{ open: boolean }>`
  position: ${({ open }) => (open ? 'fixed' : 'relative')};
  left: ${({ open }) => (open ? '17rem' : '1.225rem')};

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
    background-color: ${({ open }) => (open ? '#000000' : '#000000')};

    &:first-child {
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
    }

    &:nth-child(2) {
      opacity: ${({ open }) => (open ? '0' : '1')};
      transform: ${({ open }) => (open ? 'translateX(20px)' : 'translateX(0)')};
    }

    &:nth-child(3) {
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`

export type HamburgerProps = {
  isOpen: boolean
  setIsOpen: (v: boolean) => void
}

const Hamburger = ({ isOpen: open, setIsOpen }: HamburgerProps) => (
  <StyledHamburger open={open} onClick={() => setIsOpen(!open)}>
    <div />
    <div />
    <div />
  </StyledHamburger>
)

export default Hamburger
