import { useState } from 'react'
import Logo from '../../public/logo.png'
import Hamburger from './Hamburger'
import styled from 'styled-components'
import { IOperator } from '../models/models'
import Image from 'next/image'
import Link from 'next/link'
import data from '../../public/operator.json'

const Head = styled.header`
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 0.625rem;
  @media (max-width: 992px) {
    padding: 0 1.25rem;
  }
  @media (max-width: 576px) {
    padding: 0 0.75rem;
  }
`

const Burger = styled.div`
  width: 2rem;
`
const BurgerNav = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;

  padding: 1rem;
  font-size: 1.5rem;
`
const HeaderStyle = styled.div`
  padding: 29px 0 25px;
  display: flex;
  justify-content: space-between;
  align-items: start;
`

const StyledMenu = styled.nav<{ open: boolean }>`
  top: 0;
  left: 0;
  height: 100%;
  width: 20rem;
  position: fixed;
  background-color: #fff;
  z-index: 1;

  display: flex;
  flex-direction: column;
  padding: 29px 0;

  z-index: 20;
  border-right: 1px solid #e9e9e9;

  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (!open ? 'translateX(-100%)' : 'translateX(0)')};

  @media (max-width: 400px) {
    width: 100vw;
  }
`

const MenuLogo = styled.div`
  padding-bottom: 18px;
  padding-left: 1.25rem;
`
const ImgContainer = styled.div`
  border-bottom: 1px solid #e9e9e9;
`
const MainLogo = styled.div<{ open: boolean }>`
  height: 27px;

  @media (max-width: 576px) {
    opacity: ${({ open }) => (open ? '0' : '1')};
  }
`

const Overlay = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${({ open }) => (open ? '10' : '-10')};
  background-color: rgba(255, 255, 255, 0.7);
`

function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => setIsOpen(false)

  return (
    <Head>
      <HeaderStyle>
        <Burger>
          <StyledMenu open={isOpen}>
            <ImgContainer>
              <MenuLogo>
                <Image src={Logo} alt='logo' width='40' height='40' />
              </MenuLogo>
            </ImgContainer>
            <BurgerNav>
              {data.map((operator: IOperator) => (
                <Link key={operator.title} href={`/${operator.title}`}>
                  {operator.title}
                </Link>
              ))}
            </BurgerNav>
          </StyledMenu>
          <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />
          <Overlay open={isOpen} onClick={() => handleClose()} />
        </Burger>
        {!isOpen && (
          <a href='#'>
            <MainLogo open={isOpen}>
              <Image src={Logo} alt='logo' width='40' height='40' />
            </MainLogo>
          </a>
        )}
      </HeaderStyle>
    </Head>
  )
}

export default Header
