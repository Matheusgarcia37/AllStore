import styled from 'styled-components';
export default function Products(){
    return (
        <Container> 
           <HeaderPage>
                <h1>Produtos</h1>
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
                        <tr>
                            <td>Camiseta</td>
                            <td>R$ 50,00</td>
                            <td>Manga longa</td>
                            <td>
                                <ButtonEdit>Editar</ButtonEdit>
                                <ButtonDelete>Excluir</ButtonDelete>
                            </td>
                        </tr>
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
    background-color: ${({theme}) => theme.colors.primary};
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
    background-color: ${({theme}) => `Rgb(${theme.colors.secondary})`};
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
    background-color: ${({theme}) => `Rgb(${theme.colors.secondary})`};
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
    background-color: ${({theme}) => theme.colors.primary};
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    &:hover {
        opacity: 0
    }
`;