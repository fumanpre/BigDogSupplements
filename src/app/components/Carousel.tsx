import Image from 'next/image'

export default function Carousel() {
  return (
    <div className="carousel w-full">
      <div
        id="slide1"
        className="carousel-item relative w-full flex justify-center"
      >
        <div className="min-w-[300px] w-full max-w-full">
          <Image
            src="https://res.cloudinary.com/divvzytna/image/upload/v1754852139/freepik__the-style-is-candid-image-photography-with-natural__17913_cykeb8_5fef51.png"
            alt="Slider_1 Img"
            width={1200}
            height={400}
            layout="responsive"
            priority
            className="m-auto brightness-60"
          />
        </div>

        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
               max-w-md text-white z-20 p-6 text-center"
        >
          <h2 className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Most Premium Supplements
          </h2>
          <p className="mt-4 text-md sm:text-2xl md:text-3xl lg:text-3xl font-semibold max-w-lg mx-auto">
            We keep very less margins than others.
          </p>
        </div>

        {/* Navigation arrows */}
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between z-10">
          <a
            href="#slide4"
            className="btn btn-circle hover:size-[42px] hover:bg-amber-200"
          >
            ❮
          </a>
          <a
            href="#slide2"
            className="btn btn-circle hover:size-[42px] hover:bg-amber-200"
          >
            ❯
          </a>
        </div>
      </div>

      <div
        id="slide2"
        className="carousel-item relative w-full flex justify-center"
      >
        <div className="min-w-[300px] w-full max-w-full">
          <Image
            src="https://res.cloudinary.com/divvzytna/image/upload/v1754853302/freepik__the-style-is-candid-image-photography-with-natural__87361_ubqq2h_1937a7_c6c465.png"
            alt="Slider_1 Img"
            width={1200}
            height={400}
            layout="responsive"
            priority
            className="m-auto brightness-65 min-h-[250px]"
          />
        </div>

        <div
          className="absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2
               max-w-md text-white z-20 p-6 text-center"
        >
          <h2 className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Shop. Scan. Earn.
          </h2>
          <p className="mt-4 text-md sm:text-2xl md:text-3xl lg:text-3xl font-semibold max-w-lg mx-auto">
            Join today and collect points with every supplement purchase.
          </p>
        </div>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a
            href="#slide1"
            className="btn btn-circle hover:size-[42px] hover:bg-amber-200"
          >
            ❮
          </a>
          <a
            href="#slide3"
            className="btn btn-circle hover:size-[42px] hover:bg-amber-200"
          >
            ❯
          </a>
        </div>
      </div>
      <div
        id="slide3"
        className="carousel-item relative w-full flex justify-center"
      >
        <div className="min-w-[300px] w-full max-w-full">
          <Image
            src="https://res.cloudinary.com/divvzytna/image/upload/v1754852139/freepik__the-style-is-candid-image-photography-with-natural__17913_cykeb8_5fef51.png"
            alt="Slider_1 Img"
            width={1200}
            height={400}
            layout="responsive"
            priority
            className="m-auto brightness-60"
          />
        </div>

        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
               max-w-md text-white z-20 p-6 text-center"
        >
          <h2 className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Most Premium Supplements
          </h2>
          <p className="mt-4 text-md sm:text-2xl md:text-3xl lg:text-3xl font-semibold max-w-lg mx-auto">
            We keep very less margins, not compromising on quality.
          </p>
        </div>

        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a
            href="#slide2"
            className="btn btn-circle hover:size-[42px] hover:bg-amber-200"
          >
            ❮
          </a>
          <a
            href="#slide4"
            className="btn btn-circle hover:size-[42px] hover:bg-amber-200"
          >
            ❯
          </a>
        </div>
      </div>
      <div
        id="slide4"
        className="carousel-item relative w-full flex justify-center"
      >
        <div className="min-w-[300px] w-full max-w-full">
          <Image
            src="https://res.cloudinary.com/divvzytna/image/upload/v1754855273/freepik__the-style-is-candid-image-photography-with-natural__96532_zsthmo_6c14c8.png"
            alt="Slider_1 Img"
            width={1200}
            height={400}
            layout="responsive"
            priority
            className="m-auto brightness-100"
          />
        </div>

        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a
            href="#slide3"
            className="btn btn-circle hover:size-[42px] hover:bg-amber-200"
          >
            ❮
          </a>
          <a
            href="#slide1"
            className="btn btn-circle hover:size-[42px] hover:bg-amber-200"
          >
            ❯
          </a>
        </div>
      </div>
    </div>
  )
}
