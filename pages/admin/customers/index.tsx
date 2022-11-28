import { useState } from 'react';
import styled from 'styled-components';

import { useContext, useEffect } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import api from '../../../api/api';

import Table from 'react-bootstrap/Table';

export default function Index() {

  const { user } = useContext(AuthContext);
  const [customers, setCustomers] = useState([]);

  const [currentOrderProducts, setCurrentOrderProducts] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const [skip, setSkip] = useState(0);
  const limit = 5;
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const getcustomersFromStore = async () => {
    const { data } = await api.post("/user/getCustomersFromStore", {
      storeId: user?.Store.id,
      skip: skip,
      limit: limit,
    });
    console.log(data);
    setCustomers(data[1]);
    setTotalOrders(data[0]);
    setTotalPages(Math.ceil(data[0] / limit));

    console.log(data)
  }

  useEffect(() => {
    if (user) {
      getcustomersFromStore();
    }
  }, [user, skip]);

  return (
    <Container>
      <HeaderPage>
        <h1>Clientes</h1>
      </HeaderPage>
      <Content>
        <Table hover bordered>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Telefone</th>
              <th>Email</th>
              <th>Endereço</th>
            </tr>
          </thead>
          <tbody>
            {customers && customers.map((customer, key) => {
              return (
                <tr key={customer.id}>
                  <td> 
                    {customer.Person.name}
                  </td>
                  <td>
                    {customer.Person.phone}
                  </td>
                  <td>
                    {customer.Person.email}
                  </td>
                  <td>
                    {customer.Person.address}  
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination>
            <button
              onClick={() => {
                setSkip(skip - limit);
              }}
              disabled={skip === 0}
            >
              Anterior
            </button>
            {Array.from(Array(totalPages).keys()).map((page) => (
              <button
                key={page}
                onClick={() => {
                  setSkip(page * limit);
                }}
              >
                {page + 1}
              </button>
            ))}
            <button
              onClick={() => {
                setSkip(skip + limit);
              }}
              disabled={skip + limit >= totalOrders}
            >
              Próximo
            </button>
          </Pagination>
        )}
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

const Pagination = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  height: 5rem;
  margin: 0 auto;
  left: 250px;
  right: 0;
  justify-content: center;
  button {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
    margin-right: 1rem;
    border: none;
    background-color: white;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    
   
    &:hover {
      opacity: 0.8;
    }
  }
`;
