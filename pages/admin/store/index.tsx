import { useState } from 'react';
import styled from 'styled-components';
export default function Index(){

    const [addresses, setAddress] = useState([{
        main: false,
        street: '',
        city: '',
        state: '',
        number: '',
        zip: '',
    }]);

    const [contacts, setContacts] = useState([{
        main: false,
        email: '',
        phone: '',
    }]);

    const addAddress = () => {
        setAddress([...addresses, {
            main: false,
            street: '',
            city: '',
            state: '',
            number: '',
            zip: '',
        }]);
    }
    const addContacts = () => {
        setContacts([...contacts, {
            main: false,
            email: '',
            phone: '',
        }]);
    }
    const removeAddress = (index) => {
        const newAddress = [...addresses];
        newAddress.splice(index, 1);
        setAddress(newAddress);
    }
    const removeContacts = (index) => {
        const newContacts = [...contacts];
        newContacts.splice(index, 1);
        setContacts(newContacts);
    }

    const handleAddress = (e, index) => {
        const newAddress = [...addresses];
        newAddress[index][e.target.name] = e.target.value;
        setAddress(newAddress);
    }
    const handleContacts = (e, index) => {
        const newContacts = [...contacts];
        console.log(newContacts);
        newContacts[index][e.target.name] = e.target.value;
        setContacts(newContacts);
    }

    const handleContactsMain = (e, index) => {
        const newContacts = [...contacts];
        newContacts[index]['main'] = e.target.checked;
        setContacts(newContacts);
    }

    const handleAddressMain = (e, index) => {
        const newAddress = [...addresses];
        newAddress[index]['main'] = e.target.checked;
        setAddress(newAddress);
    }

    const [store, setStore] = useState({
        nameStore: '',
        typeOfStore: 'serviceSale',
        about: '',
        primaryColor: '',
        secondaryColor: '',
    })

    const handleStore = (e) => {
        setStore({ ...store, [e.target.name]: e.target.value });
    }

    return (
        <Container> 
           <HeaderPage>
                <h1>Configurações da loja</h1>
           </HeaderPage>
            <Content>
                <Formulario>
                    {/* Tipo da loja [Venda de serviço, Venda de Produto, Vitrine] */}
                    <div>
                        <label>Tipo da loja</label>
                        <select name='typeOfStore'>
                            <option value="serviceSale">Venda de serviço</option>
                            <option value="saleOfProducts">Venda de Produto</option>
                            <option value="showcase">Vitrine</option>
                        </select>
                    </div>
                    <label>
                        <span>Nome da loja</span>
                        <input type="text" />
                    </label>
                    <label>
                        <span>Sobre</span>
                        <textarea></textarea>
                    </label>
                    {/* endereços */}
                    <ContainerArrayForm>
                        {addresses.map((address, index) => (
                            <div key={index}>
                                <label>
                                    <span>Endereço</span>
                                    <input type="text" name='street' value={address.street} onChange={ (e) => {handleAddress(e, index)}}/>
                                </label>
                                <label>
                                    <span>Cidade</span>
                                    <input type="text" name='city' value={address.city} onChange={ (e) => {handleAddress(e, index)}}/>
                                </label>
                                <label>
                                    <span>Estado</span>
                                    <input type="text" name='state' value={address.state} onChange={ (e) => {handleAddress(e, index)}}/>
                                </label>
                                <label>
                                    <span>Número</span>
                                    <input type="text" name='number' value={address.number} onChange={ (e) => {handleAddress(e, index)}}/>
                                </label>
                                <label>
                                    <span>CEP</span>
                                    <input type="text" name='zip' value={address.zip} onChange={ (e) => {handleAddress(e, index)}}/>
                                </label>
                                <label>
                                    <span>Principal</span>
                                    <input type="checkbox" name='main' checked={address.main} onChange={ (e) => {handleAddressMain(e, index)}} />
                                </label>
                                <button onClick={() => removeAddress(index)}>Remover</button>
                            </div>
                        ))}
                        <ButtonAdd onClick={addAddress}>Adicionar endereço</ButtonAdd>
                    </ContainerArrayForm>
                    {/* contatos */}
                    <ContainerArrayForm>
                        {contacts.map((contact, index) => (
                            <div key={index}>
                                <label>
                                    <span>Email</span>
                                    <input type="text" name='email' value={contact.email} onChange={ (e) => {handleContacts(e, index)}}/>
                                </label>
                                <label>
                                    <span>Telefone</span>
                                    <input type="text" name='phone' value={contact.phone} onChange={ (e) => {handleContacts(e, index)}}/>
                                </label>
                                <label>
                                    <span>Principal</span>
                                    <input type="checkbox" name='main' checked={contact.main} onChange={ (e) => {handleContactsMain(e, index)}}/>
                                </label>
                                <button onClick={() => removeContacts(index)}>Remover</button>
                            </div>
                        ))}
                        <ButtonAdd onClick={addContacts}>Adicionar contato</ButtonAdd>
                    </ContainerArrayForm>
                </Formulario>

            </Content>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`;
const HeaderPage = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 5rem;
    position: relative;
    width: 100%;
    margin-bottom: 2rem;
    //shadow
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    h1 {
        padding-left: 1rem;
        font-size: 1.5rem;
        font-weight: bold;
        color: black;
        text-transform: uppercase;
    }
`;
const Content = styled.div`
    height: 100%;
    width: 96%;
   
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    margin-left: auto;
    margin-right: auto;
    
    border-collapse: collapse;
`;

const Formulario = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    label {
        display: flex;
        flex-direction: column;
        span {
            padding: 0.5rem;
            font-size: .75rem;
            font-weight: bold;
            color: black;
            text-transform: uppercase;
        }
        input {
            padding: 0.5rem;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: .75rem;
            color: black;
            text-transform: uppercase;
        }
    }
`;
const ContainerArrayForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 1rem;
    margin-top: 1rem;
    div{
        display: flex;
        width: 100%;
        justify-content: flex-start;
    }
    label {
        display: flex;
        flex-direction: column;
        margin-right: 1rem;
        span {
            padding: 0.5rem;
            font-size: .75rem;
            font-weight: bold;
            color: black;
            text-transform: uppercase;
        }
        input {
            padding: 0.5rem;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: .75rem;
            color: black;
            text-transform: uppercase;
        }
    }
    button {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: .75rem;
        color: black;
        text-transform: uppercase;
    }
`;
const ButtonAdd = styled.button`
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: .75rem;
    color: black;
    text-transform: uppercase;
    margin-top: 1rem;
`;

