import Image from 'next/image'

export default function Hero() {
  return (
    <div className="hero min-h-screen">
      <Image
        src="https://images.unsplash.com/photo-1649789261044-0c6a9fb528ff?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJvZHlidWlsZGluZyUyMGNvdXBsZXxlbnwwfHwwfHx8MA%3D%3D"
        fill
        alt="Hero Image"
        className="object-cover brightness-60 pt-[0\25px] -z-10"
        priority
      />

      {/* Hero Content */}
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Fuel Your Greatness</h1>
          <p className="mb-5 text-xl">
            Premium supplements backed by science. Designed to help you recover
            faster, lift stronger, and live better.
          </p>
        </div>
      </div>
    </div>
  )
}
