import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import styled from 'styled-components';
import api from "../../../api/api";

import Table from "react-bootstrap/Table";
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import Link from "next/link";
import { MdAdd } from "react-icons/md";
import { useRouter } from "next/router";
export default function Users() {
    const router = useRouter();

    const { user } = useContext(AuthContext);
    const [users, setUsers] = useState(null);
   
    const getUsers = async () => {
        const { data } = await api.get(`/user/${user.Store.id}`);
        console.log(data);
        setUsers(data);
    }; 

    useEffect(() => {
        if(user) {
            getUsers();
        }
    },[user]);

    const handleDelete = async (id) => {
        await api.delete(`/user/${id}`);
        getUsers();
    }

  return (
    <Container> 
           <HeaderPage>
                <h1>Usuários da loja</h1>
                <Link href="/admin/users/new">
                        <a>
                            <Button>
                                <MdAdd size={20} color="#fff" />
                                <span>Novo usuário</span>
                            </Button>
                        </a>
                </Link>
           </HeaderPage>
            <Content>
                <Table hover bordered>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th>Data de criação</th>
                            <th>Data de atualização</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.map((user, key) => {
                            let dateFormated = new Date(user.createdAt);
                            dateFormated.setHours(dateFormated.getHours());
                            let dateFormatedString = dateFormated.toLocaleString();

                            let dateFormatedUpdate = new Date(user.updatedAt);
                            dateFormatedUpdate.setHours(dateFormatedUpdate.getHours());
                            let dateFormatedUpdateString = dateFormatedUpdate.toLocaleString();
                            return (
                                <tr key={user.id}>
                                    <td>{key + 1}</td>
                                    <td>{user.username}</td>
                                    <td>{dateFormatedString}</td>
                                    <td>{dateFormatedUpdateString}</td>
                                    <td><AiFillEdit size={25} style={{cursor: 'pointer'}}  onClick={() => {
                                        router.push(`/admin/users/${user.id}`);
                                    }}></AiFillEdit></td>
                                    <td><BsFillTrashFill size={25} style={{cursor: 'pointer'}} onClick={() => {handleDelete(user.id)}}></BsFillTrashFill></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
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

const Button = styled.button`
    border: none;
    background-color: ${({ theme }) => `RGB(${theme.colors.primary})`};
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    margin-right: 1rem;
    &:hover {
        opacity: 0.8;
    }
`;