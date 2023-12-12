import styled from 'styled-components'

const BackgroundFill = styled.div`
  position: absolute;
  filter: blur(8rem);
  z-index: -10;
  height: 100%;
  width: 100%;
  overflow: hidden;
  top: 0;
  left: 0;

  &:before {
    position: absolute;
    content: '';
    opacity: 0.8;
    border-radius: 9999px;
    width: 44rem;
    height: 40rem;
    left: 1rem;
    top: -4rem;
    background-color: rgb(219 39 119);
    z-index: -10;
  }
  &:after {
    position: absolute;
    content: '';
    opacity: 0.8;
    border-radius: 9999px;
    width: 44rem;
    height: 40rem;
    right: 4rem;
    bottom: -20rem;
    background-color: rgb(59 130 246);
    z-index: -10;
  }
`

function Background() {
  return <BackgroundFill />
}

export default Background
