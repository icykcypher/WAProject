// src/components/Footer.tsx
export default function Footer() {
    return (
        <footer className="bg-gray-100 py-6 mt-12">
            <div className="max-w-6xl mx-auto px-4 text-center text-gray-600">
                &copy; {new Date().getFullYear()} @icykcypher, @simon9834. E-shop. All rights reserved.
            </div>
        </footer>
    );
}
