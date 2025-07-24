// src/app/not-found.jsx
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800">
            <h1 className="text-5xl font-bold mb-4">404 - Sayfa Bulunamadı</h1>
            <p className="text-lg mb-6">Aradığınız sayfa mevcut değil veya taşınmış olabilir.</p>
            <Link
                href="/"
                className="px-6 py-3 bg-amber-500 text-white rounded hover:bg-amber-600 transition"
            >
                Anasayfaya Dön
            </Link>
        </div>
    );
}
