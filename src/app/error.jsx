'use client';

import {useEffect} from 'react';

export default function Error({error, reset}) {
    useEffect(() => {
        console.error('Layout seviyesinde hata:', error);
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center space-y-4">
            <h2 className="text-2xl text-red-600 font-semibold">Bir hata oluştu</h2>
            <p>{error.message}</p>
            <button
                onClick={() => reset()}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Yeniden Dene
            </button>
        </div>
    );
}
