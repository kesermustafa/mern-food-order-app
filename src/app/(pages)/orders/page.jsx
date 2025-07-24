import Image from "next/image";
import Title from "@/src/app/components/Title";

const order = [
    {
        orderId: 1,
        customerName: "Jhon Duo",
        address: 'london UK',
        totalPrice: 10,
    }
];

const images = [
    {id: 1, image: "/images/paid.png", name: "Payment", status: false},
    {id: 2, image: "/images/bake.png", name: "Preparing", status: true},
    {id: 3, image: "/images/bike.png", name: "On the way", status: false},
    {id: 4, image: "/images/delivered.png", name: "Delivered", status: false},
];

export default function OrdersPage() {

    const totalPrice = 10;

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-312px)]">

            <Title title="Your Orders" desing={'text-4xl text-amber-600 py-4 lg:py-0 font-semibold'}/>

            <div className="w-full h-full md:flex md:gap-4 p-2 rounded-xl">
                {/* Mobile Stack Layout (hidden on md and above) */}
                <div className="md:hidden ">
                    {order.map((order, index) => (
                        <div
                            key={order.orderId}
                            className={`overflow-hidden rounded-lg font-exo ${
                                index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-300'
                            }`}
                        >
                            <div className="flex items-center p-2 bg-gray-500 ">
                                <span className="text-lg font-semibold">#{index + 1}</span>
                            </div>

                            <div className="space-y-2 p-2">
                                <div className={'flex items-center justify-between gap-2'}>
                                    <span className="font-medium text-gray-700">Customer</span>
                                    <span className={'font-semibold text-lg'}>{order.customerName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-700">Address</span>
                                    <span>{order.address}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-700">Total Price</span>
                                    <span>
                                        <span className="text-sm">$</span>
                                        <span className="font-semibold">{order.totalPrice}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={'hidden md:flex flex-col lg:flex-row gap-10 lg:gap-4 w-full p-10 '}>
                    <div className="hidden md:flex-1 md:block overflow-x-auto">
                        <table className="w-full text-left font-exo">
                            <thead>
                            <tr className="bg-gray-700 text-md text-gray-200 h-12">
                                <th className='w-32 text-center'>ORDER ID</th>
                                <th>CUSTOMER NAME</th>
                                <th className="">ADDRESS</th>
                                <th className="w-32 text-center text-nowrap">TOTAL PRICE</th>
                            </tr>
                            </thead>
                            <tbody>
                            {order.map((order, index) => (
                                <tr
                                    key={order.orderId}
                                    className={`h-12 hover:bg-gray-300 ${index % 2 === 0 ? 'bg-gray-400' : 'bg-gray-200'}`}
                                >
                                    <td className="w-32 text-center">{index + 1}</td>
                                    <td className={'w-72'}>
                                        {order.customerName}
                                    </td>
                                    <td>{order.address}</td>
                                    <td className="text-end pr-4">
                                        <span className="text-sm">$</span>
                                        <span className="font-semibold text-end">{order.totalPrice}</span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="w-full px-2 mb-4 md:px-12">
                <div className="flex flex-wrap justify-between rounded-md bg-amber-400 px-4 py-6 gap-6">
                    {images.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-between gap-1"
                        >
                            <div
                                className={`relative w-12 h-12 ${
                                    item.status ? "animate-pulse" : ""
                                }`}
                            >
                                <Image
                                    src={item.image}
                                    alt={`Image ${index + 1}`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 60px"
                                    style={{objectFit: "cover"}}
                                />
                            </div>
                            <span className={`${item.status && "text-green-700 font-semibold"}`}>{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>


        </div>
    );
}

