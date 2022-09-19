import Link from "next/link";
import { useRouter } from "next/router";
import { StoreContext } from "../../../components/Layout";
import { useContext, useState } from "react";
import api from "../../../api/api";
import { AuthContext } from "../../../contexts/AuthContext";
import Swal from "sweetalert2";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Login_register_user() {
  const router = useRouter();
  const store = useContext(StoreContext);
  const { signInClient } = useContext(AuthContext);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInClient({
        username: user.username,
        password: user.password,
        storeId: store.id,
      });

      //swal success login and redirect to home
      Swal.fire({
        title: "Sucesso!",
        text: "Você está logado!",
        icon: "success",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/" + store.name);
        }
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: "Usuario ou senha incorretos!",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <div>
        <h1>Login</h1>
        {/* <form onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Nome de usuário"
                name="username"
                value={user.username}
                onChange={handleChange}
                />
                <input
                type="password"
                name="password"
                placeholder="Senha"
                value={user.password}
                onChange={handleChange}
                />
                <button type="submit">
                Entrar
                </button>
            </form> */}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Nome de usuário</Form.Label>
            <Form.Control type="text" placeholder="Insira seu nome de usuário" 
              name="username"
              value={user.username}
              onChange={handleChange}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <Form.Control type="password" placeholder="Insira sua senha" 
                name="password"
                value={user.password}
                onChange={handleChange}/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Entrar
          </Button>
        </Form>
        <p>
          Não tem uma conta?{" "}
          <Link href={`/${store?.name}/loginUser/register`}>
            <a>Cadastre-se</a>
          </Link>
        </p>
      </div>
    </div>
  );
}
