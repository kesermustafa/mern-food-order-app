import React from 'react';
import Image from "next/image";
import Title from "@/src/app/components/Title";
import Link from "next/link";

const About = () => {
    return (
        <div className={"bg-gray-800"}>


        <div className={' container mx-auto   w-full h-[600px] flex flex-col-reverse py-10 sm:p-0 sm:flex-row'}>

            <div className={"flex   flex-1 sm:flex-row sm:flex-4 items-center justify-center overflow-hidden"}>
               <div className={"relative w-full h-full sm:h-4/5 flex items-center justify-center"}>
                   <Image
                       src={"/images/about-image.png"}
                       alt={"abotu image"}
                       fill
                       sizes="(max-width: 768px) 100vw, 50vw"
                       className="object-contain max-sm:hidden "

                   />

                   <Image
                       src={"/images/f1.png"}
                       alt={"abotu image"}
                       fill
                       sizes="(max-width: 768px) 100vw, 50vw"
                       className="object-contain sm:hidden "

                   />
               </div>
            </div>

            <div className={"flex-1 sm:flex-8 flex flex-col   text-white justify-center "}>

                <div className={"flex flex-col gap-4 p-4 sm:p-0 sm:w-4/5"}>
                    <Title title={"We are KeserFood's"} desing={"text-4xl text-amber-500"}/>
                    <p className={'font-exo text-gray-100 text-justify leading-relaxed '}>
                        At KeserFood's, we blend tradition and innovation to bring you a curated selection of recipes, cooking tips, and food stories.
                        Our mission is to make great food accessible to everyone, whether you’re a beginner in the kitchen or a seasoned chef.
                        With a focus on fresh ingredients and authentic flavors, we aim to elevate everyday cooking into something extraordinary.
                        Join our growing community and explore the world through food.

                    </p>
                    <Link href={"/about"} className={'flex '}>
                        <button className={'rounded-2xl bg-amber-400 px-6 py-2 cursor-pointer hover:bg-amber-500 transition-all'}>
                            Read More
                        </button>
                    </Link>

                </div>

            </div>
        </div>

        </div>
    );
};

export default About;
