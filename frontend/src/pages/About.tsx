import Header from "../components/Header";
import Footer from "../components/Footer";

export default function About() {
    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-extrabold mb-6 text-blue-600">
                        About Us
                    </h1>
                    <p className="text-gray-700 text-lg">
                        Welcome to E-shop! We offer premium 18+ products with the highest quality.  
                        Our mission is to provide a safe, secure, and enjoyable shopping experience.
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
}
