import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import React from 'react'
import Select from 'react-select'
import api from '../../../../api/api';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { AuthContext } from '../../../../contexts/AuthContext';
import FormData from 'form-data';
import { useRouter } from 'next/router';

type ProdutoType = {
    name: string,
    description: string,
    price: string,
}

export default function Index(){
    const ImagensInput = useRef(null);

    const [ImagensFiles, setImagensFiles] = useState({ length: 0 });

    const router = useRouter();
    const { id: produtoId } = router.query;
    console.log(produtoId)

    const [tagsDisponiveis, setTagsDisponiveis] = useState([]);

    const [tagsSelecionadas, setTagsSelecionadas] = useState([]);

    const [produto, setProduto] = useState({
        name: '',
        description: '',
        price: 0,
        stock: 0,
        featured: false,
    });

    const { user } = useContext(AuthContext);

    useEffect(() => {
        const getProduct = async () => {
            if(produtoId){
                const { data } = await api.get(`/products/${produtoId}`);
                console.log(data)
                setProduto({
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    featured: data.featured,
                    stock: data.stock,
                });
                setTagsSelecionadas(data.Tag.map(tag => ({
                    value: tag.id,
                    label: tag.name,
                })));
                const imagesUploaded = { 
                    length: data.Upload.length,
                }
                data?.Upload?.forEach((image, key) => {
                    imagesUploaded[key] = image.url;
                })
                setImagensFiles(imagesUploaded);
               console.log("imagens", data.Upload)
            }
        }
        getProduct();
        console.log("imagensFiles",ImagensFiles);
    } , [produtoId]);

    useEffect(() => {
        const getTags = async () => {
            const response = await api.get('/tags');
            console.log(response.data);
            setTagsDisponiveis(response.data.map(tag => ({
                value: tag.id,
                label: tag.name,
            })));
        }
        getTags();
    }, []);
    
    const createTags = async () => {
        const { value: nameTag } = await Swal.fire({
            title: 'Digite o nome da tag',
            input: 'text',
            inputLabel: 'Tag',
            showCancelButton: true,
            inputValidator: (value) => {
              if (!value) {
                return 'Você precisa escrever algo!'
              }
            },
          }) 
        if (nameTag && user?.Store.id) { 
            await api.post('/tags', {
                name: nameTag,
                storeId: user.Store.id
            });
            
            const response = await api.get('/tags');
            setTagsDisponiveis(response.data.map(tag => ({
                value: tag.id,
                label: tag.name,
            })));
            //swal de sucesso
            Swal.fire({
                title: 'Tag criada com sucesso',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    const handleChangeProduto = (e) => {
        setProduto({ ...produto, [e.target.name]: e.target.value });
    }

    const handleAlterar = async (e) => {
        // FormData.prototype[Symbol.toStringTag] = 'FormData';
        e.preventDefault();
        if(user.Store.id){
            const dados = {
                name: produto.name,
                description: produto.description,
                price: produto.price,
                stock: produto.stock,
                featured: produto.featured,
                tags: tagsSelecionadas.map(tag => tag.value)
            }


           
            const formData = new FormData();
            for (let i = 0; i < ImagensFiles.length; i++) {
                formData.append('file', ImagensFiles[i]);
            }
            formData.append('data', JSON.stringify(dados));

            const response = await api.put('/products/' + produtoId , formData);
            if(response.status === 200){
                Swal.fire({
                    title: 'Produto alterado com sucesso',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    }

    return (
        <Container> 
           <HeaderPage>
                <h1>Alterar produto</h1>
           </HeaderPage>
            <Content>
                <Formulario>
                    <Destaque>
                        <span>Destaque</span>
                        <input type="checkbox" checked={produto.featured} onChange={(e) => { setProduto({...produto, featured: e.target.checked}) }} />
                   </Destaque>
                    <label>
                        <span>Nome do Produto</span>
                        <input type="text" value={produto.name} name='name' onChange={handleChangeProduto} />
                    </label>
                    <label>
                        <span>Descrição</span>
                        <textarea value={produto.description} name='description' onChange={handleChangeProduto}></textarea>
                    </label>
                    <label>
                        <span>Preço</span>
                        <input type="text" value={produto.price} name='price' onChange={handleChangeProduto} />
                    </label>
                    {
                        user?.Store?.typeOfStore === "saleOfProducts" && (
                            <label>
                                <span>Quantidade em estoque</span>
                                <input type="number" value={produto.stock} name='stock' onChange={handleChangeProduto} />
                            </label>
                        )
                    }
                    {/* Categorias */}
                    <Categorias>
                        <label>Categorias</label>
                        <SelectContainer>
                            <Select
                                value={tagsSelecionadas}
                                isMulti
                                name="tags"
                                options={tagsDisponiveis}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                instanceId={'tags'}
                                onChange={(e: any) => {
                                    setTagsSelecionadas(e);
                                }}
                            />
                            <button type="button" onClick={createTags}>Adicionar nova categoria</button>
                        </SelectContainer>
                    </Categorias>

                                        {/* Imagens do produto */}
                                        <Imagens>
                        <label>Imagens</label>
                        <input type="file" ref={ImagensInput} multiple style={{display: 'none'}} onChange={(e) => { 
                            setImagensFiles(e.target.files as any);
                            console.log(e.target.files);
                        }} />
                        <button type="button" onClick={() => {ImagensInput.current.click()}}>Adicionar imagens</button>
                    </Imagens>
                    {/* Se tiver imagens mostra-las */}
                    {ImagensFiles.length > 0 && (
                        <ImagensSelecionadas>
                            {Array.from(ImagensFiles).map((file: any, key) => (
                                <div key={key}>
                                    {console.log('matheus',file)}
                                    {   file instanceof File ? (
                                        <>
                                            <img src={URL.createObjectURL(file) ? URL.createObjectURL(file) : null} alt={file.name} />
                                            <span>{file?.name}</span>
                                            </>
                                        ) : (
                                            <>
                                                <img src={file} alt={'Image ' + key + 1} />
                                                <span>{'Image ' + key + 1}</span>
                                            </>
                                        )}
                                </div>
                            ))}
                        </ImagensSelecionadas>
                    )}
                  
                    <ButtonAlterar type="button" onClick={handleAlterar}>Alterar</ButtonAlterar>
                </Formulario>

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

const Formulario = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    label {
        display: flex;
        flex-direction: column;
        span {
            padding: 0.5rem;
            font-size: .75rem;
            font-weight: bold;
            color: black;
            text-transform: uppercase;
        }
        input {
            padding: 0.5rem;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: .75rem;
            color: black;
        }
    }
`;
const Categorias = styled.div`
    margin-top: 1rem;
    display: flex;
    width: 100%;
    flex-direction: column;
    label {
        padding: 0.5rem;
        font-size: .75rem;
        font-weight: bold;
        color: black;
        text-transform: uppercase;
    }
`;
const SelectContainer = styled.div`
    display: flex;
    flex-direction: column;
    button {
        margin-top: 1rem;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: .75rem;
        color: black;
        text-transform: uppercase;
        width: 15%;
    }
`
    
const ButtonAlterar = styled.button`
    margin-top: 1rem;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: .75rem;
    color: black;
    text-transform: uppercase;
    width: 20%;
    align-self: flex-end;
`;

const Destaque = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
    span {
        padding: 0.5rem;
        font-size: .75rem;
        font-weight: bold;
        color: black;
        text-transform: uppercase;
    }
    input {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: .75rem;
        color: black;
    }
`;


const Imagens = styled.div`
    margin-top: 1rem;
    display: flex;
    width: 100%;
    flex-direction: column;
    label {
        padding: 0.5rem;
        font-size: .75rem;
        font-weight: bold;
        color: black;
        text-transform: uppercase;
    }
    button {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: .75rem;
        color: black;
        text-transform: uppercase;
        width: 15%;
    }
`;

const ImagensSelecionadas = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 1rem;
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 1rem;
        margin-bottom: 1rem;
        img {
            width: 100px;
            height: 100px;
            object-fit: cover;
        }
        span {
            padding: 0.5rem;
            font-size: .75rem;
            font-weight: bold;
            color: black;
            text-transform: uppercase;
        }
    }
`;