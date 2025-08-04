import React from 'react';
import MenuWrapper from "@/src/app/components/products/MenuWrapper";
import {auth} from "@/src/auth";

const MenuPage = async () => {
    const session = await auth();
    const token = session?.user?.token;

    return (
        <div className={'pt-20'}>
            <MenuWrapper/>
        </div>
    );
};

export default MenuPage;
