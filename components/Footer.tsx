export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              CB Trading
            </h3>
            <p className="text-gray-400 text-sm">
              Empowering traders worldwide with professional signals and
              education.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#home" className="hover:text-purple-400 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-purple-400 transition">
                  About
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="hover:text-purple-400 transition"
                >
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-purple-400 transition">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-purple-400 transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition">
                  Trading Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition">
                  Market Analysis
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-purple-400 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition">
                  Disclaimer
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2025 CB Trading. All rights reserved.</p>
          <p className="mt-2">
            Trading involves risk. Past performance does not guarantee future
            results.
          </p>
        </div>
      </div>
    </footer>
  );
}
