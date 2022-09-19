import Link from "next/link";
import { useContext, useState } from "react";
import api from "../../../api/api";
import { StoreContext } from "../../../components/Layout";
import Swal from "sweetalert2";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Register() {
  const store = useContext(StoreContext);

  const [register, setRegister] = useState({
    username: "",
    password: "",
    confirmPassword: "",
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
    const formData = {
      username: register.username,
      password: register.password,
      storeId: store.id,
    };
    try {
      const { data } = await api.post("/user/storeUserClient", formData);
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
      <h1>Registre um usuário para o site {store?.name}</h1>

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
        <Button variant="primary" type="submit">
            Registrar
        </Button>
      </Form>
      <Link href={`/${store?.name}/loginUser`}>
          <a>Já tenho conta</a>
      </Link>
    </div>
  );
}
