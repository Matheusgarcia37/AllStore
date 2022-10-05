import { useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';

import { useContext, useEffect } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import api from '../../../api/api';

import Table from 'react-bootstrap/Table';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AiFillEye } from 'react-icons/ai';
import Swal from 'sweetalert2';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function Index() {

  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  const [currentOrderProducts, setCurrentOrderProducts] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const [skip, setSkip] = useState(0);
  const limit = 5;
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const optionsStatus =  [
    { value: 'Todos', label: 'Todos' },
    { value: null, label: 'Pendente' },
    { value: true, label: 'Aprovado' },
    { value: false, label: 'Reprovado' },
  ];

  const [selectedStatus, setSelectedStatus] = useState(optionsStatus[0]);

  const getOrdersFromStore = async () => {
    const { data } = await api.put("/order/store/getOrdersFromStore", {
      storeId: user?.Store.id,
      skip: skip,
      limit: limit,
      status: selectedStatus.value,
      startDate: startDate,
      endDate: endDate
    });
    setOrders(data[1]);
    setTotalOrders(data[0]);
    setTotalPages(Math.ceil(data[0] / limit));

    console.log(data)
  }

  useEffect(() => {
    if (user) {
      getOrdersFromStore();
    }
  }, [user, skip, selectedStatus, startDate, endDate]);

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
      cancelButtonText: "Cancelar",
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
        <div className='Filtros'>
          <div className='FiltroStatus'>
            <label htmlFor="status">Status</label>
            <Select options={
             optionsStatus
            } id="status" 
            placeholder="Status"
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e);
              setSkip(0);
            }}
            //max width of input select
            styles={{
              control: (provided, state) => ({
                ...provided,
                width: 200,
              }),
            }}
            />
          </div>
          <div className='Filtro'>
            <label htmlFor="startDate">Data Inicial</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                setSkip(0);
              }}
              locale="pt-BR"
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <div className='Filtro'>
            <label htmlFor="endDate">Data Final</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => {
                setEndDate(date);
                setSkip(0);
              }}
              locale="pt-BR"
              dateFormat="dd/MM/yyyy"
            />
          </div>
        </div>
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
                    {orderProduct.approved === false ? 'Reprovado' : orderProduct.approved === true ? 'Aprovado' : 'Pendente'}
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
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
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

    .Filtros {
        display: flex;
        padding: 1rem;
        align-items: center;
        width: 100%;

        .Filtro {
            display: flex;
            align-items: center;
            label {
                font-size: 1rem;
                margin-right: 0.5rem;
            }
            //width: 250px
            flex: 1;
            margin: 0 0.5rem;

            input {
                width: 100%;
                height: 2.5rem;
                border: 1px solid #ccc;
                border-radius: 0.25rem;
                padding: 0 0.5rem;
                font-size: 1rem;
                outline: none;
            }
        }
        .FiltroStatus {
            display: flex;
            align-items: center;
            label {
                font-size: 1rem;
                margin-right: 0.5rem;
            }
            //width: 250px;
            //flex: 1;
            margin: 0 0.5rem;
        }
         //flex wrap
         flex-wrap: wrap;
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
