import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0d2343] text-white pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Language & Currency */}
        <div className="flex items-center">
          <h1 className="text-4xl text-white font-bold">Batoi Bhai</h1>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-sm font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>About Us</li>
            <li>Blog</li>
            <li>Press Room</li>
            <li>Careers</li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h4 className="text-sm font-semibold mb-3">Help</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Contact us</li>
            <li>FAQs</li>
            <li>Terms and conditions</li>
            <li>Privacy policy</li>
            <li>Sitemap</li>
          </ul>
        </div>

        {/* Payment + Become a Guide */}
        <div>
          <h4 className="text-sm font-semibold mb-3">
            Payment methods possible
          </h4>
          <div className="flex flex-wrap gap-2 mb-4">
            {/* Replace with real image assets */}
            <img src="/payments/mastercard.png" alt="mastercard" className="h-10 bg-white p-1 rounded" />
          </div>

          <h4 className="text-sm font-semibold mb-1">Company</h4>
          <p className="text-sm text-gray-300">Become a Tour guide for Us</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-6 mt-10 flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-6">
        <p className="text-sm text-gray-400">
          Copyright 2021 Tour Guide. All Rights Reserved
        </p>

        <div className="flex gap-4 mt-4 md:mt-0">
          <div className="p-2 bg-[#1c3358] rounded-full cursor-pointer">
            <FaFacebookF />
          </div>
          <div className="p-2 bg-[#1c3358] rounded-full cursor-pointer">
            <FaTwitter />
          </div>
          <div className="p-2 bg-[#1c3358] rounded-full cursor-pointer">
            <FaInstagram />
          </div>
          <div className="p-2 bg-[#1c3358] rounded-full cursor-pointer">
            <FaPinterestP />
          </div>
        </div>
      </div>
    </footer>
  );
}
