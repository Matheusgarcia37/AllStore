import { StoreContext } from "../../../components/Layout";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import api from "../../../api/api";
export default function Orders() {
    const store = useContext(StoreContext);
    const { userClient } = useContext(AuthContext);
    const getOrders = async () => {
        const { data } = await api.get(`/orders/getOrders/${userClient.id}`);

        console.log(data);
    };
    useEffect(() => {
        if(userClient) {
            getOrders();
        }
    },[userClient]);
  return (
    <div>
    </div>
  );
}