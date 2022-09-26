import { useState } from 'react';
import styled from 'styled-components';

import { useContext, useEffect } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import api from '../../../api/api';

import { SketchPicker, ChromePicker } from 'react-color';
import Swal from 'sweetalert2';
export default function Index(){

    const { user } = useContext(AuthContext);

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

    const [file, setFile] = useState(null);

    const handleStore = (e) => {
        setStore({ ...store, [e.target.name]: e.target.value });
    }

    const [state1, setState1] = useState({
      displayColorPicker: false,
      //cor: "#000"
      color: {
        r: '0',
        g: '0',
        b: '0',
        a: '1'
      },
    });
  
    const [state2, setState2] = useState({
      displayColorPicker: false,
      //cor: "#fff"
      color: {
        r: '255',
        g: '255',
        b: '255',
        a: '1'
      },
    });
    
    const handleClickColor = () => {
        setState1({ ...state1, displayColorPicker: !state1.displayColorPicker });
    };
    
    const handleCloseColor = () => {
    setState1({ ...state1, displayColorPicker: false });
    };

    const handleChangeColor = (color) => {
    setState1({ ...state1, color: color.rgb });
    };

    
    const handleClickColor2 = () => {
    setState2({ ...state2, displayColorPicker: !state2.displayColorPicker });
    }
    const handleCloseColor2 = () => {
    setState2({ ...state2, displayColorPicker: false });
    }
    const handleChangeColor2 = (color) => {
    setState2({ ...state2, color: color.rgb });
    }
    

    useEffect(() => {
        if(user) {
          const getStore = async () => {
                const { data } = await api.get('/store/getById/' + user.Store.id);
                console.log(data)
                setStore({
                    nameStore: data.name,
                    typeOfStore: data.typeOfStore,
                    about: data.about,
                    primaryColor: data.Theme.primaryColor,
                    secondaryColor: data.Theme.secondaryColor,
                });
                setContacts(data.Contact.map((contact) => ({
                    main: contact.main,
                    email: contact.email,
                    phone: contact.phone,
                })));
                setAddress(data.Address.map((address) => ({
                    main: address.main,
                    street: address.street,
                    city: address.city,
                    state: address.state,
                    number: address.number,
                    zip: address.zip,
                })));
                setFile(data.Upload?.url)
            }
            getStore();
        }
      }, [user]);

    const handleAlterar = async (e) => {
        e.preventDefault();
        //formdata com dados e logo
        const formData = new FormData();
        formData.append('name', store.nameStore);
        formData.append('typeOfStore', store.typeOfStore);
        formData.append('about', store.about);
        formData.append('primaryColor', state1.color.r + ',' + state1.color.g + ',' + state1.color.b);
        formData.append('secondaryColor', state2.color.r + ',' + state2.color.g + ',' + state2.color.b);
        formData.append('Contact', JSON.stringify(contacts));
        formData.append('Address', JSON.stringify(addresses));
        formData.append('file', file);
        
        // const data = {
        //     name: store.nameStore,
        //     typeOfStore: store.typeOfStore,
        //     about: store.about,
        //     primaryColor: state1.color.r + ',' + state1.color.g + ',' + state1.color.b,
        //     secondaryColor: state2.color.r + ',' + state2.color.g + ',' + state2.color.b,
        //     Contact: contacts,
        //     Address: addresses,
        // }
        try {
            const { data: dataResponse } = await api.put('/store/' + user.Store.id, formData);
            console.log(dataResponse);
            Swal.fire({
                title: 'Sucesso!',
                text: 'Dados alterados com sucesso!',
                icon: 'success',
                confirmButtonText: 'Ok'
            })
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Erro!',
                text: 'Erro ao alterar dados!',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
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
                        <select name='typeOfStore' value={ store.typeOfStore } onChange={handleStore}>
                            <option value="serviceSale">Venda de serviço</option>
                            <option value="saleOfProducts">Venda de Produto</option>
                        </select>
                    </div>
                    <label>
                        <span>Nome da loja</span>
                        <input type="text" name='nameStore' value={ store.nameStore }  onChange={handleStore} />
                    </label>
                    <label>
                        <span>Sobre</span>
                        <textarea name='about' value={ store.about }  onChange={handleStore}></textarea>
                    </label>
                    {/* Content Image Logo */}
                    <label>
                        <span>Logo</span>
                        <input type="file" onChange={(e) => {setFile(e.target.files[0]) }} />
                    </label>
                      {/* Se tiver imagens mostra-las */}
                      {file && (
                        <ImagensSelecionadas>
                            
                                <div>
                                    {console.log('matheus',file)}
                                    {   file instanceof File ? (
                                        <>
                                            <img src={URL.createObjectURL(file) ? URL.createObjectURL(file) : null} alt={file.name} />
                                            <span>{file?.name}</span>
                                            </>
                                        ) : (
                                            <>
                                                <img src={file} alt={'Image'} />
                                                <span>{'Image'}</span>
                                            </>
                                        )}
                                </div>
                        
                        </ImagensSelecionadas>
                    )}

                    {/* Colors */}
                    <ContentColorsPicker>
                        <div>
                            <label>Cor primaria</label>
                            <div>
                            <Swatch data-setcolor={{color1: state1.color, color2: state2.color}} onClick={ handleClickColor }>         
                            </Swatch>
                            { state1.displayColorPicker ? <div>
                                <div onClick={ handleCloseColor }/>
                                <ChromePicker color={ state1.color } onChange={ handleChangeColor } />
                            </div> : null }
                            </div>
                        </div>
                        {/* cor secundaria com SketchPicker */}
                        <div>
                            <label>Cor secundaria</label>
                            <div>
                            <Swatch2 data-setcolor={{color1: state1.color, color2: state2.color}} onClick={ handleClickColor2 }>
                            </Swatch2>
                            { state2.displayColorPicker ? <div>
                                <div onClick={ handleCloseColor2 }/>
                                <ChromePicker color={ state2.color } onChange={ handleChangeColor2 } />
                            </div> : null }
                            </div>
                        </div>
                    </ContentColorsPicker>
                    {/* endereços */}
                    <ContainerArrayForm>
                        {addresses.map((address, index) => (
                            <div key={index}>
                                 <label>
                                    <span>CEP</span>
                                    <input type="text" name='zip' value={address.zip} onChange={ (e) => {handleAddress(e, index)}}/>
                                </label>
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
                    <ButtonAlterar type="button" onClick={handleAlterar}>Alterar</ButtonAlterar>
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

const ContentColorsPicker = styled.div`
  display: flex;

  width: 100%;
  align-items: baseline;
  margin: 1rem 0;
  font-size: 1.2rem;

  div {
        margin: 0 .5rem;
}
`
const Swatch = styled.div`
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 2px solid #383838;
    background: ${(props: any) => { return `rgba(${props['data-setcolor'].color1.r}, ${props['data-setcolor'].color1.g}, ${props['data-setcolor'].color1.b}, ${props['data-setcolor'].color1.a})`}};
`
const Swatch2 = styled.div`
    width: 35px;
    height: 35px;
    border: 2px solid #383838;
    border-radius: 50%;
    background: ${(props: any) => { return `rgba(${props['data-setcolor'].color2.r}, ${props['data-setcolor'].color2.g}, ${props['data-setcolor'].color2.b}, ${props['data-setcolor'].color2.a})`}};
`

const ButtonAlterar = styled.button`
    margin-top: 1rem;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: .75rem;
    color: black;
    text-transform: uppercase;
    width: 20%;
    align-self: flex-end;
`;

const ImagensSelecionadas = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 1rem;
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 1rem;
        margin-bottom: 1rem;
        img {
            width: 100px;
            height: 100px;
            object-fit: cover;
        }
        span {
            padding: 0.5rem;
            font-size: .75rem;
            font-weight: bold;
            color: black;
            text-transform: uppercase;
        }
    }
`;