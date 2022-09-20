import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import api from "../../../api/api";
import { StoreContext } from "../../../components/Layout";
import Swal from "sweetalert2";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../../../contexts/AuthContext";

import styled from 'styled-components';

export default function EditUserClient() {
  const store = useContext(StoreContext);
  const { userClient } = useContext(AuthContext);
  
  const [editUser, setEditUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
    email: "",
    phone: "",
    cpf: "",
    address: "",
  });

  const getUserClient = async () => {
    const { data } = await api.post("/user/getUserClientById", { id: userClient.id });
    setEditUser(
      {
        username: data.username,
        password: "",
        confirmPassword: "",
        name: data.Person.name,
        email: data.Person.email,
        phone: data.Person.phone,
        cpf: data.Person.cpf,
        address: data.Person.address,
      }
    )
  }
  useEffect(() => {
    if(userClient){
      getUserClient();
    }
  }, [userClient])

  const handleChange = (e) => {
    setEditUser({
      ...editUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editUser.password !== editUser.confirmPassword) {
      Swal.fire({
        title: "Error!",
        text: "Senhas não conferem!",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
    const formDataUser = {
      username: editUser.username,
      password: editUser.password,
      id: userClient.id,
    };

    const formDataPerson = {
      name: editUser.name,
      email: editUser.email,
      phone: editUser.phone,
      cpf: editUser.cpf,
      address: editUser.address,
    }

    try {
      const { data } = await api.put("/user/alterUserClient", { formDataUser, formDataPerson });
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


      <h3>Alterar Usuário</h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Nome de usuário</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nome de usuário"
            name="username"
            onChange={handleChange}
            value={editUser.username}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicConfirmedPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Senha"
            name="password"
            value={editUser.password}
            onChange={handleChange}
            required
          />

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirme sua senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Digite sua senha novamente"
            name="confirmPassword"
            value={editUser.confirmPassword}
            onChange={handleChange}
            required
          />
        </Form.Group>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Nome</Form.Label>
          <Form.Control
             type="text"
             placeholder="Digite seu nome"
             name="name"
             onChange={handleChange}
             required
              value={editUser.name}
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
              value={editUser.email}
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
              value={editUser.phone}
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
              value={editUser.cpf}
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
              value={editUser.address}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Alterar
        </Button>
      </Form>
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

