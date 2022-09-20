import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { MdAdd } from "react-icons/md";
import { AuthContext } from "../../../../contexts/AuthContext";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import api from "../../../../api/api";

export default function Users() {
  const { user } = useContext(AuthContext);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setNewUser({
        ...newUser,
        [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newUser.password !== newUser.confirmPassword) {
      Swal.fire({
        title: "Error!",
        text: "Senhas não conferem!",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
    const formData = {
      username: newUser.username,
      password: newUser.password,
      storeId: user.Store.id,
      typeOfUser: "admin",
    };
    try {
      const { data } = await api.post("/user", formData);
      if (data) {
        Swal.fire({
          title: "Sucesso!",
          text: "Cadastro realizado com sucesso!",
          icon: "success",
          confirmButtonText: "Ok",
        });

        setNewUser({
            username: "",
            password: "",
            confirmPassword: "",
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
    <Container>
      <HeaderPage>
        <h1>Criar um novo usuário</h1>
      </HeaderPage>
      <Content>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Nome de usuário</Form.Label>
            <Form.Control
              type="text"
              placeholder="Insira seu nome de usuário"
              name="username"
              value={newUser.username}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Senha"
              name="password"
              value={newUser.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirme sua senha</Form.Label>
          <Form.Control
             type="password"
             placeholder="Insira sua senha"
             name="confirmPassword"
            onChange={handleChange}
            required
          />
        </Form.Group>
          <Button variant="primary" type="submit">
            Cadastrar
          </Button>
        </Form>
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

    padding: 1rem;
`;
