import { useParams } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import { useCart } from "../hooks/UseCart";
import { useSession } from "../sessions/SessionContext";
import Header from "../components/Header";

export default function Product() {
    const { id } = useParams();
    const product = PRODUCTS.find(p => p.id === Number(id));
    const { addItem } = useCart();
    const { token } = useSession();
    const userId = token ?? "guest";

    if (!product) return <div>Not found</div>;

    const handleAddToCart = async () => {
        try {
            await fetch(`http://localhost:5000/carts/${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    productId: product.id,
                    quantity: 1,
                }),
            });

            addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                img: product.img,
            });

        } catch (e: any) {
            alert(e.message);
        }
    };

    return (
        <>
            <Header />
            <div className="p-10 max-w-xl mx-auto">
                <h1 className="text-3xl font-semibold mb-4">
                    {product.name}
                </h1>

                <img src={product.img} className="rounded mb-4" />

                <p className="text-xl">{product.price} Kč</p>

                <button
                    className="bg-blue-600 text-white px-4 py-2 mt-6 rounded-md hover:bg-blue-700 transition"
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </button>
            </div>
        </>
    );
}