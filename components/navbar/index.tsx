import React, { useEffect, useState } from "react";
import Image from 'next/image'
import {
  NavbarContainer,
  LeftContainer,
  RightContainer,
  NavbarExtendedContainer,
  NavbarInnerContainer,
  NavbarLinkContainer,
  NavbarLink,
  Logo,
  OpenLinksButton,
  NavbarLinkExtended,
  NavbarExtendedLinkContainer,
  NavBarExtendedFadeContainer,
  NavbarLinkCloseExtended,
  RedesSociaisBarExtended,
  NavbarExtendedLinksContainer,
  NavbarContainerContent,
  NavBarHeaderContact,
  NavBarHeaderContactRight,
  NavBarHeaderContactLeft,
} from "./NavbarElements";
import { AiOutlineFacebook, AiOutlineHome, AiOutlineInstagram, AiOutlineMail, AiOutlinePhone, AiOutlineTwitter } from 'react-icons/ai'
import { BsBag, BsBook } from 'react-icons/bs'
import { IoMdContact } from 'react-icons/io'
import Link from 'next/link'
import LogoImg from "../../images/logo.svg";
import api from "../../api/api";
import { useRouter } from "next/router";
import { StoreContext } from "../../components/Layout";

function Navbar() {
  const [extendNavbar, setExtendNavbar] = useState(false);
  
  const router = useRouter();
  const NameStore = router.query.store;
  const store = React.useContext(StoreContext);


  return (
    <NavbarContainer data-extendnavbar={extendNavbar}>
      <NavbarInnerContainer>
        <NavBarHeaderContact>
          <NavBarHeaderContactLeft>
            <a href="#">
              <AiOutlineFacebook size={20} />
            </a>
            <a href="#">       
              <AiOutlineTwitter size={20} />
            </a>
            <a href="#">
              <AiOutlineInstagram size={20} />
            </a>
          </NavBarHeaderContactLeft>
          <NavBarHeaderContactRight>
            <p>
              <AiOutlinePhone size={20} />
              (11) 99999-9999
            </p>
            <p>
              <AiOutlineMail size={20} />
              {store?.User[0]?.email}
            </p>
          </NavBarHeaderContactRight>
        </NavBarHeaderContact>
        <NavbarContainerContent>
          <LeftContainer>
            <NavbarLinkContainer>
              <Link href={`/${NameStore}`}>
                <NavbarLink >Home</NavbarLink>
              </Link>
              <Link  href={`/${NameStore}/products`}>
                <NavbarLink >Produtos</NavbarLink>
              </Link>
              <Link  href={`/${NameStore}`}>
                <NavbarLink >Contato</NavbarLink>
              </Link>
              <Link  href={`/${NameStore}`}>
                <NavbarLink >Sobre</NavbarLink>
              </Link>
              <OpenLinksButton
                onClick={() => {
                  setExtendNavbar((curr) => !curr);
                }}
              >
                &#8801;
              </OpenLinksButton>
            </NavbarLinkContainer>
          </LeftContainer>
          <RightContainer>
            <Image src={LogoImg} width={50} />
          </RightContainer>
        </NavbarContainerContent> 
      </NavbarInnerContainer>
      <NavbarExtendedContainer data-extendnavbar={extendNavbar}>
        <NavbarExtendedLinkContainer data-extendnavbar={extendNavbar}>
          <NavbarExtendedLinksContainer>
            <Link href={`/${NameStore}`} >
              <NavbarLinkExtended > <AiOutlineHome></AiOutlineHome>Home</NavbarLinkExtended>
            </Link>
            <Link href={`/${NameStore}/products`}>
              <NavbarLinkExtended ><BsBag></BsBag>Produtos</NavbarLinkExtended>
            </Link>
            <Link  href={`/${NameStore}`}>
              <NavbarLinkExtended ><IoMdContact></IoMdContact>Contato</NavbarLinkExtended>
            </Link>
            <Link  href={`/${NameStore}`}>
              <NavbarLinkExtended ><BsBook></BsBook>Sobre</NavbarLinkExtended>
            </Link>
          </NavbarExtendedLinksContainer>
          <RedesSociaisBarExtended>
            <Link href="#">
              <a>
                <AiOutlineFacebook size={30} />
              </a>
            </Link>
            <Link href="#">
              <a > 
              <AiOutlineInstagram size={30} />
              </a>
            </Link>
            <Link href="#">
              <a>
                <AiOutlineTwitter size={30} />
              </a>
            </Link>
          </RedesSociaisBarExtended>
        </NavbarExtendedLinkContainer>
      </NavbarExtendedContainer>
      {extendNavbar && (
        <NavBarExtendedFadeContainer data-extendnavbar={extendNavbar}>
          <NavbarLinkCloseExtended onClick={() => {
            setExtendNavbar((curr) => !curr);
          }
          }>
            {/* simbolo X */}
            &#10006;
          </NavbarLinkCloseExtended>
        </NavBarExtendedFadeContainer>)}
    </NavbarContainer>
  );
}

export default Navbar;