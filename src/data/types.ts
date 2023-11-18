export interface CartData{
    name: string
    products: ProductDescription[]
}

export interface ProductDescription{
    type: string
    quantity: number
    weight: string | null
}

export interface DataForDB extends CartData {
    total: number;
}

export interface Sale extends DataForDB {
    date: string;
    status: string;
    id?: string;
}

export interface FormSale {
    name: string;
    product:string;
    quantity: number;
    weight: string | null;
}

export interface Prueba {
    nombre: string;
    equipo: string;
    edad: number;
}




