import Carousel from "@/src/app/components/Carousel";
import Campaigns from "@/src/app/components/Campaigns";
import MenuWrapper from "@/src/app/components/products/MenuWrapper";
import About from "@/src/app/components/About";

export default function Home() {
  return (
    <div >
        <Carousel/>

        <Campaigns/>

        <MenuWrapper/>

        <About/>

    </div>
  );
}
