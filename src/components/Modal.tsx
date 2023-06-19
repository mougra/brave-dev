import React, { ReactNode } from 'react'
import styled from 'styled-components'

const ModalContainer = styled.div<{ active: string }>`
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease-in-out;
  z-index: 10;

  opacity: ${({ active }) => (active === 'true' ? '1' : '0')};
  pointer-events: ${({ active }) => (active === 'true' ? 'all' : 'none')};
`
const ModalContent = styled.div<{ active: string }>`
  padding: 1.25rem;
  border-radius: 0.75rem;
  background-color: white;
  transition: all 0.4s ease-in-out;
  max-width: 20rem;
  transform: ${({ active }) => (active === 'true' ? 'scale(1)' : 'scale(0.5)')};

  font-size: 2rem;

  @media (max-width: 622px) {
    margin: 0 1rem;
  }
`
const ModalCloseIcon = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 100px;
  position: absolute;
  top: -50px;
  right: -35px;
  cursor: pointer;

  &:hover {
    background: #fddcc4;
  }
  svg {
    pointer-events: none;
  }

  @media (max-width: 622px) {
    top: -60px;
    right: 0;
  }
`

export type ModalProps = {
  active: boolean
  setActive: (v: boolean) => void
  children: ReactNode
}

const Modal = ({ active, setActive, children }: ModalProps) => {
  return (
    <ModalContainer active={active.toString()} onClick={() => setActive(false)}>
      <ModalContent
        active={active.toString()}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <ModalCloseIcon onClick={() => setActive(false)}>
          <svg
            width='52'
            height='52'
            viewBox='0 0 52 52'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M27.4262 26L31.7046 21.7216C32.0985 21.3277 32.0985 20.6892 31.7046 20.2954C31.3108 19.9016 30.6723 19.9016 30.2785 20.2954L26 24.5739L21.7215 20.2954C21.3276 19.9015 20.6892 19.9015 20.2953 20.2954C19.9016 20.6892 19.9016 21.3277 20.2953 21.7215L24.5738 26L20.2953 30.2785C19.9016 30.6723 19.9016 31.3108 20.2953 31.7046C20.6892 32.0985 21.3276 32.0985 21.7215 31.7046L26 27.4261L30.2785 31.7046C30.6723 32.0985 31.3108 32.0985 31.7046 31.7046C32.0985 31.3108 32.0985 30.6723 31.7046 30.2785L27.4262 26Z'
              fill='#292929'
            ></path>
            <rect
              x='1'
              y='1'
              width='50'
              height='50'
              rx='25'
              stroke='#F1CDB3'
              strokeWidth='2'
            ></rect>
          </svg>
        </ModalCloseIcon>
      </ModalContent>
    </ModalContainer>
  )
}

export default Modal
