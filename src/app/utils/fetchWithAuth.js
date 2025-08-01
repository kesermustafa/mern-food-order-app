import {getSession} from "next-auth/react";

export const fetchWithAuth = async (url, options = {}) => {
    const session = await getSession();
    const token = session?.user?.token;

    const res = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    return res.json();
};
