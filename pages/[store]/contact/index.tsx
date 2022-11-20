import styled from 'styled-components';
import { AiOutlineMail } from "react-icons/ai";
import { BsTelephone, BsWhatsapp } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { useContext } from 'react';
import { StoreContext } from '../../../components/Layout';

export default function Contact() {
  const store = useContext(StoreContext);

  const mainContact = store?.Contact?.find((contact) => contact.main === true);
  const mainAddress = store?.Address?.find((address) => address.main === true);

    return (
        <Container>
      <div className={"informationsContato"}>
        <div className={"linha"}>
          <h2>Contatos</h2>
        </div>
        <div className={"linha"}>
          <div className={"icon"}>
            {/* <BsWhatsapp /> */}<BsTelephone />
          </div>
          <p>Telefone: {mainContact?.phone}</p>
        </div>
      
        <div className={"linha"}>
          <div className={"icon"}>
            <AiOutlineMail />
          </div>
          <p>E-mail: {mainContact?.email}</p>
        </div>
        <div className={"linha"}>
          <div className={"icon"}>
            <GoLocation />
          </div>
        <p>Endereço: {mainAddress?.street}, n° {mainAddress?.number}, CEP {mainAddress?.zip} - {mainAddress?.city}-{mainAddress?.state}</p>
        </div>
      </div>
    </Container>
    );
}

const Container = styled.div`
  .informationsContato {
  padding: 2rem 5%;
    .linha {
      display: flex;
      align-items: center;
      color: ${({ theme }) => theme.colors.primary};
      .icon {
        margin-right: 1rem;
        background-color: #fff;
        
        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
   h2 {
    font-size: 2rem;
    font-weight: 500;
    color: ${({ theme}) => theme.colors.primary};
    //sombra
    text-transform: uppercase;
    //text-shadow: 0px 0px 3px ${({ theme }) => theme.colors.secondary};
    margin: 2rem 0 1rem 0;
   }
    p {
      font-size: 1.2rem;
      color: ${({ theme }) => theme.colors.primary};
      //sombra
      //text-shadow: 0px 0px 3px ${({ theme }) => theme.colors.secondary};
      font-weight: 400;
    }
  }
`;
