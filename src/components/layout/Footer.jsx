import { Link } from 'react-router-dom';
import { content } from '../../data/brands';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold tracking-tight mb-4">CRYO</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Design that freezes the moment.<br />
              Brand identity from scratch to overhaul.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider mb-4 text-gray-500">
              Portfolio
            </h4>
            <nav className="flex flex-col gap-2">
              <Link to="/portfolio/logos" className="text-gray-300 hover:text-white transition-colors text-sm">
                Logos
              </Link>
              <Link to="/portfolio/packaging" className="text-gray-300 hover:text-white transition-colors text-sm">
                Packaging
              </Link>
              <Link to="/portfolio/illustration" className="text-gray-300 hover:text-white transition-colors text-sm">
                Illustration
              </Link>
              <Link to="/portfolio/corporate" className="text-gray-300 hover:text-white transition-colors text-sm">
                Corporate
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider mb-4 text-gray-500">
              Contact
            </h4>
            <div className="flex flex-col gap-2 text-sm">
              <a href="mailto:hello@cryodesign.com" className="text-gray-300 hover:text-white transition-colors">
                hello@cryodesign.com
              </a>
              <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                Get a Quote
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <p className="text-gray-500 text-sm">
            {content.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
