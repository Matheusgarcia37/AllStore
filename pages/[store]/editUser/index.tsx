import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import api from "../../../api/api";
import { StoreContext } from "../../../components/Layout";
import Swal from "sweetalert2";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../../../contexts/AuthContext";

export default function EditUserClient() {
  const store = useContext(StoreContext);
  const { userClient } = useContext(AuthContext);
  
  const [editUser, setEditUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const getUserClient = async () => {
    const { data } = await api.post("/user/getUserClientById", { id: userClient.id });
    setEditUser(
      {
        username: data.username,
        password: "",
        confirmPassword: "",
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
    const formData = {
      username: editUser.username,
      password: editUser.password,
      id: userClient.id,
    };

    try {
      const { data } = await api.put("/user", formData);
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
      <h1>Alterar usuário {userClient?.username}</h1>

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
        <Button variant="primary" type="submit">
          Registrar
        </Button>
      </Form>
    </div>
  );
}
