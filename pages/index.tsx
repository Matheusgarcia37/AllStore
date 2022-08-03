import { useState } from 'react';
import React from 'react';
import { SketchPicker, ChromePicker } from 'react-color';
import styled from 'styled-components'
import api from '../api/api';
//Pagina de login/cadastro
export default function Home() {

  const [login, setLogin] = useState(true);
  const [registro, setRegistro] = useState(false);

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

  const [registroState, setRegistroState] = useState({
    nameStore: '',
    nameUser: '',
    typeOfStore: '',
    email: '',
    password: '',
    primaryColor: '',
    secondaryColor: '',
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


  const handleClickColor2 = () => {
    setState2({ ...state2, displayColorPicker: !state2.displayColorPicker });
  }
  const handleCloseColor2 = () => {
    setState2({ ...state2, displayColorPicker: false });
  }
  const handleChangeColor2 = (color) => {
    setState2({ ...state2, color: color.rgb });
  }

  const handleSubmitCadastar = async (e) => {
    e.preventDefault();
    try {
      //coloco colors dentro do registroState
      registroState.primaryColor = state1.color.r + ',' + state1.color.g + ',' + state1.color.b;
      registroState.secondaryColor = state2.color.r + ',' + state2.color.g + ',' + state2.color.b;
      console.log(registroState);
      const response = await api.post('/store/', registroState);
      if(response.status === 200){
        alert('Cadastro realizado com sucesso!');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onChangeRegistro = (e) => {
    setRegistroState({ ...registroState, [e.target.name]: e.target.value });
  }

  return (
    <Login_Registro data-setcolor={{color1: state1.color, color2: state2.color}}>
      <ContentbuttonChoose data-setcolor={{color1: state1.color, color2: state2.color}}>
        <button data-isset={login} onClick={() => {setLogin(true); setRegistro(false)}}>Login</button>
        <button data-isset={registro} onClick={() => {setLogin(false); setRegistro(true)}}>Registro</button>
      </ContentbuttonChoose>
      {login && (
        <div>
          <form>
            <input type="text" placeholder="Usuário" />
            <input type="password" placeholder="Senha" />
            <button>Entrar</button>
          </form>
        </div>
      )}
      {registro && (
        /**
         * Cadastra informações da loja e do usuario
         * campos
         * nome da loja
         * tipo de loja (venda de serviço, venda de produto, vitrine)
         * cor primaria da loja
         * cor secundaria da loja
         * nome do usuario
         * email do usuario
         * senha do usuario
         *  */ 
        <div>
          <form>
            <select value={registroState.typeOfStore} onChange={onChangeRegistro} name="typeOfStore">
              <option value="serviceSale">Venda de serviço</option>
              <option value="saleOfProducts">Venda de produto</option>
              <option value="showcase">Vitrine</option>
            </select>
            <input type="text" placeholder="Nome da loja" value={registroState.nameStore} name="nameStore" onChange={onChangeRegistro} />  
            <input type="text" placeholder="Nome do usuario" value={registroState.nameUser} name="nameUser" onChange={onChangeRegistro} />
            <input type="text" placeholder="Email do usuario" value={registroState.email} name="email" onChange={onChangeRegistro} />
            <input type="password" placeholder="Senha do usuario" value={registroState.password} name="password" onChange={onChangeRegistro} />
            <ContentColorsPicker>
              <div style={{marginBottom: '1rem'}}>
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
           
            <button onClick={(e) => {
              handleSubmitCadastar(e);
              //setRegistroState({ ...registroState, nameStore: '', nameUser: '', typeOfStore: '', email: '', password: '', primaryColor: '', secondaryColor: '' });
            }}>Cadastrar</button>
          </form>
        </div>
      )}
    </Login_Registro>
  );
}

const Login_Registro = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: #fff;
   
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        background: #fff;
        padding-top: 3rem;
        margin: 0;
        border-radius: 10px;
        input {
            width: 100%;
            height: 3rem;
            font-size: 1.5rem;
            border: 1px solid #ccc;
            border-radius: 10px;
            padding: 0 10px;
            margin-bottom: 10px;
            &:focus {
                outline: none;
            }
            box-sizing: border-box;
        }
        select {
            width: 100%;
            height: 3rem;
            font-size: 1.5rem;
            border: 1px solid #b4b4b4;
            border-radius: 10px;
            padding: 0 10px;
            margin-bottom: 10px;
            font-weight: normal;
            opacity: 0.7;
            &:focus {
                outline: none;
            }
           -webkit-appearance: none;
        
        }
        button {
            margin-top: 1.4rem;
            width: 100%;
            height: 3rem;
            border: 1px solid #ccc;
            border-radius: 10px;
            background: ${props => `rgba(${props['data-setcolor'].color1.r}, ${props['data-setcolor'].color1.g}, ${props['data-setcolor'].color1.b}, ${props['data-setcolor'].color1.a})`};
            color: ${props => `rgba(${props['data-setcolor'].color2.r}, ${props['data-setcolor'].color2.g}, ${props['data-setcolor'].color2.b}, ${props['data-setcolor'].color2.a})`};
            font-size: 1.6rem;
            &:focus {
                outline: none;
            }
        }
    }
`;

const ContentbuttonChoose = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    max-width: 500px;
    margin-top: 1rem;
    button {
        background: #fff;
        outline: none;
        border: none;
        color: ${props => `rgba(${props['data-setcolor'].color1.r}, ${props['data-setcolor'].color1.g}, ${props['data-setcolor'].color1.b}, ${props['data-setcolor'].color1.a})`};
        font-size: 2rem;
        cursor: pointer;
        transition: all 0.3s;
        //verifica se o botão está selecionado
        &[data-isset="true"] {
          font-weight: bold;
          border-bottom: 1px solid;
          border-bottom-color: ${props => `rgba(${props['data-setcolor'].color2.r}, ${props['data-setcolor'].color2.g}, ${props['data-setcolor'].color2.b}, ${props['data-setcolor'].color2.a})`}; 
        }
    }
`
const ContentColorsPicker = styled.div`
  width: 100%;
  align-items: center;
  margin: 1rem 0;
  font-size: 1.2rem;
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


