import Image from "next/image";
import Title from "@/src/app/components/Title";
import Link from "next/link";

const products = [
    {
        id: 1,
        name: "Pizza",
        extras: 'Cheese, Tomato',
        price: 10,
        quantity: 2,
        image: '/images/f1.png',
    },
    {
        id: 2,
        name: "Burger",
        extras: 'Onion, Lettuce',
        price: 12,
        quantity: 1,
        image: '/images/about-img.png',
    },
    {
        id: 3,
        name: "Pizza 2",
        extras: 'Ketchup, Mayo',
        price: 9,
        quantity: 3,
        image: '/images/f1.png',
    },
    {
        id: 4,
        name: "Turkish Kebap",
        extras: 'Acili, Salata',
        price: 19,
        quantity: 1,
        image: '/images/f1.png',
    }
];

export default function OrderCartPage() {

    const subtotal = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    const discountPercent = 10;
    const discountAmount = subtotal * (discountPercent / 100);
    const total = subtotal - discountAmount;

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-312px)]">

            <Title title="Your Order Cart" desing={'text-4xl text-amber-600 py-4 lg:py-0 font-semibold'}/>

            <div className="w-full h-full md:flex md:gap-4 p-2 rounded-xl">
                {/* Mobile Stack Layout (hidden on md and above) */}
                <div className="md:hidden space-y-4">
                    {products.map((product, index) => (
                        <div
                            key={product.id}
                            className={`p-4 rounded-lg font-exo ${
                                index % 2 === 0 ? 'bg-gray-400' : 'bg-gray-200'
                            }`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-lg font-semibold">#{index + 1}</span>
                                <div className={'flex items-center gap-2'}>
                                    <span className={'font-semibold text-lg'}>{product.name}</span>
                                    <div className={'relative w-12 h-12'}>
                                        <Image src={product.image} alt="food image" fill
                                               sizes={"(max-width: 768px) 100vw, 200px"}
                                               style={{objectFit: "cover"}}/>
                                    </div>

                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-700">Extras</span>
                                    <span>{product.extras}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-700">Price</span>
                                    <span>
                                        <span className="text-sm">$</span>
                                        <span className="font-semibold">{product.price}</span>
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-700">Quantity</span>
                                    <span className="font-semibold">{product.quantity}</span>
                                </div>

                                <div className="flex items-center border-b justify-between border-dashed border-t py-2">
                                    <span className="font-medium text-gray-700">Total</span>
                                    <span className="font-bold text-lg">
                                        <span className="text-sm">$</span>
                                        <span>{product.quantity * product.price}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


                <div className={'flex flex-col lg:flex-row gap-10 lg:gap-4 w-full p-10 '}>
                    <div className="hidden md:flex-1 md:block overflow-x-auto">
                        <table className="w-full text-left font-exo">
                            <thead>
                            <tr className="bg-gray-700 text-md text-gray-200 h-12">
                                <th className="w-16 text-center">#</th>
                                <th>PRODUCT</th>
                                <th>EXTRAS</th>
                                <th className="text-center w-28">PRICE</th>
                                <th className="w-28 text-center">QUANTITY</th>
                                <th className="w-28 text-center text-nowrap">TOTAL PRICE</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.map((product, index) => (
                                <tr
                                    key={product.id}
                                    className={`h-12 ${index % 2 === 0 ? 'bg-gray-400' : 'bg-gray-200'}`}
                                >
                                    <td className="w-12 text-center">{index + 1}</td>
                                    <td className={'flex items-center gap-2 py-1'}>
                                        <div className={'flex relative w-12 h-12 items-center gap-2'}>
                                            <Image src={product.image} alt="food image" fill
                                                   sizes={"(max-width: 768px) 100vw, 200px"}
                                                   style={{objectFit: "cover"}}/>

                                        </div>
                                        <span className={'font-semibold'}>{product.name}</span>
                                    </td>
                                    <td>{product.extras}</td>
                                    <td className="text-center">
                                        <span className="text-sm">$</span>
                                        <span className="font-semibold">{product.price}</span>
                                    </td>
                                    <td className="text-center">{product.quantity}</td>
                                    <td className="max-w-16 text-center">
                                        <span className="text-sm">$</span>
                                        <span className="font-semibold">
                                            {product.quantity * product.price}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Order Total Section */}
                    <div className="mt-8 md:mt-0  w-full max-w-md lg:max-w-xs mx-auto">
                        <Title title={'Order Total'} desing={"text-4xl mb-4 text-amber-600"}/>

                        <div className="bg-gray-100 p-6 rounded-lg space-y-4 font-exo">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700">Subtotal</span>
                                <span className="font-semibold">
                                <span className="text-sm">$</span>
                                <span>{subtotal.toFixed(2)}</span>
                            </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-gray-700">Discount</span>
                                <span className="text-red-600 font-semibold">
                                -{discountPercent}% ($<span>{discountAmount.toFixed(2)}</span>)
                            </span>
                            </div>

                            <div className="border-t pt-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-xl font-bold text-gray-800">Total</span>
                                    <span className="text-xl font-bold text-green-600">
                                    <span className="text-sm">$</span>
                                    <span>{total.toFixed(2)}</span>
                                </span>
                                </div>
                            </div>
                        </div>

                        <div className={'flex items-center justify-center w-full mx-auto'}>
                            <Link href={`/orders`}
                                  className={'bg-amber-400 px-6 py-2 rounded-full font-exo font-semibold text-sm cursor-pointer hover:bg-amber-500 transition-all duration-300'}


                            >Checkout Now
                            </Link>
                        </div>
                    </div>
                </div>


            </div>

        </div>
    );
}