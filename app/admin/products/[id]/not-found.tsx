import Heading from "@/components/ui/Heading";
import Link from "next/link";

export default function NotFound() {
   return (
      <div className="text-center">
         <Heading>Producto no encotrado</Heading>
         <p>tal vez quieres volver a {''}
            <Link className="text-green-400 font-bold" href={'/admin/products?page=1'}>Prodcutos</Link>
         </p>
      </div>
   )
}