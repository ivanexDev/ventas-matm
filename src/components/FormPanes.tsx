import { Button, NumberInput, TextInput, Title } from "@tremor/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { DataForDB, FormSale } from "../data/types";

interface FormPanesProps {
  setCarro: React.Dispatch<React.SetStateAction<DataForDB>>;
}

const FormPanes: React.FC<FormPanesProps> = ({ setCarro }) => {
  const { register, handleSubmit } = useForm<FormSale>();
  const onSubmit: SubmitHandler<FormSale> = (data) =>{
    console.log(data)
    setCarro((prevCarro) => ({
      total: 0,
      name: data.name,
      products: [
        ...prevCarro.products,
        {
          type: data.product,
          quantity: data.quantity,
          weight: data.weight
        }
      ]
    }));
  };

  return (
    <form
      className="flex mb-4 gap-5 items-center justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Nombre */}
      <div className="flex gap-2 items-center justify-center">
        <Title>Nombre:</Title>
        <TextInput
          {...register("name")}
          placeholder="Nombre"
          className=" h-8"
          required
        />
      </div>
      {/* Producto */}
      <div className="flex gap-2 items-center justify-center">
        <Title>Producto:</Title>
      {/* <SelectPanes register={register} /> */}
        <div className="max-w-sm mx-auto space-y-6">
          <select
            className="w-full outline-none text-left whitespace-nowrap truncate rounded-tremor-default 
            focus:ring-2 text-tremor-default shadow-tremor-input
             focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted dark:shadow-dark-tremor-input
              dark:focus:border-dark-tremor-brand-subtle dark:focus:ring-dark-tremor-brand-muted pl-3
              py-2 border placeholder:text-tremor-content dark:placeholder:text-tremor-content
               bg-tremor-background dark:bg-dark-tremor-background hover:bg-tremor-background-muted
                dark:hover:bg-dark-tremor-background-muted text-tremor-content
                 dark:text-dark-tremor-content border-tremor-border dark:border-dark-tremor-border"
            {...register("product")}
          >
            <option value="Con todo">Con Todo</option>
            <option value="Sin nada">Sin nada</option>
            <option value="Solo frutos secos">Solo frutos secos</option>
            <option value="Solo fruta confitada">Solo fruta confitada</option>
            <option value="Cola de mono">Cola de mono</option>
          </select>
        </div>

      {/* Peso */}

        <div className="flex gap-2 items-center justify-center">
        <Title>Peso:</Title>
          <select {...register("weight")}
           className=" outline-none text-left whitespace-nowrap truncate rounded-tremor-default 
            focus:ring-2 text-tremor-default shadow-tremor-input
             focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted dark:shadow-dark-tremor-input
              dark:focus:border-dark-tremor-brand-subtle dark:focus:ring-dark-tremor-brand-muted
              py-2 border placeholder:text-tremor-content dark:placeholder:text-tremor-content
               bg-tremor-background dark:bg-dark-tremor-background hover:bg-tremor-background-muted
                dark:hover:bg-dark-tremor-background-muted text-tremor-content
                 dark:text-dark-tremor-content border-tremor-border dark:border-dark-tremor-border">
            <option value="1/2 Kg">Medio Kg</option>
            <option value="1 Kg">1 Kg</option>
            <option value="1 Lt">1 Lt</option>
          </select>
        </div>

      </div>
      {/* Cantidad */}
      <div className="flex gap-2 items-center justify-center">
        <Title>Cantidad:</Title>
        <NumberInput {...register("quantity")} className=" w-10" min={0} />
      </div>

      <Button className=" h-8">Agregar</Button>

    </form>
  );
};

export default FormPanes;
