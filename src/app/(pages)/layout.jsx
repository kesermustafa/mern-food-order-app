import React from 'react';
import Navbar from "@/src/app/components/Navbar";

const Layout = ({children, modal}) => {
    return (
        <div>
            <Navbar/>
            {children}
            {modal}
        </div>
    );
};

export default Layout;
