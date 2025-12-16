import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../data/products";

export default function Home() {
    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {PRODUCTS.map((p) => (
                            <div
                                key={p.id}
                                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-6 flex flex-col items-center"
                            >
                                <img
                                    src={p.img}
                                    alt={p.name}
                                    className="w-full h-64 object-cover rounded-xl mb-6 hover:scale-105 transition-transform"
                                />
                                <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
                                    {p.name}
                                </h2>
                                <p className="text-lg font-medium text-gray-600 mb-4">{p.price} Kč</p>

                                <Link
                                    to={`/product/${p.id}`}
                                    className="mt-auto w-full text-center bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 text-white font-semibold px-4 py-2 rounded-xl transition-colors"
                                >
                                    View
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}