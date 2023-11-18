import { Accordion, AccordionHeader, AccordionBody, AccordionList, Button } from "@tremor/react";
import {
    Table,
    Text,
    TableHead,
    TableHeaderCell,
    TableBody,
    TableRow,
    TableCell,
  } from "@tremor/react";
import { CartData, DataForDB, Sale } from "../data/types";
import formatedDate from "../helpers/formatedDate";
import { db } from "../firebase/firebase-config";
import { addDoc, collection } from "firebase/firestore";
import { initialState } from "../helpers/constants";
import { Dispatch, SetStateAction } from "react";

  interface CarroProps {
    carro: CartData
    getSales: ()=>void
    setCarro: Dispatch<SetStateAction<DataForDB>>
  }


const Carro: React.FC<CarroProps>  = ({carro, getSales, setCarro}) => {
const {name, products} = carro;


const total = ()=>{
  let total = 0
  products.forEach(({weight, quantity})=>{
    if(weight === "1/2 Kg"){
      total += (5000 * quantity)
    }
    else if(weight === "1 Kg"){
      total += (10000 * quantity)
    }
    else{
      total += (6000 * quantity)
    }
    
  })
  return total
}

const sendData= async ()=>{
  const data:Sale = {
    name,
    products,
    total: total(),
    date: formatedDate(),
    status: "pendiente"
  }

  try {
    const docRef = await addDoc(collection(db, "ventas"), data);
    console.log("Document written with ID: ", docRef.id);
    getSales()
    setCarro(initialState)
  } catch (error) {
    console.log(error)
  }



  console.log(data)


}

  return (

<>
<AccordionList className="max-w-6xl mx-auto">
    <Accordion>
      <AccordionHeader>Carro</AccordionHeader>
      <AccordionBody>

    <Table className="mt-5">
      <TableHead>
        <TableRow>
          <TableHeaderCell>Nombre</TableHeaderCell>
          <TableHeaderCell>Productos</TableHeaderCell>
          <TableHeaderCell>Total</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
      <TableRow>
            <TableCell className=" capitalize">{name}</TableCell>
            <TableCell>
              {products.map((producto, index)=><Text key={`${producto.type}-${index}`}>{producto.type}, peso: {producto.weight} cantidad : {producto.quantity}</Text>)}
            </TableCell>
            <TableCell>
              <Text>{total()}</Text>
            </TableCell>
          </TableRow>
      </TableBody>
    </Table>
    <div className="flex justify-end">
    <Button onClick={sendData}>Confirmar</Button>
    </div>
      </AccordionBody>
    </Accordion>
  </AccordionList>













    

  </>
  )
}

export default Carro