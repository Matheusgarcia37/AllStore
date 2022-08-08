import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
export default function Admin() {
const { user } = useContext(AuthContext);
  return (
    <div>
      <h1>Admin {user?.username}</h1>
    </div>
  );
}