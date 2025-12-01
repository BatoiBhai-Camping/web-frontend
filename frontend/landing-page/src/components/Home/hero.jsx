import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import Autoplay from "embla-carousel-autoplay"
import Header from "../Header/header"
import Search from "./search"

export default function Hero() {
   const autoplay = Autoplay({
    delay: 2000,
    stopOnInteraction: false,
    stopOnMouseEnter: false,
  })

  const imgs = [
    "https://admin.stayatpurijagannatha.in/images/frontend/main-slider-1_1670308972.jpg",
    "https://tse4.mm.bing.net/th/id/OIP.rXfS0OtkoEm5FQuXgGMt-wHaFj?rs=1&pid=ImgDetMain&o=7&rm=3",
    "https://foodntravelstories.com/wp-content/uploads/2024/01/1-1.jpg"
  ]

  return (
    <section className="w-screen overflow-hidden h-[40vh] md:h-[60vh] lg:h-[80vh] flex justify-center items-center ">
      <Carousel
        className="w-full"
        plugins={[autoplay]}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          <CarouselItem>
            <div style={{background:`url(${imgs[0]})`, backgroundRepeat:'no-repeat', backgroundSize:'cover', backgroundPosition:'top'}} className="w-full h-[80vh] bg-blue-600 flex items-center justify-center text-white text-4xl">
            </div>
          </CarouselItem>

          <CarouselItem>
            <div style={{background:`url(${imgs[1]})`, backgroundRepeat:'no-repeat', backgroundSize:'cover', backgroundPosition:'top'}} className="w-full h-[80vh] bg-fuchsia-500 flex items-center justify-center text-white text-4xl">
            </div>
          </CarouselItem>

          <CarouselItem>
            <div style={{background:`url(${imgs[2]})`, backgroundRepeat:'no-repeat', backgroundSize:'cover', backgroundPosition:'top'}} className="w-full h-[80vh] bg-emerald-500 flex items-center justify-center text-white text-4xl">
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
      <div className="absolute w-screen h-[40vh] md:h-[60vh] lg:h-[80vh] flex flex-col gap-2 justify-center items-center bg-[#00000091]">
        <h1 className=" px-5 text-center text-white text-2xl md:text-4xl font-bold text-shadow-sm text-shadow-[#0000006e]">We Find The Best Tours For You</h1>
        <p className="text-white text-md md:text-lg text-center px-5 lg:w-[60%]">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
      </div>
    </section>
  )
}
