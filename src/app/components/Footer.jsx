import React from 'react';
import {IoCallOutline, IoLocationOutline} from "react-icons/io5";
import {AiOutlineMail} from "react-icons/ai";
import Title from "@/src/app/components/Title";
import {FaSquareInstagram, FaXTwitter} from "react-icons/fa6";
import {FaFacebook} from "react-icons/fa";

const Footer = () => {
    return (
        <div className={'bg-gray-800 w-full mt-20 text-white flex flex-col'}>

            <div
                className={'flex-1 flex flex-col lg:flex-row gap-16 lg:gap-8 flex-wrap justify-between container mx-auto py-8'}>

                <div className={'flex flex-3 items-center flex-col gap-4'}>
                    <Title title="Contact Us" desing={'font-dancing text-3xl'}/>

                    <div className={'flex flex-col gap-3 flex-1'}>

                        <div className={'flex items-center gap-1'}>
                            <IoLocationOutline size={20}/>
                            <span>Location</span>
                        </div>

                        <div className={'flex items-center gap-1'}>
                            <IoCallOutline size={20}/>
                            <span>+90599 667 99 00</span>
                        </div>

                        <div className={'flex items-center gap-1'}>
                            <AiOutlineMail size={20}/>
                            <span>keserfood@gmail.com</span>
                        </div>
                    </div>


                </div>

                <div className={'flex-6  flex flex-col gap-4 '}>
                    <Title title={"KeserFood"} desing={'font-dancing text-3xl'}/>

                    <div className={'flex flex-col gap-6 flex-1'}>
                        <div className={'flex w-full text-center italic items-center justify-center'}>
                            <p>Lezzetin adresi KeserFood – Ev yemeği tadında, her lokmada mutluluk!</p>
                        </div>
                        <div className={'flex w-full justify-center items-center gap-3'}>
                            <div
                                className={'p-1 cursor-pointer bg-gray-200 flex items-center justify-center rounded-full w-8 h-8'}>
                                <FaSquareInstagram className={'text-purple-700'} size={20}/>
                            </div>
                            <div
                                className={'p-1 cursor-pointer bg-gray-200 flex items-center justify-center rounded-full w-8 h-8'}>
                                <FaFacebook className={'text-blue-700'} size={20}/>
                            </div>
                            <div
                                className={'p-1 cursor-pointer bg-gray-200 flex items-center justify-center rounded-full w-8 h-8'}>
                                <FaXTwitter className={'text-gray-700'} size={20}/>
                            </div>


                        </div>
                    </div>


                </div>
                <div className={'flex-3 flex flex-col gap-4  '}>
                    <Title title={"Opening Hours"} desing={'font-dancing text-3xl'}/>

                    <div className={'flex flex-col font-exo text-sm items-center gap-2 flex-1'}>
                        <p>Everyday</p>
                        <p>09.00 - 23.00</p>
                    </div>
                </div>
            </div>


            <div className={'flex items-center justify-center font-exo text-sm italic pb-4 text-gray-300'}>
                <p>&copy; 2025 Mustafa Keser. Tüm hakları saklıdır.</p>
            </div>
        </div>
    );
};

export default Footer;
