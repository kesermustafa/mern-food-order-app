import Carousel from "@/src/app/components/Carousel";
import Campaigns from "@/src/app/components/Campaigns";
import MenuWrapper from "@/src/app/components/products/MenuWrapper";
import About from "@/src/app/components/About";
import Input from "@/src/app/components/form/Input";
import Reservations from "@/src/app/components/Reservations";

export default function Home() {
  return (
    <div >
        <Carousel/>

        <Campaigns/>

        <MenuWrapper/>

        <About/>

        <Reservations/>

        <div className={'h-[200px]'}></div>

    </div>
  );
}
