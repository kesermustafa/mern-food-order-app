import React from 'react';
import Image from "next/image";
import Title from "@/src/app/components/Title";
import {FaCartShopping} from "react-icons/fa6";

const Campaigns = () => {
    return (
        <div className={'container mx-auto py-20 flex flex-col gap-10 items-center justify-center '}>

            <div className={"flex max-lg:flex-col gap-10 items-center justify-center"}>

                <div
                    className={'flex  gap-4 bg-gray-800 border-3 border-amber-400 p-4 items-center w-[380px] sm:w-[450px] rounded-lg shadow-lg shadow-gray-400 '}>
                    <div className="relative w-32 h-32  ">
                        <Image
                            src={"/images/f1.png"}
                            alt={"image"}
                            layout={"fill"}
                            className="object-cover"
                        />
                    </div>

                    <div className={"flex flex-col justify-between font-dancing text-white gap-4"}>

                        <Title title={"Pizza Days"} desing={"text-white text-start text-2xl"}/>
                        <h3><span className={'text-3xl'}>15%</span> <span>Off</span></h3>
                        <button
                            className={'px-4 text-gray-800 font-roboto text-sm cursor-pointer py-1 flex gap-2 items-center bg-amber-400 rounded-full'}>
                            <span>Order Now</span>
                            <FaCartShopping/>
                        </button>

                    </div>
                </div>


                <div
                    className={'flex  gap-4 bg-gray-800 border-3 border-amber-400 p-4 items-center w-[380px] sm:w-[450px] rounded-lg shadow-lg shadow-gray-400 '}>
                    <div className="relative w-32 h-32  ">
                        <Image
                            src={"/images/f1.png"}
                            alt={"image"}
                            layout={"fill"}
                            className="object-cover"
                        />
                    </div>

                    <div className={"flex flex-col justify-between font-dancing text-white gap-4"}>

                        <Title title={"Pizza Days"} desing={"text-white text-start text-2xl"}/>
                        <h3><span className={'text-3xl'}>15%</span> <span>Off</span></h3>
                        <button
                            className={'px-4 text-gray-800 font-roboto text-sm cursor-pointer py-1 flex gap-2 items-center bg-amber-400 rounded-full'}>
                            <span>Order Now</span>
                            <FaCartShopping/>
                        </button>

                    </div>
                </div>
            </div>
        </div>

    );
};

export default Campaigns;
