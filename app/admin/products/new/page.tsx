import AddProductForm from "@/components/products/AddProductForm";
import ProductForm from "@/components/products/ProductForm";
import Heading from "@/components/ui/Heading";
import Link from "next/link";

export const dynamic = "force-dynamic"

export default function NewProductPage() {
   return (
      <>
         <Link
            href={'/admin/products'}
            className="bg-green-400 rounded font-bold py-2 px-10"
         >Volver</Link>
         <Heading>Nuevo Producto</Heading>

         <AddProductForm>
            <ProductForm />
         </AddProductForm>
      </>
   )
}
