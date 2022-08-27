import styled from 'styled-components';
import Link from 'next/link';
import { MdAdd } from 'react-icons/md';
import { useContext, useEffect, useState } from 'react';
import api from '../../../api/api';
import { AuthContext } from '../../../contexts/AuthContext';
export default function Products() {
    const [products, setProducts] = useState([]);
    const { user } = useContext(AuthContext);
    const [skip, setSkip] = useState(0);
    const limit = 2;
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        if (user) {
            const getProducts = async () => {
                const response = await api.put('/products', {
                    storeId: user?.Store.id,
                    skip: skip,
                    limit: limit
                });
                setTotalProducts(response.data[0]);
                setTotalPages(Math.ceil(response.data[0] / limit));
                setProducts(response.data[1]);
            }
            getProducts();
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            const getProducts = async () => {
                const response = await api.put('/products', {
                    storeId: user?.Store.id,
                    skip: skip,
                    limit: limit
                });
                setTotalProducts(response.data[0]);
                setTotalPages(Math.ceil(response.data[0] / limit));
                setProducts(response.data[1]);
            }
            getProducts();
        }
    }, [skip, limit]);

    const deleteProduct = async (id) => {
        await api.delete(`/products/${id}`);
        const response = await api.get('/products', user?.Store.id);
        setProducts(response.data);
    }
    return (
        <>
            <Container>
                <HeaderPage>
                    <h1>Produtos</h1>
                    <Link href="/admin/products/new">
                        <a>
                            <Button>
                                <MdAdd size={20} color="#fff" />
                                <span>Novo Produto</span>
                            </Button>
                        </a>
                    </Link>
                </HeaderPage>
                <Content>
                    <Table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Preço</th>
                                <th>Categoria</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* <tr>
                            <td>Camiseta</td>
                            <td>R$ 50,00</td>
                            <td>Manga longa</td>
                            <td>
                                <ButtonEdit>Editar</ButtonEdit>
                                <ButtonDelete>Excluir</ButtonDelete>
                            </td>
                        </tr> */}
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.Tag[0]?.name}</td>
                                    <td>
                                        <Link href="/admin/products/[id]" as={`/admin/products/${product.id}`}>
                                            <a>
                                                <ButtonEdit>Editar</ButtonEdit>
                                            </a>
                                        </Link>
                                        <ButtonDelete onClick={() => { deleteProduct(product.id) }} >Excluir</ButtonDelete>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Content>
            </Container>
            {/* Pagination */}
            {totalPages > 1 && (
                <Pagination>
                    <button onClick={() => { setSkip(skip - limit) }} disabled={skip === 0}>Anterior</button>
                    {Array.from(Array(totalPages).keys()).map((page) => (
                        <button key={page} onClick={() => { setSkip(page * limit) }}>{page + 1}</button>
                    ))}
                    <button onClick={() => {setSkip(skip + limit) }} disabled={(skip + limit) >= totalProducts}>Próximo</button>
                </Pagination>
            )}
        </>
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
    //shadow
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    h1 {
        padding-left: 1rem;
        font-size: 1.5rem;
        font-weight: bold;
        color: black;
        text-transform: uppercase;
    }
        a {
            text-decoration: none;
            Button {
            display: flex;
            align-items: center;
            background-color: ${({ theme }) => `RGB(${theme.colors.secondary})`};
            svg {
                margin-right: 0.5rem;
            }
        }
    }
`;
const Content = styled.div`
    height: 100%;
    width: 100%;
    margin-top: 2rem;
`;

const Table = styled.table`
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    margin-left: auto;
    margin-right: auto;
    width: 96%;
    border-collapse: collapse;
    thead {
        tr {
            th {
                padding: 1rem;
                font-size: 1.2rem;
                font-weight: bold;
                color: black;
                text-transform: uppercase;
            }
        }
    }
    tbody {
        tr {
            td {
                padding: 1rem;
                font-size: 1.2rem;
                color: black;
                text-align: center;
            }
        }
    }
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
const ButtonDelete = styled.button`
    cursor: pointer;
    margin-left: 1rem;
    border: none;
    background-color: ${({ theme }) => `Rgb(${theme.colors.secondary})`};
    color: white;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    &:hover {
        opacity: 0.8;
    }
`;
const ButtonEdit = styled.button`
    cursor: pointer;
    border: none;
    background-color: ${({ theme }) => `Rgb(${theme.colors.secondary})`};
    color: white;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    &:hover {
        opacity: 0.8;
    }
`;
const ButtonAdd = styled.button`
    border: none;
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    &:hover {
        opacity: 0
    }
`;

const Pagination = styled.div`
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: center;
    height: 5rem;
    margin: 0 auto;
    left: 250px;
    right: 0;
    justify-content: center;
    button {
        margin-right: 1rem;
        border: none;
        background-color: ${({ theme }) => `RGB(${theme.colors.secondary})`};
        color: white;
        font-size: 1rem;
        font-weight: bold;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        &:hover {
            opacity: 0.8;
        }
    }
`;