import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../hooks/UseCart";
import { useCountry } from "../utils/country";
import Header from "../components/Header";

interface CartItemWithPermission {
    id: number;
    name: string;
    price: number;
    img: string;
    quantity: number;
    allowed?: boolean;
    requiredAge?: number;
    userAge?: number;
}

interface CanPurchaseResponse {
    allowed: boolean;
    requiredAge: number;
    userAge: number;
    category: string;
    countryCode: string;
}

export default function Checkout() {
    const { items } = useCart();
    const navigate = useNavigate();
    const country = useCountry();

    const [cartWithPermissions, setCartWithPermissions] = useState<CartItemWithPermission[]>([]);
    const [loading, setLoading] = useState(false);
    const [params] = useSearchParams();
    console.log(params)
    useEffect(() => {
        if (items.length === 0) {
            setCartWithPermissions([]);
            return;
        }
        
        const fetchPermissions = async () => {
            setLoading(true);
            try {
                // Получаем capability токен (JWT уже в cookie)
                // const resToken = await fetch("http://10.2.7.166:8081/api/token", {
                //     method: "POST",
                //     headers: { "Content-Type": "application/json" },
                //     credentials: "include", // важно!
                //     body: JSON.stringify({
                //         address: "http://10.2.7.167:8080",
                //         permissions: ["age"],
                //     }),
                // });

                // if (!resToken.ok) throw new Error("Not authenticated");

                // const tokenData = await resToken.json();
                const capabilityToken = params.get("token");

                // Проверяем каждый товар
                const updatedItems = await Promise.all(
                    items.map(async item => {
                        try {
                            const res = await fetch("http://10.2.7.166:8081/api/can-purchase", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": `Bearer ${capabilityToken}`,
                                },
                                credentials: "include", // чтобы cookie шли на сервер
                                body: JSON.stringify({
                                    category: "tobacco", // или "alcohol" в зависимости от item
                                    country,
                                }),
                            });

                            if (!res.ok) throw new Error("Failed to check permission");

                            const data: CanPurchaseResponse = await res.json();
                            return {
                                ...item,
                                allowed: data.allowed,
                                requiredAge: data.requiredAge,
                                userAge: data.userAge,
                            };
                        } catch {
                            return { ...item, allowed: false };
                        }
                    })
                );

                setCartWithPermissions(updatedItems);
            } catch (err) {
                console.error("Error fetching capability token or permissions:", err);
                setCartWithPermissions(items.map(item => ({ ...item, allowed: false })));
            } finally {
                setLoading(false);
            }
        };

        fetchPermissions();
    }, [items, country]);

    const handleCheckout = () => {
        const canBuyAll = cartWithPermissions.every(item => item.allowed);
        if (!canBuyAll) {
            return;
        }

        navigate("/payment"); 
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-extrabold mb-6 text-blue-600 text-center">
                        Your Cart
                    </h1>

                    {loading ? (
                        <p className="text-gray-700 text-center">Checking permissions…</p>
                    ) : cartWithPermissions.length === 0 ? (
                        <p className="text-gray-700 text-center">Your cart is empty.</p>
                    ) : (
                        <div className="space-y-4">
                            {cartWithPermissions.map(item => (
                                <div key={item.id} className="flex items-center bg-white rounded-xl p-4 shadow">
                                    <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded mr-4" />
                                    <div className="flex-1">
                                        <h2 className="font-semibold text-gray-800">{item.name}</h2>
                                        <p className="text-gray-600">{item.price} Kč × {item.quantity}</p>
                                        {item.allowed !== undefined && (
                                            <p className={`font-medium mt-1 ${item.allowed ? "text-green-600" : "text-red-600"}`}>
                                                {item.allowed
                                                    ? `Allowed to buy (age ${item.userAge} ≥ ${item.requiredAge})`
                                                    : `Not allowed (age ${item.userAge ?? "?"} < ${item.requiredAge ?? "?"})`}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}

                            <button
                                onClick={handleCheckout}
                                disabled={cartWithPermissions.some(item => item.allowed === false)}
                                className={`mt-6 w-full font-semibold py-3 rounded-xl transition ${
                                    cartWithPermissions.some(item => item.allowed === false)
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-green-600 text-white hover:bg-green-700"
                                }`}
                            >
                                Checkout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
