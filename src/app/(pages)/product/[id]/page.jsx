import React from 'react';
import Image from "next/image";
import Title from "@/src/app/components/Title";
import {GiKetchup} from "react-icons/gi";
import ExtrasSelector from "@/src/app/components/ExtraSelected";

const ProductDetailPage = async ({params}) => {

    const {id} = await params;

    return (
        <div className={'w-full  min-h-[calc(100vh-80px)]  flex items-center justify-center '}>

            <div className={'container  mx-auto py-10 flex max-lg:gap-10 flex-col lg:flex-row flex-wrap'}>

                <div className={'flex   flex-5 items-center justify-center '}>
                    <div className={' relative  flex w-72 h-72 md:w-96 md:h-96'}>
                        <Image
                            src={'/images/f2.png'}
                            alt={`${id}'li urun image`}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>


                <div className={'flex-7 px-4 flex gap-6 flex-col items-center justify-center'}>

                    <Title title={'Product Details'} desing={'font-dancing font-extrabold text-4xl text-amber-600'}/>

                    <div className={'flex flex-col gap-3'}>
                        <span className={'text-sm font-dancing text-amber-700 font-bold'}>
                            $ <span className={'text-xl font-extrabold'}>10</span>
                        </span>
                        <p className={'font-exo text-gray-700 text-base text-justify leading-relaxed'}>
                            With a focus on fresh ingredients and authentic flavors, we aim to elevate everyday cooking into something extraordinary.
                            Join our growing community and explore the world through food.
                        </p>
                    </div>


                    <div className={'w-full'}>
                        <h2 className={'text-xl font-semibold mb-2'}>Choose the size</h2>
                        <div className={'flex gap-20 w-full items-center justify-start'}>

                            <div className={'relative cursor-pointer hover:scale-105 transition-all'}>
                                <Image
                                    src={"/images/size.png"}
                                    alt={"small pizza"}
                                    width={50}
                                    height={50}

                                />

                                <span className={'absolute top-0 -right-8 font-semibold bg-amber-400 rounded-full text-sm px-2 '}>
                                Small
                            </span>
                            </div>

                            <div className={'relative cursor-pointer hover:scale-105 transition-all'}>
                                <Image
                                    src={"/images/size.png"}
                                    alt={"small pizza"}
                                    width={70}
                                    height={70}

                                />

                                <span className={'absolute top-0 -right-10 font-semibold bg-amber-400 rounded-full text-sm px-2 '}>
                                Medium
                            </span>
                            </div>

                            <div className={'relative cursor-pointer hover:scale-105 transition-all'}>
                                <Image
                                    src={"/images/size.png"}
                                    alt={"small pizza"}
                                    width={100}
                                    height={100}

                                />

                                <span className={'absolute top-0 -right-5 font-semibold bg-amber-400 rounded-full text-sm px-2 '}>
                                Large
                            </span>
                            </div>


                        </div>
                    </div>

{/*                    <div className="w-full space-y-4">
                        <h2 className="text-2xl font-bold text-gray-800">Ek Malzemeler Seçin</h2>

                        <div className="flex flex-wrap gap-4">
                             Checkbox 1
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="ketcap"
                                    className="hidden peer"
                                />
                                <label
                                    htmlFor="ketcap"
                                    className="flex items-center cursor-pointer px-4 py-2 border border-gray-300 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 peer-checked:bg-amber-500 peer-checked:text-white transition-colors duration-200"
                                >
                                    <span className="mr-2">🍅</span>
                                    Ketçap
                                </label>
                            </div>

                             Checkbox 2
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="mayonez"
                                    className="hidden peer"
                                />
                                <label
                                    htmlFor="mayonez"
                                    className="flex items-center cursor-pointer px-4 py-2 border border-gray-300 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 peer-checked:bg-amber-500 peer-checked:text-white transition-colors duration-200"
                                >
                                    <span className="mr-2">🥄</span>
                                    Mayonez
                                </label>
                            </div>

                             Checkbox 3
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="sos"
                                    className="hidden peer"
                                />
                                <label
                                    htmlFor="sos"
                                    className="flex items-center cursor-pointer px-4 py-2 border border-gray-300 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 peer-checked:bg-amber-500 peer-checked:text-white transition-colors duration-200"
                                >
                                    <span className="mr-2 text-red-500"><GiKetchup size={24}  /></span>
                                    Acı Sos
                                </label>
                            </div>
                        </div>
                    </div>*/}

                    <ExtrasSelector/>



                </div>

            </div>



        </div>
    );
};

export default ProductDetailPage;
