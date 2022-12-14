import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../contexts/AuthContext';
import { BiLogOut } from 'react-icons/bi';
import { RiCustomerService2Line } from 'react-icons/ri';
import { VscSignIn } from 'react-icons/vsc';
import { StoreContext } from '../Layout';
import { AiOutlineRight } from 'react-icons/ai';
import { MdStorefront } from 'react-icons/md';
import {BsBag, BsCameraFill} from 'react-icons/bs';
import Image from 'next/image';
import api from '../../api/api';
import { GoListUnordered } from 'react-icons/go';
import { FiUsers } from 'react-icons/fi';
import { useRouter } from 'next/router';
import semFoto from '../../images/sem-foto.webp'
import empityProfileImage from '../../images/photo.png'
export default function NavbarAdmin( { children } ) {
    const { user, logout } = useContext(AuthContext);
    const [image, setImage] = useState(null)

    const router = useRouter();

    useEffect(() => {
        if(user && user.Upload){
            setImage(user.Upload.url);
        }
    }, [user?.Upload])    

    const changeImageProfile = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        try {
            const { data } = await api.put("/user/changeImageProfile/" + user.id, formData);
            const { image: url } = data;
    
            setImage(url);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ContainerAdmin>
            <MenuBar>
                <HeaderMenu>
                    <Logo>{user && 
                        user.Store?.Upload?.url ? (
                            <Image src={user.Store?.Upload.url} width={70} height={70} onClick={() => {
                                router.push('/' + user.Store.name);
                            }} style={{cursor:'pointer'}}></Image>
                        ) : (
                            <Image src={semFoto} width={70} height={70} onClick={() => {
                                router.push('/' + user.Store.name);
                            }} style={{cursor:'pointer'}}></Image>
                        )
                    }</Logo>
                    <Logout onClick={logout}>
                        <VscSignIn size={20} color="#fff" />
                    </Logout>
                    <Profile>
                        {console.log(image, empityProfileImage)}
                        {image ? (
                              <img src={image} alt="profile" />
                        ) : (
                            <Image src={empityProfileImage} alt="profile" height={"100px"} width={"100px"}/>
                        )}
                        <input id="changeImageInput" type="file" style={{display: 'none'}} onChange={changeImageProfile}>
                        </input>  
                        <label id="changeImage" htmlFor="changeImageInput"><BsCameraFill /></label>
                        {/*  */}
                        <span>{user?.username}</span>
                    </Profile>
                </HeaderMenu>     
                <Items>
                    <Item>
                        <Link href="/admin/store">
                            <a><MdStorefront/> Loja <AiOutlineRight/></a>
                        </Link>
                    </Item>
                    <Item>
                        <Link href="/admin/products">
                            <a><BsBag/> Produtos <AiOutlineRight/></a>
                        </Link>
                    </Item>
                    { user?.Store?.typeOfStore === 'saleOfProducts' && (
                        <Item>
                            <Link href="/admin/orders">
                                <a><GoListUnordered/> Pedidos <AiOutlineRight/></a>
                            </Link>
                        </Item>
                    )}
                    <Item>
                        <Link href="/admin/customers">
                            <a><RiCustomerService2Line/> Clientes <AiOutlineRight/></a>
                        </Link>
                    </Item>
                    <Item>
                        <Link href="/admin/users">
                            <a><FiUsers/> Usu??rios <AiOutlineRight/></a>
                        </Link>
                    </Item>
                </Items>
            </MenuBar>
            {children}
        </ContainerAdmin>
    );
}

const ContainerAdmin = styled.div`
    display: flex;
`;

const HeaderMenu = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${({ theme }) => `RGB(${theme.colors.primary})`};
    width: 100%;
    height: 10rem;
    position: relative;
    width: 250px;
`;


const Logo = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-right: 20px;
    position: absolute;
    top: 10px;
    left: 10px;
`;
const Logout = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => `RGB(${theme.colors.primary})`};
    color: ${({ theme }) => `RGB(${theme.colors.secondary})`};
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.8);
    border-radius: 50%;
    padding: 15px;
    position: absolute;
    top: 15px;
    right: 15px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    @keyframes swing {
        20% {
            transform: rotate(15deg);
        }
        40% {
            transform: rotate(-10deg);
        }
        60% {
            transform: rotate(5deg);
        }
        80% {
            transform: rotate(-5deg);
        }
        100% {
            transform: rotate(0deg);
        }
    }
    &:hover {
        opacity: 0.8;
        //swing animation for hover
        animation: swing 0.5s ease none;
    }
`;


const MenuBar = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 250px;
    background-color: white;
    //sombra do menu
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    position: fixed;
`;

const Profile = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 80px;
    left: 0; 
    right: 0; 
    margin-left: auto; 
    margin-right: auto; 
    border: none;
    img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }
    #changeImage {
        cursor: pointer;
        position: absolute;

        bottom: 24px;
        right: 80px;

        padding: 5px;
        border-radius: 50%;
        font-size: 1rem;
        display: flex;
        align-items: center;
        background-color: ${({ theme }) => `RGB(${theme.colors.primary})`};
        color: ${({ theme }) => `RGB(${theme.colors.secondary})`};
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    }
    span {
        font-size: .8rem;
        font-family: 'Roboto', sans-serif;
        font-weight: bold;
        color: black;
        margin-top: 8px;
    }
`;

const Title = styled.div`
    h1 {
        font-size: 1.2rem;
        color: white;
    }
`;
const Items = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 5rem;
    width: 90%;
`;
const Item = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 0;
    width: 100%;
    :first-child {
        border-top: 1px solid rgba(0, 0, 0, 0.2);
    }
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    a {
        display: flex;
        align-items: center;
        width: 60%;
        justify-content: space-between;
      
        color: black;
        font-size: .9rem;
        font-weight: bold;
        text-decoration: none;

        svg{
           
        }
        :hover {
            opacity: 0.8;
        }
    }
`;