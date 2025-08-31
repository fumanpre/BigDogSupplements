import { formatPrice } from '@/lib/db/format'

interface PriceTagProps {
  price: number
  styleClassName?: string
}

export default function PriceTag({ price, styleClassName }: PriceTagProps) {
  const badgeClass = styleClassName || 'badge-primary' // fallback to default

  return (
    <span
      className={`text-2xl md:text-3xl xl:text-4xl text-yellow-600 {badgeClass}`}
    >
      {formatPrice(price)}
    </span>
  )
}
