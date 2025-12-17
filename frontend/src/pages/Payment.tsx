import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useCart } from "../hooks/UseCart";

export default function Payment() {
    const navigate = useNavigate();
    const { items, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            alert("Payment successful!");
            clearCart();
            navigate("/"); 
        }, 1500);
    };

    return (
        <>
            <Header />

            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md mx-auto bg-white rounded-xl shadow p-6">
                    <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
                        Payment
                    </h1>

                    {items.length === 0 ? (
                        <p className="text-gray-700 text-center">Your cart is empty.</p>
                    ) : (
                        <>
                            <div className="mb-6">
                                {items.map(item => (
                                    <div key={item.id} className="flex justify-between mb-2">
                                        <span>{item.name} × {item.quantity}</span>
                                        <span>{item.price * item.quantity} Kč</span>
                                    </div>
                                ))}
                                <div className="flex justify-between font-semibold border-t pt-2">
                                    <span>Total:</span>
                                    <span>{total} Kč</span>
                                </div>
                            </div>

                            <form onSubmit={handlePayment} className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Card Number</label>
                                    <input
                                        type="text"
                                        value={cardNumber}
                                        onChange={e => setCardNumber(e.target.value)}
                                        placeholder="1234 5678 9012 3456"
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        required
                                    />
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <label className="block text-gray-700 font-medium mb-1">Expiry</label>
                                        <input
                                            type="text"
                                            value={expiry}
                                            onChange={e => setExpiry(e.target.value)}
                                            placeholder="MM/YY"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            required
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <label className="block text-gray-700 font-medium mb-1">CVC</label>
                                        <input
                                            type="text"
                                            value={cvc}
                                            onChange={e => setCvc(e.target.value)}
                                            placeholder="123"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full py-3 font-semibold rounded-xl text-white transition ${
                                        loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                                    }`}
                                >
                                    {loading ? "Processing..." : "Pay Now"}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}