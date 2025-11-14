'use server'

import { ErrorResponseSchema, ProductFormSchema } from "@/src/schemas"

type ActionState = {
   errors: string[]
   success: string
}

export async function addProduct(prevState: ActionState, formData: FormData) {

   const product = ProductFormSchema.safeParse({
      name: formData.get('name'),
      price: Number(formData.get('price')),
      image: formData.get('image'),
      inventory: Number(formData.get('inventory')),
      categoryId: Number(formData.get('categoryId'))
   })

   if (!product.success) {
      return {
         errors: product.error.issues.map(error => error.message),
         success: ''
      }
   }

   const url = `${process.env.API_URL}/products`
   const req = await fetch(url, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(product.data)
   })

   const json = await req.json()

   if (!req.ok) {
      const errors = ErrorResponseSchema.parse(json)
      return {
         errors: errors.message.map(msg => msg),
         success: ''
      }
   }
   
   return {
      errors: [],
      success: 'Producto Agregado correctamente'
   }
}