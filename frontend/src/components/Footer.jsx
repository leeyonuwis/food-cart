// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left - Brand */}
        <p className="text-gray-600 font-medium">
          © {new Date().getFullYear()} Food Kart. All rights reserved.
        </p>

        {/* Right - Links */}
        <div className="flex gap-6 text-gray-600">
          <a href="#" className="hover:text-green-600">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-green-600">
            Terms of Service
          </a>
          <a href="#" className="hover:text-green-600">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}