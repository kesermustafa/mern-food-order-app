"use client";

import {useSession} from "next-auth/react";
import {useEffect} from "react";
import {encryptStorage} from "@/src/app/utils/encryptStorage";

export default function SessionSync() {
    const {data: session, status} = useSession();

    useEffect(() => {
        if (status === "authenticated" && session?.user?.token && encryptStorage) {
            encryptStorage.setItem("token", session.user.token);
        }
    }, [session, status]);

    return null;
}
