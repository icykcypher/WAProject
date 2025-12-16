import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="bg-white shadow-md py-4">
            <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
                <Link
                    to="/"
                    className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 drop-shadow-lg"
                >
                    E-shop
                </Link>

                <nav className="space-x-6">
                    <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
                        Home
                    </Link>
                    <Link to="/about" className="text-gray-700 hover:text-blue-600 transition">
                        About
                    </Link>
                    <Link to="/cart" className="text-gray-700 hover:text-blue-600 transition">
                        Cart
                    </Link>
                </nav>
            </div>
        </header>
    );
}