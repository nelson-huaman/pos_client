import { formatCurrency } from "@/src/utils"

type AmountPorps = {
   label: string
   amount: number
   discount?: boolean
}

export default function Amount({ label, amount, discount }: AmountPorps) {
   return (
      <div className={`flex justify-between items-center ${discount && 'bg-green-300 text-green-900 p-2'}`}>
         <dt className="font-bold">
            {label}
         </dt>
         <dd className="text-gray-900">
            {discount && '-'} {formatCurrency(amount)}
         </dd>
      </div>
   )
}
