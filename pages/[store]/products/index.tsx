import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../../../api/api';
import { StoreContext } from '../../../components/Layout';
import Select from 'react-select'

import semFoto from '../../../images/sem-foto.webp';
import Image from 'next/image';

export default function Index () {
    const router = useRouter();
    const { search } = router.query;

    const [products, setProducts] = useState([]);
    const [tagSelected, setTagSelected] = useState(null);
    const [totalProducts, setTotalProducts] = useState(0);
    const [skip, setSkip] = useState(0);
    const limit = 10;
    
    const store = useContext(StoreContext);
    const [totalPages, setTotalPages] = useState(0);

    const [tagsToFilter, setTagsToFilter] = useState([]);

    useEffect(() => {
        if (store) {
            const getProducts = async () => {
                const response = await api.put('/products', {
                    storeId: store.id,
                    skip: skip,
                    limit: limit,
                    tagSelected: tagSelected,
                    search: search ? search : ''
                });
                console.log(response)
                setTotalProducts(response.data[0]);
                setTotalPages(Math.ceil(response.data[0] / limit));
                setProducts(response.data[1]);
            }
            getProducts();

            const getTagsStore = async () => {
                const { data } =  await api.get('/tags/' + store.id);
                console.log(data)
                const dataDefault = { value: null, label: 'Todas' };
                const newData = data.map((tag) => {
                    return {
                        ...tag,
                        value: tag.id,
                        label: tag.name
                    }
                })

                setTagsToFilter([...newData]);
            }
            getTagsStore();
        }
    }, [store, search]);

    useEffect(() => {
        if (store) {
            const getProducts = async () => {
                const response = await api.put('/products', {
                    storeId: store.id,
                    skip: skip,
                    limit: limit,
                    tagSelected: tagSelected,
                    search: search ? search : ''
                });
                setTotalProducts(response.data[0]);
                setTotalPages(Math.ceil(response.data[0] / limit));
                setProducts(response.data[1]);
            }
            getProducts();
        }
    }, [skip, limit, tagSelected]);


    return (
        <Container>
            <LeftSpace>
                <Categorias>
                    <h1>Categorias</h1>
                    <ul>
                        <li onClick={() => {setTagSelected(null)}}>
                            <span>Todas</span>
                        </li>
                        {tagsToFilter.map(tag => (
                            <li key={tag.id} onClick={() => {
                                setTagSelected(tag);
                            }}>
                                 <span>{tag.name}</span>
                            </li>
                        ))}
                    </ul>
                </Categorias>
            </LeftSpace>
            <RightSpace>
                <HeaderPage>
                    <h1>Resultados</h1>
                </HeaderPage>
                <CategoriaExtended>
                    <Select name='Categorias' placeholder='Categorias' options={tagsToFilter} value={tagSelected} onChange={(tag) => {setTagSelected(tag)}}/>
                </CategoriaExtended>
                <Products>
                    <ul>
                        {products.map((produto) => (
                        <li key={produto.id} onClick={() => {
                            router.push('/' + store.name + '/products/' + produto.id);
                        }}>
                            {produto.Upload[0] ? (<>
                                <Image src={produto.Upload[0].url} alt={produto.name} width={200} height={200} />
                            </>) : (
                                <Image src={semFoto} alt='Sem foto' width={200} height={200}/>
                            )}
                            <Description>
                                <strong>{produto.name}</strong>
                                <span>R$ {Number(produto.price).toFixed(2)}</span>
                            </Description>
                        </li>
                        ))}
                    </ul>
                </Products>
                  {/* Pagination */}
                {totalPages > 1 && (
                    <Pagination>
                        <ButtonPagination onClick={() => { setSkip(skip - limit) }} disabled={skip === 0}>Anterior</ButtonPagination>
                        {Array.from(Array(totalPages).keys()).map((page) => (
                            <>
                            {skip / limit !== page ? (
                                <ButtonPagination key={page} onClick={() => { setSkip(page * limit) }}>{page + 1}</ButtonPagination>
                            ) : (
                                <CurrentButtonPagination key={page} onClick={() => { setSkip(page * limit) }}>{page + 1}</CurrentButtonPagination>
                            )}
                            </>
                        ))}
                        <ButtonPagination onClick={() => {setSkip(skip + limit) }} disabled={(skip + limit) >= totalProducts}>Próximo</ButtonPagination>
                    </Pagination>
                )}
            </RightSpace>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    width: 100%;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
        align-items: center;
        justify-content: center;
    }
`;

const LeftSpace = styled.div`
    width: 15%;
    height: 100%;
    margin-right: 1rem;

    @media (max-width: 768px) {
        display: none;
    }
`;

const RightSpace = styled.div`
    width: 85%;
    height: 100%;
    position: relative;
    padding-bottom: 4rem;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const Categorias = styled.div`
    width: 100%;
    height: 100%;
    h1 {
        margin-top: 2rem;
        font-size: 1.2rem;
        color: ${({ theme }) => theme.colors.primary};
    }
    ul {
        list-style: none;
        li {
            span {
                cursor: pointer;
                display: block;
                padding: .5rem 0;
                font-size: 1rem; 
                color: ${({ theme }) => theme.colors.primary};
                text-decoration: none;
                transition: .3s;
                opacity: 0.8;
                &:hover {
                    opacity: 1;
                    //color: ${({ theme }) => theme.colors.secondary};

                }
            }
        }
    }
`;

const HeaderPage = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    color: ${({ theme }) => theme.colors.primary};
    //text shadow color secondary
    text-shadow: 1px 1px 2px ${({ theme }) => theme.colors.secondary};


    h1 {
        font-size: 1.6rem;
    }

    @media (max-width: 768px) {
        h1 {
            font-size: 1.3rem;
        }
    }
`;

const Products = styled.div`
    width: 95%;
    display: flex;
    flex-direction: column;
    h2 {
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 20px;
        color: ${({ theme }) => theme.colors.secondary};
    }
    ul {
        margin-left: 0;
        padding-left: 0;
        display: grid;
        justify-items: center;
        gap: 5rem;
        grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
        li {
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            align-items: center;
            //padding: 1rem;
            cursor: pointer;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
            img {
                width: 200px;
                height: 250px;
                object-fit: cover;
            }
            strong {
                font-size: 1.2rem;
                font-weight: bold;
            }
            p {
                font-size: 1rem;
                margin-top: 5px;
            }

            :hover {
                //sombra mais forte
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.7);
            }
        }
    }

    @media (max-width: 768px) {
        width: 100%;
        ul {
           // grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
            gap: 2rem 1rem;

            li {
                img {
                    width: 150px;
                    height: 200px;
                }

                strong {
                    font-size: 1rem;
                }
                p {
                    font-size: 0.8rem;

                }


            }


        }
    }
`;

const Description = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: .5rem;
    border-top: 1px solid #eee;
`;

const Pagination = styled.div`
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    height: 5rem;
    margin: 0 auto;
    left: 0px;
    right: 0;
    justify-content: center;
`;

const ButtonPagination = styled.button`
    cursor: pointer;
    margin-right: 1rem;
    border: none;
    background-color: ${({ theme }) => { return theme.colors.secondary}};
    color: white;
    font-size: .9rem;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    -webkit-box-shadow: 0px 5px 16px 1px #000000; 
    box-shadow: 0px 5px 16px 1px #000000;
    opacity: 1;
    &:hover {
        opacity: 0.8;
    }
`;

const CurrentButtonPagination = styled.button`
    cursor: pointer;
    margin-right: 1rem;
    border: none;
    background-color: ${({ theme }) => { return theme.colors.primary }};
    color: white;
    font-size: .9rem;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    &:hover {
        opacity: 0.8;
    }
`;

const CategoriaExtended = styled.div`
    display: none;
    @media (max-width: 768px) {
        display: block;
    }
`;