import React, { useState } from "react";
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
    <NavbarContainer data-extendNavbar={extendNavbar}>
      <NavbarInnerContainer>
        <LeftContainer>
          <NavbarLinkContainer>
            <Link href="/">
                <NavbarLink > Home</NavbarLink>
            </Link>
           
            <NavbarLink href="/products"> Products</NavbarLink>
            <NavbarLink href="/contact"> Contact Us</NavbarLink>
            <NavbarLink href="/about"> About Us</NavbarLink>
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
          <Logo src={LogoImg}></Logo>
        </RightContainer>
      </NavbarInnerContainer>
      {extendNavbar && (
        <NavbarExtendedContainer>
          <NavbarLinkExtended href="/"> Home</NavbarLinkExtended>
          <NavbarLinkExtended href="/products"> Products</NavbarLinkExtended>
          <NavbarLinkExtended href="/contact"> Contact Us</NavbarLinkExtended>
          <NavbarLinkExtended href="/about"> About Us</NavbarLinkExtended>
        </NavbarExtendedContainer>
      )}
    </NavbarContainer>
  );
}

export default Navbar;