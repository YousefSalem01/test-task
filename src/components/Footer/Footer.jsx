export function Footer() {
  return (
    <footer className="bg-white py-12 border-t">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue">armin</span> 
              <span className="text-xl font-bold bg-gradient-to-r from-blue to-blue bg-clip-text text-transparent">
                cx
              </span>
            </div>
            <p className="mt-4 text-gray">
              The E-Commerce Customer Support Suite with WhatsApp, Email, Phone and Social Media in one ticketing tool.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-black mb-4">Channels</h3> 
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray hover:text-blue"> 
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="#" className="text-gray hover:text-blue">
                  Email
                </a>
              </li>
              <li>
                <a href="#" className="text-gray hover:text-blue">
                  Phone
                </a>
              </li>
              <li>
                <a href="#" className="text-gray hover:text-blue">
                  Social Media
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-black mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray hover:text-blue">
                  Book a Demo
                </a>
              </li>
              <li>
                <a href="#" className="text-gray hover:text-blue">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-gray hover:text-blue">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray hover:text-blue">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-black mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray hover:text-blue">
                  Imprint
                </a>
              </li>
              <li>
                <a href="#" className="text-gray hover:text-blue">
                  Data Processing Agreement
                </a>
              </li>
              <li>
                <a href="#" className="text-gray hover:text-blue">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray hover:text-blue">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-4">
          <p className="text-center text-gray">© {new Date().getFullYear()} armin.cx. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
