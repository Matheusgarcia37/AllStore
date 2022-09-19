import { useContext, useEffect, useState } from "react";
import api from "../../../api/api";
import { StoreContext } from "../../../components/Layout";
import { AuthContext } from "../../../contexts/AuthContext";
import styled from "styled-components";
import Image from "next/image";
import emptyImage from "../../../images/sem-foto.webp";
import Table from "react-bootstrap/Table";
import { BsFillTrashFill } from "react-icons/bs";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

export default function Index() {
  const store = useContext(StoreContext);
  const { userClient } = useContext(AuthContext);
  const [cart, setCart] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();
  const getCurrentOrder = async () => {
    try {
      const { data } = await api.get(`/order/${userClient.id}`);
      console.log(data);
      if (data) {
        setCart(data);
        let total = 0;
        data.Products.forEach((item) => {
          total += item.Product.price * item.quantity;
        });
        setTotalPrice(total);
      } else {
        setCart(null);
        setTotalPrice(0);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (userClient) {
      getCurrentOrder();
    }
  }, [userClient]);

  const handleIncrement = async (orderProduct) => {
    try {
      await api.put(`/order/incrementProducts`, {
        orderId: orderProduct.orderId,
        productId: orderProduct.productId,
      });
      getCurrentOrder();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecrement = async (orderProduct) => {
    try {
      await api.put(`/order/decrementProducts`, {
        orderId: orderProduct.orderId,
        productId: orderProduct.productId,
      });
      getCurrentOrder();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (orderProduct) => {
    try {
      await api.put(`/order/removeProduct`, {
        orderId: orderProduct.orderId,
        productId: orderProduct.productId,
      });
      getCurrentOrder();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckout = async () => {
    try {
      //swal com tem certeza, confirmação
      Swal.fire({
        title: "Tem certeza?",
        text: "Você não poderá desfazer essa ação!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, finalizar!",
      }).then(async (result) => {
        if(result.isConfirmed){
          await api.put(`/order/finishOrder`, {
            orderId: cart.id,
          });
          getCurrentOrder();
          Swal.fire({
            title: "Pedido realizado com sucesso!",
            icon: "success",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
                router.push(`/${store?.name}`)
            }
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      {cart ? (
        <>
          <ContainerCart>
            <h1>Carrinho</h1>
            <Table hover>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Imagem</th>
                  <th>Valor</th>
                  <th>Quantidade</th>
                  <th>Excluir</th>
                </tr>
              </thead>
              <tbody>
                {cart &&
                  cart.Products &&
                  cart.Products.map((orderProduct) => (
                    <tr key={orderProduct.productId}>
                      <td>{orderProduct.Product.name}</td>
                      <td>
                        {" "}
                        <Image
                          src={orderProduct.Product.Upload[0].url || emptyImage}
                          width={100}
                          height={100}
                        />
                      </td>
                      <td>
                        R$ {Number(orderProduct.Product.price).toFixed(2)}
                      </td>
                      <td>
                        {" "}
                        <div className="quantity">
                          <button
                            onClick={() => {
                              handleDecrement(orderProduct);
                            }}
                          >
                            -
                          </button>
                          <p>{orderProduct.quantity}</p>
                          <button
                            onClick={() => {
                              handleIncrement(orderProduct);
                            }}
                          >
                            +
                          </button>
                        </div>{" "}
                      </td>
                      <td>
                        <button
                          className="remove"
                          onClick={() => {
                            handleRemove(orderProduct);
                          }}
                        >
                          <BsFillTrashFill></BsFillTrashFill>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </ContainerCart>
          <FinishCart>
            <h2>Finalizar Pedido</h2>
            <p>Subtotal: R$ {totalPrice.toFixed(2)}</p>
            <button onClick={handleCheckout}>Finalizar</button>
          </FinishCart>
        </>
      ) : (
        <EmptyCart>
          <h1>Carrinho Vazio</h1>
          <p>
            Para continuar comprando, navegue pelas categorias do site ou faça
            uma busca pelo seu produto.
          </p>
        </EmptyCart>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: unset;
  }
`;

const ContainerCart = styled.div`
  display: flex;
  flex: 80%;
  flex-direction: column;

  h1 {
    margin: 20px 0;
  }

  .quantity {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    button {
      width: 30px;
      height: 30px;
      border: none;
      background-color: #fff;
      border-radius: 50%;
      cursor: pointer;
      &:hover {
        background-color: #f5f5f5;
      }
    }
    p {
      margin: 0 10px;
    }
  }

  .remove {
    width: 30px;
    height: 30px;
    border: none;
    background-color: #fff;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
      background-color: #e25a61;
    }
  }

  @media (max-width: 768px) {
    flex: 100%;
    font-size: 12px;
  }
`;

const FinishCart = styled.div`
  flex: 20%;
  padding: 1rem;

  h2 {
    margin: 20px 0;
  }

  p {
    margin: 20px 0;
  }

  button {
    width: 100%;
    height: 50px;
    border: none;
    background-color: ${({ theme }) => theme.colors.primary};
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      background-color: ${({ theme }) => theme.colors.secondary};
    }
  }
`;

const EmptyCart = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
