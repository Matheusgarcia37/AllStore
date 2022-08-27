import styled from "styled-components";


export const NavbarContainer = styled.nav`
  width: 100%;
  //height: ${(props) => (props['data-extendnavbar'] ? "100vh" : "80px")};
  //position: ${(props) => (props['data-extendnavbar'] ? "absolute" : "relative")};
  display: flex;
  flex-direction: column;
  height: max-content;
  //z-index: ${(props) => (props['data-extendnavbar'] ? "1" : "0")};
`;

export const NavBarHeaderContact = styled.div`
  width: 100%;
  display: flex;
  background-color: ${({theme}) => theme.colors.secondary};
  color: ${({theme}) => theme.colors.primary};
  height: 30px;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 700px) {
    display: none;
  }
`;

export const NavBarHeaderContactLeft = styled.div`
  display: flex;
  a {
    margin-left: 15px;
    text-decoration: none;
    color: ${({theme}) => theme.colors.primary};
    :hover {
      opacity: 0.8;
    }
    display: flex;
    align-items: center;
  }
`;

export const NavBarHeaderContactRight = styled.div`
  display: flex;
  p {
    margin-left: 15px;
    text-decoration: none;
    color: ${({theme}) => theme.colors.primary};
    :hover {
      opacity: 0.8;
    }
    display: flex;
    font-size: .8rem;
    align-items: center;
    font-weight: bold;

    svg {
      margin-right: 5px;
    }
  }
  margin-right: 15px;
`;

export const NavbarContainerContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  height: 80px;
  background-color: ${({theme}) => theme.colors.primary};
`;

export const LeftContainer = styled.div`
  flex: 22%;
  display: flex;
  align-items: center;
  
  @media (max-width: 700px) {
    flex: 0%;
  }
`;

export const RightContainer = styled.div`
  flex: 10%;
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
`;

export const NavbarInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  display: flex;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
`;

export const NavbarLinkContainer = styled.div`
  display: flex;
`;

export const NavbarLink = styled.a`
  display: flex;
  align-items: center;
  color: ${({theme}) => theme.colors.secondary};
  font-size: 1.05rem;
  font-family: 'Roboto', sans-serif;
  text-decoration: none;
  margin: 10px;
  svg {
    margin-right: 6px;
  }
  @media (max-width: 700px) {
    display: none;
  }
  cursor: pointer;
`;

export const NavbarLinkExtended = styled.a`
  color: ${({theme}) => theme.colors.secondary};
  font-size: 1.4rem;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  text-decoration: none;
  margin: 10px;
  cursor: pointer;
  padding: 10px 0;
`;

export const Logo = styled.img`
  margin: 10px;
  max-width: 180px;
  height: auto;
`;

export const OpenLinksButton = styled.button`
  width: 70px;
  height: 50px;
  background: none;
  border: none;
  color: ${({theme}) => theme.colors.secondary};
  font-size: 38px;
  cursor: pointer;
  @media (min-width: 700px) {
    display: none;
  }
`;

export const NavbarExtendedLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 3;
  width: 80%;
  height: 100%;
  background-color: ${({theme}) => theme.colors.primary};
  position: fixed;
  left: ${(props) => (props['data-extendnavbar'] ? "0" : "-100%")};
  transition: left 0.5s;

  @media (min-width: 700px) {
    display: none;
  }
`;
export const NavbarExtendedLinksContainer = styled.div`
  margin-top: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  a {
    display: flex;
    align-items: center;
    font-size: 1.5rem;

    svg {
      margin-right: 10px;
    }
  }
`;
export const RedesSociaisBarExtended = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 70px;
  background-color: ${({theme}) => theme.colors.secondary};
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  a {
    text-decoration: none;
    color: ${({theme}) => theme.colors.primary};
  }
`;

export const NavBarExtendedFadeContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 1;
  opacity: ${(props) => (props['data-extendnavbar'] ? "1" : "0")};
`;

export const NavbarLinkCloseExtended = styled.a`
  color: ${({theme}) => theme.colors.secondary};
  font-size: 1.4rem;
  position: absolute;
  top: 20px;
  right: 20px;
  opacity: 1;
  z-index: 3;
  cursor: pointer;
`;

export const NavbarExtendedContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: ${(props) => (props['data-extendnavbar'] ? "0" : "-100%")};
  transition: left 0.5s;
  @media (min-width: 700px) {
    display: none;
  }
`;

export const MiddleContainer = styled.div`
  display: flex;
  flex: 90%;
  align-items: center;
  
  @media (max-width: 700px) {
    display: none;
  }
`;

export const NavbarFooterExtendedContent = styled.div`
  display: none;
  width: 100%;
  background-color: ${({theme}) => theme.colors.primary};
  padding: 5px 0;
  border-top: 1px solid ${({theme}) => theme.colors.secondary};
  @media (max-width: 700px) {
    display: flex;
  }
`;

export const SearchProducts = styled.form`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;
  margin: 0 10px;
  input {
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 5px;
    padding: 0 10px;
    font-size: 1.2rem;  
    padding-right: 42px;
    :focus {
      
    }
  }
  button {
    position: absolute;
    right: 0;
    top: 0;
    height: 40px;
    width: 40px;
    border: none;
    background-color: ${({theme}) => theme.colors.secondary};
    border-radius: 0 5px 5px 0;
    cursor: pointer;
    svg {
      color: ${({theme}) => theme.colors.primary};
    }
  }
`;