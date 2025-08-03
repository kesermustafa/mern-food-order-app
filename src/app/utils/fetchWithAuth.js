import {getSession} from "next-auth/react";
import {encryptStorage} from "@/src/app/utils/encryptStorage";

export const fetchWithAuth = async (url, options = {}) => {
    let token;

    // Öncelikle encryptStorage varsa oradan al
    if (typeof window !== "undefined" && encryptStorage) {
        token = encryptStorage.getItem("token");
    }

    // Eğer localStorage'dan token yoksa, fallback olarak NextAuth session'dan al
    if (!token) {
        const session = await getSession();
        token = session?.user?.token;
    }

    if (!token) throw new Error("Oturum bulunamadı, lütfen giriş yapın.");

    const res = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        let errorMessage = `HTTP error! status: ${res.status}`;
        try {
            const data = await res.json();
            errorMessage = data.message || JSON.stringify(data);
        } catch (_) {
        }
        throw new Error(errorMessage);
    }

    return res.json();
};
