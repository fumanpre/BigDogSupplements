import { Category } from '@prisma/client'
import Link from 'next/link'
import PriceTag from './PriceTag'
import Image from 'next/image'

interface ByCategoryCardProps {
  category: Category
}

export default function ByCategoryCard({ category }: ByCategoryCardProps) {
  return (
    <Link
      href={'/search?query=' + category.id}
      className="card bg-base-100 hover:shadow-lg transition-shadow group p-0"
    >
      <figure className="pt-2 overflow-hidden rounded-lg">
        <Image
          src={category.imageUrl}
          alt={category.name}
          width={800}
          height={400}
          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center py-3">
        <h2 className="card-title">{category.name}</h2>
      </div>
    </Link>
  )
}
