import React, { useEffect, useState } from "react";
import Image from 'next/image'
import {
  NavbarContainer,
  SecondContainer,
  FirstContainer,
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
  ThirdContainer,
  SearchProducts,
  NavbarFooterExtendedContent,
  FourthContainer
} from "./NavbarElements";
import { AiOutlineFacebook, AiOutlineHome, AiOutlineInstagram, AiOutlineMail, AiOutlinePhone, AiOutlineTwitter } from 'react-icons/ai'
import { BsBag, BsBook, BsFillCartFill, BsSearch } from 'react-icons/bs'
import { IoMdContact } from 'react-icons/io'
import Link from 'next/link'
//import LogoImg from "../../images/logo.svg";
import api from "../../api/api";
import { useRouter } from "next/router";
import { StoreContext } from "../../components/Layout";
import { FaUserAlt } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthContext";

function Navbar() {
  const [extendNavbar, setExtendNavbar] = useState(false);
  
  const router = useRouter();
  const NameStore = router.query.store;
  const store = React.useContext(StoreContext);

  const { userClient } = React.useContext(AuthContext);
  console.log(userClient);

  const mainContact = store?.Contact?.find((contact) => contact.main === true);

  const [search, setSearch] = useState('');

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if(search && search !== "") {
      const inputSearch = search;
      //setSearch('');
      router.push(`/${NameStore}/products?search=${inputSearch}`);
    } else {
      //setSearch('');
      router.push(`/${NameStore}/products`);
    }
  }

  const closeMenuExtended = () => {
    setExtendNavbar((curr) => !curr);
  }

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
              {mainContact?.phone}
            </p>
            <p>
              <AiOutlineMail size={20} />
              {mainContact?.email}
            </p>
          </NavBarHeaderContactRight>
        </NavBarHeaderContact>
        <NavbarContainerContent>
          <FirstContainer>
              <OpenLinksButton
                onClick={() => {
                  setExtendNavbar((curr) => !curr);
                }}
              >
                &#8801;
              </OpenLinksButton>
            <Image src={store?.Upload?.url} width={100} height={100}/>
          </FirstContainer>
          <SecondContainer>
            <NavbarLinkContainer>
              <Link href={`/${NameStore}`}>
                <NavbarLink > <AiOutlineHome></AiOutlineHome> Home</NavbarLink>
              </Link>
              <Link  href={`/${NameStore}/products`}>
                <NavbarLink ><BsBag></BsBag> Produtos</NavbarLink>
              </Link>
              <Link  href={`/${NameStore}/contact`}>
                <NavbarLink ><IoMdContact></IoMdContact> Contato</NavbarLink>
              </Link>
              <Link  href={`/${NameStore}/about`}>
                <NavbarLink ><BsBook></BsBook> Sobre</NavbarLink>
              </Link>
            </NavbarLinkContainer>
          </SecondContainer>
          <ThirdContainer>
            <SearchProducts onSubmit={handleSearch}>
              <input type="text" placeholder="Pesquisar" onChange={handleChangeSearch} value={search}/>
              <button type="submit"><BsSearch></BsSearch></button>
            </SearchProducts>
          </ThirdContainer>
          <FourthContainer>
            {userClient ? (
              <>
                <div id="perfilUser">
                  <FaUserAlt size={20} />
                </div>
                <div id="cart" onClick={() => {
                  router.push(`/${NameStore}/cart`);
                }}>
                    <BsFillCartFill size={20} />
                </div>
              </>
            ) : (
              <div id="userLoginOrRegister" onClick={() => {
                router.push(`/${NameStore}/loginUser`);
              }}>
                <p>Olá, faça seu login</p>  
              </div>
            )}
          </FourthContainer> 
        </NavbarContainerContent> 
        <NavbarFooterExtendedContent>
            <SearchProducts>
              <input type="text" placeholder="Pesquisar" onChange={handleChangeSearch} value={search}/>
              <button onClick={handleSearch}><BsSearch></BsSearch></button>
            </SearchProducts>
        </NavbarFooterExtendedContent>
      </NavbarInnerContainer>
      <NavbarExtendedContainer data-extendnavbar={extendNavbar}>
        <NavbarExtendedLinkContainer data-extendnavbar={extendNavbar}>
          <NavbarExtendedLinksContainer>
            <Link href={`/${NameStore}`} >
              <NavbarLinkExtended  onClick={closeMenuExtended}> <AiOutlineHome></AiOutlineHome>Home</NavbarLinkExtended>
            </Link>
            <Link href={`/${NameStore}/products`}>
              <NavbarLinkExtended onClick={closeMenuExtended}><BsBag></BsBag>Produtos</NavbarLinkExtended>
            </Link>
            <Link  href={`/${NameStore}/contact`}>
              <NavbarLinkExtended onClick={closeMenuExtended}><IoMdContact></IoMdContact>Contato</NavbarLinkExtended>
            </Link>
            <Link  href={`/${NameStore}/about`}>
              <NavbarLinkExtended onClick={closeMenuExtended}><BsBook></BsBook>Sobre</NavbarLinkExtended>
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
        <NavBarExtendedFadeContainer data-extendnavbar={extendNavbar} onClick={closeMenuExtended}>
          <NavbarLinkCloseExtended >
            &#10006;
          </NavbarLinkCloseExtended>
        </NavBarExtendedFadeContainer>)}
    </NavbarContainer>
  );
}

export default Navbar;