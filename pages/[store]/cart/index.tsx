import { useContext, useEffect, useState } from "react";
import api from "../../../api/api";
import { StoreContext } from "../../../components/Layout";
import { AuthContext } from "../../../contexts/AuthContext";
import styled from "styled-components";
import Image from "next/image";
import emptyImage from "../../../images/sem-foto.webp";

export default function Index() {
    const store = useContext(StoreContext);
    const { userClient } = useContext(AuthContext);
    const [cart, setCart] = useState(null);
    useEffect(() => {
        if (userClient) {
           const getCurrentOrder = async () => {
                const { data } = await api.get(`/order/${userClient.id}`);
                console.log(data);
                setCart(data);
           }
            getCurrentOrder();
        }
    }, [userClient])
    return (
        <Container>
            <h1>Cart</h1>
            <ContentCart>
            {cart && cart.Products && cart.Products.map((orderProduct) => (
                <ProductCart key={orderProduct.productId}>
                    <h2>{orderProduct.Product.name}</h2>
                    <Image src={orderProduct.Product.Upload[0].url || emptyImage} width={100} height={100} />
                    <p>{orderProduct.Product.price}</p>
                    <div className="quantity">
                        <button>-</button>
                        <p>{orderProduct.quantity}</p>
                        <button>+</button>
                    </div>
                </ProductCart>
            ))}
            </ContentCart> 
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ContentCart = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ProductCart = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around; 
    align-items: center;
    border: 1px solid black;
    margin: 10px;
    padding: 10px;
    .quantity { 
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        button {
            width: 20px;
            height: 20px;
            border: 1px solid black;
            background-color: white;
            color: black;
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
        }
        p {
            width: 20px;
            height: 20px;
            border: 1px solid black;
            background-color: white;
            color: black;
            font-size: 20px;
            font-weight: bold;
            text-align: center;
        }
    }
`;

