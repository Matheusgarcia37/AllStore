import React, { useState } from "react";
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
} from "./NavbarElements";
import Link from 'next/link'
import LogoImg from "../../images/logo.svg";

function Navbar() {
  const [extendNavbar, setExtendNavbar] = useState(false);

  return (
    <NavbarContainer data-extendnavbar={extendNavbar}>
      <NavbarInnerContainer>
        <LeftContainer>
          <NavbarLinkContainer>
            <Link href="/">
                <NavbarLink > Home</NavbarLink>
            </Link>
            <Link href="/kakafestas">
                <NavbarLink > Products</NavbarLink>
            </Link>
            <Link href="/JrAgroPecas">
                <NavbarLink > Contact Us</NavbarLink>
            </Link>
            <Link href="/about">
                <NavbarLink > About Us</NavbarLink>
            </Link>
            <OpenLinksButton
              onClick={() => {
                setExtendNavbar((curr) => !curr);
              }}
            >
              {extendNavbar ? <>&#10005;</> : <> &#8801;</>}
            </OpenLinksButton>
          </NavbarLinkContainer>
        </LeftContainer>
        <RightContainer>
          <Image src={LogoImg} width={50}/>
        </RightContainer>
      </NavbarInnerContainer>
      {extendNavbar && (
        <NavbarExtendedContainer>
          <Link href="/">
                <NavbarLinkExtended > Home</NavbarLinkExtended>
            </Link>
            <Link href="/kakafestas">
                <NavbarLinkExtended > Products</NavbarLinkExtended>
            </Link>
            <Link href="/JrAgroPecas">
                <NavbarLinkExtended > Contact Us</NavbarLinkExtended>
            </Link>
            <Link href="/about">
                <NavbarLinkExtended > About Us</NavbarLinkExtended>
            </Link>
        </NavbarExtendedContainer>
      )}
    </NavbarContainer>
  );
}

export default Navbar;