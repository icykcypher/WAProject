import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/UseCart";
import { useSession } from "../sessions/SessionContext";

export default function Cart() {
    const { items, clearCart } = useCart();
    const { token } = useSession();
    const navigate = useNavigate();

    const handleCheckout = () => {
        if (!token) {
            navigate("/auth/redirect", { state: { returnTo: "/cart" } });
            return;
        }

        alert("Checkout success!");
        clearCart();
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-extrabold mb-6 text-blue-600 text-center">
                    Your Cart
                </h1>

                {items.length === 0 ? (
                    <p className="text-gray-700 text-center">Your cart is empty.</p>
                ) : (
                    <div className="space-y-4">
                        {items.map(item => (
                            <div key={item.id} className="flex items-center bg-white rounded-xl p-4 shadow">
                                <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded mr-4" />
                                <div className="flex-1">
                                    <h2 className="font-semibold text-gray-800">{item.name}</h2>
                                    <p className="text-gray-600">{item.price} Kč x {item.quantity}</p>
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={handleCheckout}
                            className="mt-6 w-full bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 transition"
                        >
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
