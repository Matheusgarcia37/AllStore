import Link from "next/link";
import { useContext, useState } from "react";
import api from "../../../api/api";
import { StoreContext } from "../../../components/Layout";
import Swal from "sweetalert2";

export default function Register(){
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
        if(register.password !== register.confirmPassword){
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
        }
        try {
            const { data } = await api.post('/user/storeUserClient', formData);
            if(data){
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
    }

    return (
        <div>
            <h1>Registre um usuário para o site {store?.name}</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nome de usuário" name="username" onChange={handleChange} required/>
                <input type="password" placeholder="Senha" name="password" onChange={handleChange} required/>
                <input type="password" placeholder="Confirme a senha" name="confirmPassword" onChange={handleChange} required/>
                <button type="submit">Registrar</button>

                <Link href={`/${store?.name}/loginUser`}>
                    <a>Já tenho conta</a>
                </Link>
            </form>

        </div>
    )
}