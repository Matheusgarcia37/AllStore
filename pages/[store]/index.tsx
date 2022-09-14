import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import api from '../../api/api';
import { StoreContext } from '../../components/Layout';
import { ContainerIndex, FeaturedProducts } from './IndexElements';
import semFoto from '../../images/sem-foto.webp'
export default function Index() {
  const router = useRouter();
  const store = useContext(StoreContext);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if(store) {
      const getFeaturedProducts = async () => {
        const { data } = await api.put('/products/featured', {
          storeId: store.id,
        })
        console.log(data)
        setProducts(data);
      }
      getFeaturedProducts();
    }
  }, [store]);

  return (
    store ? (
      <ContainerIndex>
        <h1>{store.name}</h1>
        <p>{store.description}</p>
        <FeaturedProducts>
          <h2>Produtos em destaque</h2>
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
                <strong>{produto.name}</strong>
                <span>{produto.price}</span>
              </li>
            ))}
          </ul>
        </FeaturedProducts>
      </ContainerIndex>
    )
    : (
      <div>
        <h1>Carregando...</h1>
      </div>
    )
  )
}