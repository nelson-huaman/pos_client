import { create } from "zustand";
import { Coupon, CouponResponseSchema, Product, ShoppingCard } from "./schemas";
import { devtools } from "zustand/middleware";

interface Store {
   total: number
   discount: number
   contents: ShoppingCard
   coupon: Coupon
   addToCard: (product: Product) => void
   updateQuantity: (id: Product['id'], quantity: number) => void
   removeProduct: (id: Product['id']) => void
   calculateTotal: () => void
   applyCoupon: (couponName: string) => Promise<void>
   applyDiscount: () => void
   clearOrder: () => void
}

const initialState = {
   total: 0,
   discount: 0,
   contents: [],
   coupon: {
      percentage: 0,
      name: '',
      message: ''
   }
}

export const useStore = create<Store>()(devtools((set, get) => ({
   ...initialState,
   addToCard: (product) => {

      const { id: productId, categoryId, ...data } = product
      let contents: ShoppingCard = []

      const duplicated = get().contents.findIndex(item => item.productId === productId)
      if (duplicated >= 0) {

         if (get().contents[duplicated].quantity >= get().contents[duplicated].inventory) return

         contents = get().contents.map(item => item.productId === productId ? {
            ...item,
            quantity: item.quantity + 1
         } : item)
      } else {
         contents = [...get().contents, {
            ...data,
            quantity: 1,
            productId
         }]
      }

      set(() => ({
         contents
      }))
      get().calculateTotal()
   },
   updateQuantity: (id, quantity) => {
      set((state) => ({
         contents: state.contents.map(item => item.productId === id ? { ...item, quantity } : item)
      }))

      get().calculateTotal()
   },
   removeProduct: (id) => {
      set((state) => ({
         contents: state.contents.filter(item => item.productId !== id)
      }))

      if (!get().contents.length) {
         get().clearOrder()
      }
      
      get().calculateTotal()
   },
   calculateTotal: () => {
      set((state) => ({
         total: state.contents.reduce((total, item) => total + (item.quantity * item.price), 0)
      }))

      if (get().coupon.percentage) {
         get().applyDiscount()
      }
   },
   applyCoupon: async (couponName) => {
      const req = await fetch('/coupons/api', {
         method: 'POST',
         body: JSON.stringify({
            coupon_name: couponName
         })
      })

      const json = await req.json()
      const coupon = CouponResponseSchema.parse(json)
      set(() => ({
         coupon
      }))

      if (coupon.percentage) {
         get().applyDiscount()
      }
   },
   applyDiscount: () => {
      const subTotalAmount = get().contents.reduce((total, item) => total + (item.quantity * item.price), 0)
      const discount = (get().coupon.percentage / 100) * subTotalAmount
      const total = subTotalAmount - discount

      set(() => ({
         discount,
         total
      }))
   },
   clearOrder: () => {
      set(() => ({
         ...initialState
      }))
   }
})))