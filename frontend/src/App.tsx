import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SessionProvider } from "./sessions/SessionContext";
import { CartProvider } from "./contexts/CartContext"; 

import Home from "./routes/Home";
import Product from "./routes/Product";
import AuthCallback from "./routes/AuthCallback";
import AuthRedirect from "./routes/AuthRedirect";

import About from "./pages/About";
import Cart from "./pages/Cart";
import Checkout from "./pages/Сheckout";
import Payment from "./pages/Payment";

export default function App() {
    return (
        <SessionProvider>
            <CartProvider> 
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/product/:id" element={<Product />} />
                        <Route path="/auth/callback" element={<AuthCallback />} />
                        <Route path="/auth/redirect" element={<AuthRedirect />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />}></Route>
                        <Route path="/payment" element={<Payment />}></Route>
                    </Routes>
                </BrowserRouter>
            </CartProvider>
        </SessionProvider>
    );
}
