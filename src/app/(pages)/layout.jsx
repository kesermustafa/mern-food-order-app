import React from 'react';
import Navbar from "@/src/app/components/Navbar";
import Footer from "@/src/app/components/Footer";

const Layout = ({children, modal}) => {
    return (
        <div className={'flex flex-col justify-between min-h-screen'}>
            <Navbar/>
            <div className={'flex-1'}>
                {children}
                {modal}
            </div>
            <Footer/>
        </div>
    );
};

export default Layout;
