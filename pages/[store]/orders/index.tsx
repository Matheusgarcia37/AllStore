import { StoreContext } from "../../../components/Layout";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import api from "../../../api/api";

import Table from "react-bootstrap/Table";
import { AiFillEye } from "react-icons/ai";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
export default function Orders() {
    const store = useContext(StoreContext);
    const { userClient } = useContext(AuthContext);
    const [orders, setOrders] = useState(null);
    const [currentOrderProducts, setCurrentOrderProducts] = useState(null);

    const getOrders = async () => {
        const { data } = await api.get(`/order/getOrders/${userClient.id}`);
        setOrders(data);
        console.log(data);
    };
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        if(userClient) {
            getOrders();
        }
    },[userClient]);
  return (
    <div>
      <h1>Historico de seus pedidos</h1>
      <Table hover bordered>
              <thead>
                <tr>
                  <th>Numero</th>
                  <th>Valor Total</th>
                  <th>Produtos</th>
                  <th>Data do Pedido</th>
                  <th>Status</th>
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
                        <td>
                          {key + 1}
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
                        <td>
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
    </div>
  );
}