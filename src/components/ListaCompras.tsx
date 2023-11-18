import { StatusOnlineIcon, XCircleIcon} from "@heroicons/react/outline";
import {
  Badge,
  Card,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title,
} from "@tremor/react";
import { Sale } from "../data/types";
import { db } from "../firebase/firebase-config";
import { deleteDoc, doc, setDoc } from "firebase/firestore";

interface ListaComprasProps {
  data: Sale[];
  getSales: () => void;
}


const ListaCompras: React.FC<ListaComprasProps>= ({data, getSales}) =>{

  const updateStatus = async (id:string| undefined, status: string)=>{
    if (status === "pagado"){
      console.log("no hice nada xD")
      return}
    if(id !== undefined){
      try {
        const sale = doc(db, 'ventas', id);
        await setDoc(sale, { status: "pagado" }, { merge: true });
        getSales()
        }
       catch (error) {
        console.log(error)
      }

      }
  }

  const deleteSale = async  (id:string| undefined)=>{

    if(id !== undefined){
      try {
        const deleteItemFromDB = await deleteDoc(doc(db, "ventas", id));
        console.log(deleteItemFromDB);
        getSales()
      } catch (error) {
        console.log(error)
      }
    }

  }

  return <>
    <Card>
    <Title>Lista de ventas</Title>
    <Table className="mt-5">
      <TableHead>
        <TableRow>
          <TableHeaderCell>Nombre</TableHeaderCell>
          <TableHeaderCell>Datos Extras</TableHeaderCell>
          <TableHeaderCell>Deuda</TableHeaderCell>
          <TableHeaderCell>Estado</TableHeaderCell>
          <TableHeaderCell>Fecha</TableHeaderCell>
          <TableHeaderCell>Borrar</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell className=" capitalize">{item.name}</TableCell>
            <TableCell>
              <Text>detalles...</Text>
            </TableCell>
            <TableCell>
              <Text>{item.total}</Text>
            </TableCell>
            <TableCell>
              <Badge className=" cursor-pointer" onClick={()=>{updateStatus(item.id, item.status)}} color={item.status === "pendiente" ? "red" : "emerald"} icon={StatusOnlineIcon}>
                {item.status}
              </Badge>
            </TableCell>
            <TableCell>
              <Text>{item.date}</Text>
            </TableCell>
            <TableCell>
              <button onClick={()=>deleteSale(item.id)}><Icon color="red" size="md" icon={XCircleIcon} /></button>
            </TableCell>
          </TableRow>
          
        ))}
      </TableBody>
    </Table>
  </Card>
  
  </>
};

export default ListaCompras;