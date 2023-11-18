import { useEffect, useState } from 'react';
import FormPantes from './components/FormPanes';
import Carro from './components/Carro';
import ListaCompras from './components/ListaCompras';
import { DataForDB, Sale } from "./data/types"
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase/firebase-config';
import { initialState } from './helpers/constants';


function App() {

  const [compras, setCompras] = useState<Sale[] | []>([])
  const [carro, setCarro] = useState<DataForDB>(initialState)
  const salesCollection = collection(db, "ventas")

  const getSales = async ()=>{
    const sales  = await getDocs(salesCollection)
    console.log(sales.docs.map(doc => doc.id ))
    setCompras(sales.docs.map(doc =>{ return {...doc.data(), id: doc.id}}) as Sale[])
    }

  useEffect(()=>{
    getSales()
  },[])



  return (
    <>
    <header className=' flex justify-center'>
      <img className=' w-64 m-20' src="logo.jpg" alt="Logo de meza a tu mesa" />
    </header>
    <FormPantes setCarro={setCarro} />
    <Carro carro={carro} getSales={getSales} setCarro={setCarro}/>
    <ListaCompras data={compras} getSales={getSales}/>
    </>
  )
}
export default App

