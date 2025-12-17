import { useState } from "react";

export default function AuthRedirect() {
    const returnTo = "/checkout";
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setLoading(true);

        const callbackUrl = new URL("http://localhost:5173/auth/callback");
        callbackUrl.searchParams.set("returnTo", returnTo);

        const authorizeUrl = new URL("http://localhost:5551/authorize");
        authorizeUrl.searchParams.set("return", callbackUrl.toString());
        authorizeUrl.searchParams.set("permission", "age");

        window.location.href = authorizeUrl.toString();
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-8 drop-shadow-lg">
                Eshop
            </h2>

            <button
                onClick={handleClick}
                disabled={loading}
                className="flex items-center justify-center gap-3 w-full max-w-sm px-6 py-3 bg-white border border-gray-300 rounded-md shadow hover:shadow-md transition disabled:opacity-50"
            >
                <img 
                    src="/north_auth.png" 
                    alt="NorthAuth Logo" 
                    className="w-6 h-6"
                />
                <span className="text-gray-700 font-medium">
                    {loading ? "Redirecting..." : "Sign in with NorthAuth"}
                </span>
            </button>
        </div>
    );
}
