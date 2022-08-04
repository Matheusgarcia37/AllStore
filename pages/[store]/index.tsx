import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import api from '../../api/api';

export default function Index() {
  // pego store da url
  const router = useRouter();
  const NameStore = router.query.store;
  const [store, setStore] = useState(null);

  return (
    store ? (
      !store.error ? (
        <div>
          <h1>Store {store?.name}</h1>
        </div>
      )
        : (
          <div>
            <h1>Store não encontrado</h1>
          </div>
        )
    )
      : (
        <div>
          <h1>Aguarde...</h1>
        </div>
      )
  );
}