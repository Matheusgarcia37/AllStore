import Link from "next/link";
import { useContext, useState } from "react";
import api from "../../../api/api";
import { StoreContext } from "../../../components/Layout";
import Swal from "sweetalert2";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import styled from "styled-components";

export default function Register() {
  const store = useContext(StoreContext);

  const [register, setRegister] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
    email: "",
    phone: "",
    cpf: "",
    address: "",
  });

  const handleChange = (e) => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (register.password !== register.confirmPassword) {
      Swal.fire({
        title: "Error!",
        text: "Senhas não conferem!",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
    const formDataUser = {
      username: register.username,
      password: register.password,
      storeId: store.id,
    };

    const formDataPerson = {
      name: register.name,
      email: register.email,
      phone: register.phone,
      cpf: register.cpf,
      address: register.address,
      storeId: store.id,
    };
    try {
      const { data } = await api.post("/user/storeUserClient", { formDataUser , formDataPerson});
      if (data) {
        Swal.fire({
          title: "Sucesso!",
          text: "Cadastro realizado com sucesso!",
          icon: "success",
          confirmButtonText: "Ok",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Erro ao cadastrar!",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div>
      <Content>
      
      <h3>Registrar</h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Nome de usuário</Form.Label>
          <Form.Control
             type="text"
             placeholder="Nome de usuário"
             name="username"
             onChange={handleChange}
             required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control
             type="password"
             placeholder="Senha"
             name="confirmPassword"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicConfirmedPassword">
          <Form.Label>Confirme a senha</Form.Label>
          <Form.Control
             type="password"
             placeholder="Digite sua senha novamente"
             name="password"
             onChange={handleChange}
             required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Nome</Form.Label>
          <Form.Control
             type="text"
             placeholder="Digite seu nome"
             name="name"
             onChange={handleChange}
             required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
              type="email"
              placeholder="Digite seu email"
              name="email"
              onChange={handleChange}
              required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label>Telefone</Form.Label>
          <Form.Control
              type="text"
              placeholder="Digite seu telefone"
              name="phone"
              onChange={handleChange}
              required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCpf">
          <Form.Label>CPF</Form.Label>
          <Form.Control
              type="text"
              placeholder="Digite seu CPF"
              name="cpf"
              onChange={handleChange}
              required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAddress">
          <Form.Label>Endereço</Form.Label>
          <Form.Control
              type="text"
              placeholder="Digite seu endereço completo"
              name="address"
              onChange={handleChange}
              required
          />
        </Form.Group>


        <Button variant="primary" type="submit">
            Registrar
        </Button>
      </Form>
      <Link href={`/${store?.name}/loginUser`}>
          <a>Já tenho conta</a>
      </Link>

        
      </Content>
    </div>
  );
}


const Content = styled.div`
  display: flex;
  flex-direction: column;

  h3 {
    margin: 20px 0;
  }
  padding: 10px;
  margin: 0 1rem;

  button {
    margin: 10px 0;
  }
`;
