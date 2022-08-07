import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import api from '../../api/api';
import { ContainerIndex, FeaturedProducts } from './IndexElements';

export default function Index() {
  // pego store da url
  const router = useRouter();
  const NameStore = router.query.store;
  //const store = JSON.parse(localStorage.getItem('store'));
  const [store, setStore] = useState(null);
  useEffect(() => {
    const configStore = async () => {
      const existStore = localStorage.getItem('store');
      if(!existStore){
        if (NameStore) {
          try {
            const { data: store } = await api.get(`/store/${NameStore}`);    
            localStorage.setItem("store", JSON.stringify(store))
            setStore(store)
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        if(NameStore){
          const store = JSON.parse(existStore);
          if(store.name !== NameStore){
            localStorage.removeItem("store")
            configStore()
          } else {
            setStore(store)
          } 
        }
      }
    }
    configStore()
  }, [NameStore])

  const produtosFake = [
    {
      id: 1,
      name: 'Produto 1',
      price: 'R$ 10,00',
      image: 'https://picsum.photos/200/300',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.',
    },
    {
      id: 2,
      name: 'Produto 2',
      price: 'R$ 20,00',
      image: 'https://picsum.photos/200/300',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.',
    },
    {
      id: 3,
      name: 'Produto 3',
      price: 'R$ 30,00',
      image: 'https://picsum.photos/200/300',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.',
    },
    {
      id: 4,
      name: 'Produto 4',
      price: 'R$ 40,00',
      image: 'https://picsum.photos/200/300',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.',
    },
    {
      id: 5,
      name: 'Produto 5',
      price: 'R$ 50,00',
      image: 'https://picsum.photos/200/300',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.',
    },
    {
      id: 6,
      name: 'Produto 6',
      price: 'R$ 60,00',
      image: 'https://picsum.photos/200/300',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.',
    },
    {
      id: 7,
      name: 'Produto 7',
      price: 'R$ 70,00',
      image: 'https://picsum.photos/200/300',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.',
    },
  ];
  return (
    store ? (
      <ContainerIndex>
        <h1>{store.name}</h1>
        <p>{store.description}</p>
        <FeaturedProducts>
          <h2>Produtos em destaque</h2>
          <ul>
            {produtosFake.map((produto) => (
              <li key={produto.id}>
                <img src={produto.image} alt={produto.name} />
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