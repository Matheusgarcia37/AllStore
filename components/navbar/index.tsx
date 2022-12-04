import React, { useEffect, useState } from "react";
import Image from "next/image";
import semFoto from '../../images/sem-foto.webp'
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
  FourthContainer,
} from "./NavbarElements";
import {
  AiOutlineFacebook,
  AiOutlineHome,
  AiOutlineInstagram,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineTwitter,
} from "react-icons/ai";
import { BsBag, BsBook, BsFillCartFill, BsSearch } from "react-icons/bs";
import { IoMdContact } from "react-icons/io";
import Link from "next/link";
//import LogoImg from "../../images/logo.svg";
import api from "../../api/api";
import { useRouter } from "next/router";
import { StoreContext } from "../../components/Layout";
import { FaUserAlt } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthContext";

import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

function Navbar() {
  const [extendNavbar, setExtendNavbar] = useState(false);

  const router = useRouter();
  const NameStore = router.query.store;
  const store = React.useContext(StoreContext);

  const { userClient, logout } = React.useContext(AuthContext);
  console.log(userClient);

  const mainContact = store?.Contact?.find((contact) => contact.main === true);

  const [search, setSearch] = useState("");

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search && search !== "") {
      const inputSearch = search;
      //setSearch('');
      router.push(`/${NameStore}/products?search=${inputSearch}`);
    } else {
      //setSearch('');
      router.push(`/${NameStore}/products`);
    }
  };

  const closeMenuExtended = () => {
    setExtendNavbar((curr) => !curr);
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3"> Olá, {userClient?.username}! </Popover.Header>
      <Popover.Body>
        <Link href={`/${NameStore}/orders`}>
          <a style={{textDecoration: 'none'}}>Meus Pedidos</a>
        </Link>
        <br />
        <Link href={`/${NameStore}/editUser`}>
          <a style={{textDecoration: 'none'}}>Editar usuário</a>
        </Link>
        <br />
        <Button variant="link" onClick={logout} style={{textDecoration: 'none', padding: 0}}>
          Sair
        </Button>
      </Popover.Body>
    </Popover>
  );

  return (
    <NavbarContainer data-extendnavbar={extendNavbar}>
      <NavbarInnerContainer>
        <NavBarHeaderContact>
          <NavBarHeaderContactLeft>
            {
              store?.facebook && (
                <a href={store.facebook}>
                  <AiOutlineFacebook size={20} />
                </a>
              )
            }
            {
              store?.twitter && (
                <a href={store.twitter}>
                  <AiOutlineTwitter size={20} />
                </a>
              )
            }

            {
              store?.instagram && (
                <a href={store.instagram}>
                  <AiOutlineInstagram size={20} />
                </a>
              )
            }                
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
            { store?.Upload?.url ? (
              <Image src={store?.Upload?.url} width={80} height={80} />
            ) : (
              <Image src={semFoto} width={80} height={80} />
            )}
            
          </FirstContainer>
          <SecondContainer>
            <NavbarLinkContainer>
              <Link href={`/${NameStore}`}>
                <NavbarLink>
                  <AiOutlineHome></AiOutlineHome> Home
                </NavbarLink>
              </Link>
              <Link href={`/${NameStore}/products`}>
                <NavbarLink>
                  <BsBag></BsBag> Produtos
                </NavbarLink>
              </Link>
              <Link href={`/${NameStore}/contact`}>
                <NavbarLink>
                  <IoMdContact></IoMdContact> Contato
                </NavbarLink>
              </Link>
              <Link href={`/${NameStore}/about`}>
                <NavbarLink>
                  <BsBook></BsBook> Sobre
                </NavbarLink>
              </Link>
            </NavbarLinkContainer>
          </SecondContainer>
          <ThirdContainer>
            <SearchProducts onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Pesquisar"
                onChange={handleChangeSearch}
                value={search}
              />
              <button type="submit">
                <BsSearch></BsSearch>
              </button>
            </SearchProducts>
          </ThirdContainer>
          {
            store?.typeOfStore === "saleOfProducts" && (
              <FourthContainer>
              {userClient ? (
                <>
                  <div id="perfilUser">
                  
                    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                      <Button variant=""><FaUserAlt size={20} /></Button>
                    </OverlayTrigger>
                  </div>
                  <div
                    id="cart"
                    onClick={() => {
                      router.push(`/${NameStore}/cart`);
                    }}
                  >
                    <BsFillCartFill size={20} />
                  </div>
                </>
              ) : (
                <div
                  id="userLoginOrRegister"
                  onClick={() => {
                    router.push(`/${NameStore}/loginUser`);
                  }}
                >
                  <p>Olá, faça seu login</p>
                </div>
              )}
            </FourthContainer>
            )
          }
        </NavbarContainerContent>
        <NavbarFooterExtendedContent>
          <SearchProducts>
            <input
              type="text"
              placeholder="Pesquisar"
              onChange={handleChangeSearch}
              value={search}
            />
            <button onClick={handleSearch}>
              <BsSearch></BsSearch>
            </button>
          </SearchProducts>
        </NavbarFooterExtendedContent>
      </NavbarInnerContainer>
      <NavbarExtendedContainer data-extendnavbar={extendNavbar}>
        <NavbarExtendedLinkContainer data-extendnavbar={extendNavbar}>
          <NavbarExtendedLinksContainer>
            <Link href={`/${NameStore}`}>
              <NavbarLinkExtended onClick={closeMenuExtended}>
                {" "}
                <AiOutlineHome></AiOutlineHome>Home
              </NavbarLinkExtended>
            </Link>
            <Link href={`/${NameStore}/products`}>
              <NavbarLinkExtended onClick={closeMenuExtended}>
                <BsBag></BsBag>Produtos
              </NavbarLinkExtended>
            </Link>
            <Link href={`/${NameStore}/contact`}>
              <NavbarLinkExtended onClick={closeMenuExtended}>
                <IoMdContact></IoMdContact>Contato
              </NavbarLinkExtended>
            </Link>
            <Link href={`/${NameStore}/about`}>
              <NavbarLinkExtended onClick={closeMenuExtended}>
                <BsBook></BsBook>Sobre
              </NavbarLinkExtended>
            </Link>
          </NavbarExtendedLinksContainer>
          <RedesSociaisBarExtended>
           
              {
                store?.facebook && (
                  <a href={store.facebook}>
                    <AiOutlineFacebook size={30} />
                  </a>
                )
              }

            
              {
                store?.instagram && (
                  <a href={store.instagram}>
                    <AiOutlineInstagram size={30} />
                  </a>
                )
              }
          
           
              {
                store?.twitter && (
                  <a href={store.twitter}>
                    <AiOutlineTwitter size={30} />
                  </a>
                )
              }
           
          </RedesSociaisBarExtended>
        </NavbarExtendedLinkContainer>
      </NavbarExtendedContainer>
      {extendNavbar && (
        <NavBarExtendedFadeContainer
          data-extendnavbar={extendNavbar}
          onClick={closeMenuExtended}
        >
          <NavbarLinkCloseExtended>&#10006;</NavbarLinkCloseExtended>
        </NavBarExtendedFadeContainer>
      )}
    </NavbarContainer>
  );
}

export default Navbar;
