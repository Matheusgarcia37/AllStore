import { useState } from 'react';
import styled from 'styled-components';

import { useContext, useEffect } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import api from '../../../api/api';

import Table from 'react-bootstrap/Table';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AiFillEye } from 'react-icons/ai';
import Swal from 'sweetalert2';

export default function Index() {

  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  const [currentOrderProducts, setCurrentOrderProducts] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const getOrdersFromStore = async () => {
    const { data } = await api.get("/order/store/" + user.Store.id);
    setOrders(data);
    console.log(data)
  }

  useEffect(() => {
    if (user) {
      getOrdersFromStore();
    }
  }, [user]);

  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow2(false);
  const handleShow = () => setShow(true);
  const handleShow2 = () => setShow2(true);


  const openModalToChangeStatus = async (orderProduct) => {
    //open modal with buttons to approve or reprove order
    console.log(orderProduct);
    Swal.fire({
      title: 'Deseja aprovar o pedido?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Sim`,
      denyButtonText: `Não`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        await api.put("/order/approveOrder", {
          orderId: orderProduct.id,
        });
        Swal.fire('Pedido aprovado!', '', 'success')
        getOrdersFromStore();
      } else if (result.isDenied) {
        await api.put("/order/reproveOrder", {
          orderId: orderProduct.id,
        });
        Swal.fire('Pedido reprovado!', '', 'info')
        getOrdersFromStore();
      }
    })

  }

  return (
    <Container>
      <HeaderPage>
        <h1>Pedidos da loja</h1>
      </HeaderPage>
      <Content>
        <Table hover bordered>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Valor Total</th>
              <th>Produtos</th>
              <th>Data do Pedido</th>
              <th>Situação</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.map((orderProduct, key) => {
              let totalValue = 0;

              orderProduct.Products.forEach(ele => {
                totalValue += ele.Product.price * ele.quantity;
              })
              // date and time formated to pt-br -3 hours
              let dateFormated = new Date(orderProduct.createdAt);
              dateFormated.setHours(dateFormated.getHours());
              let dateFormatedString = dateFormated.toLocaleString();
              return (
                <tr key={orderProduct.productId}>
                  <td onClick={() => {
                      setCurrentUser(orderProduct.User);
                      handleShow2();}
                    } style={{cursor: 'pointer'}}>
                    {orderProduct.User?.Person?.name}
                  </td>
                  <td>
                    R$ {totalValue.toFixed(2)}
                  </td>
                  <td>
                    <AiFillEye onClick={() => {
                      setCurrentOrderProducts(orderProduct.Products);
                      handleShow()
                    }}
                      style={{ cursor: "pointer" }}
                      size={25}
                    />
                  </td>
                  <td>
                    {dateFormatedString}
                  </td>
                  <td onClick={() => {
                    if (orderProduct.approved == null) {
                      openModalToChangeStatus(orderProduct);
                    }
                  }} style={{ cursor: 'pointer' }}>
                    {orderProduct.approved === false ? 'Pedido não aprovado' : orderProduct.approved === true ? 'Pedido aprovado' : 'Pedido em andamento'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}

          aria-labelledby="contained-modal-title-vcenter"
          centered
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Produtos</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table hover bordered>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Quantidade</th>
                  <th>Valor unitário</th>
                  <th>Valor total</th>
                </tr>
              </thead>
              <tbody>
                {currentOrderProducts && currentOrderProducts.map((orderProduct, key) => {
                  let totalValue = orderProduct.Product.price * orderProduct.quantity;
                  return (
                    <tr key={orderProduct.productId}>
                      <td>
                        {orderProduct.Product.name}
                      </td>
                      <td>
                        {orderProduct.quantity}
                      </td>
                      <td>
                        R$ {Number(orderProduct.Product.price).toFixed(2)}
                      </td>
                      <td>
                        R$ {Number(totalValue).toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={show2}
          onHide={handleClose2}
          backdrop="static"
          keyboard={false}

          aria-labelledby="contained-modal-title-vcenter"
          centered
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Informações do cliente</Modal.Title>
          </Modal.Header>
          <Modal.Body>
                {currentUser && currentUser.Person && (
                  <div>
                    <p>Nome: {currentUser.Person.name}</p>
                    <p>CPF: {currentUser.Person.cpf}</p>
                    <p>Telefone: {currentUser.Person.phone}</p>
                    <p>Email: {currentUser.Person.email}</p>
                    <p>Endereço: {currentUser.Person.address}</p>
                  </div>
                )} 
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose2}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
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

