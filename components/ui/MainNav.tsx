import { CategoriesRespnseSchema } from "@/src/schemas";
import Logo from "./Logo";
import Link from "next/link";

async function getCategories() {
   const url = `${process.env.API_URL}/categories`
   const req = await fetch(url)
   const json = await req.json()
   const category = CategoriesRespnseSchema.parse(json)

   return category
}

export default async function MainNav() {

   const categories = await getCategories()

   return (
      <header className="px-10 py-5 bg-gray-700 flex flex-col md:flex-row justify-between ">
         <div className="flex justify-center">
            <Logo />
         </div>

         <nav className="flex flex-col md:flex-row gap-2 items-center mt-5 md:mt-0">
            {categories.map(category => (
               <Link
                  key={category.id}
                  href={`/${category.id}`}
                  className="text-white hover:text-green-500 font-bold p-2"
               >
                  {category.name}
               </Link>
            ))}

            <Link
               href={'/admin/sales'}
               className="text-black bg-green-500 font-bold py-2 px-10 rounded-lg"
            >
               Panel de Administración
            </Link>

         </nav>
      </header>
   )
}