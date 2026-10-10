import React from 'react';
import { useNavigation } from '../context/NavigationContext';

export const SiteFooter: React.FC = () => {
  const { navigate, currentPage } = useNavigation();
  const isGradientPage =
    currentPage === 'about' ||
    currentPage === 'home' ||
    currentPage === 'projects' ||
    currentPage === 'privacy-policy' ||
    currentPage === 'terms';

  return (
    <div
      className="w-full mt-auto bg-white"
      style={{
        background: '#ffffff',
      }}
    >
      <footer
        className="w-full text-[#111111] pt-16 pb-12 px-6 sm:px-12 md:px-20 selection:bg-black selection:text-white border-t border-black/10 shadow-sm bg-white"
        style={{
          background: '#ffffff',
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-black/15">
            {/* Col 1: Brand */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full aspect-square bg-black flex items-center justify-center text-white shadow-sm shrink-0">
                  <svg viewBox="0 0 520 420" fill="none" className="w-4 h-4 text-white">
                    <rect x="0" y="0" width="360" height="130" fill="currentColor" />
                    <rect x="110" y="130" width="140" height="280" fill="currentColor" />
                    <circle cx="445" cy="345" r="65" fill="currentColor" />
                  </svg>
                </div>
                <span
                  className="text-2xl font-normal text-[#111111] font-peace-sans"
                  style={{ fontFamily: "'Peace Sans', sans-serif", letterSpacing: '-0.085em' }}
                >
                  Typeface
                </span>
              </div>
              <p className="text-sm text-black/75 leading-relaxed font-normal max-w-sm">
                Developer house building high-performance websites, web applications, and digital experiences for ambitious businesses.
              </p>
              <div className="text-xs text-black/80 font-mono font-medium">
                Geneva · London · New York · Singapore
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div className="md:col-span-3 space-y-3">
              <h5 className="text-xs uppercase tracking-widest text-black font-bold">Navigation</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => navigate('home')}
                    className={`hover:text-black/60 transition-colors cursor-pointer ${
                      currentPage === 'home' ? 'text-black font-bold underline' : 'text-black/80'
                    }`}
                  >
                    Home / Overview
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('about')}
                    className={`hover:text-black/60 transition-colors cursor-pointer ${
                      currentPage === 'about' ? 'text-black font-bold underline' : 'text-black/80'
                    }`}
                  >
                    About & Capabilities
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('projects')}
                    className={`hover:text-black/60 transition-colors cursor-pointer ${
                      currentPage === 'projects' ? 'text-black font-bold underline' : 'text-black/80'
                    }`}
                  >
                    Client Work & Case Studies
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('services')}
                    className={`hover:text-black/60 transition-colors cursor-pointer ${
                      currentPage === 'services' ? 'text-black font-bold underline' : 'text-black/80'
                    }`}
                  >
                    Services & Pricing
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Practices */}
            <div className="md:col-span-4 space-y-3">
              <h5 className="text-xs uppercase tracking-widest text-black font-bold">Core Capabilities</h5>
              <ul className="space-y-2 text-sm text-black/80">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black" />
                  <span>Web & Responsive Full-Stack Development</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black" />
                  <span>Shopify Custom Storefronts & Ecommerce</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black" />
                  <span>Short-form Video Production & Motion</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black" />
                  <span>LinkedIn Personal Branding & Strategy</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black" />
                  <span>Email Marketing & Lifecycle Sequences</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-black/70">
            <p>© {new Date().getFullYear()} Typeface. All rights reserved.</p>
            <div className="flex items-center gap-4 sm:gap-6 font-medium">
              <button
                onClick={() => navigate('privacy-policy')}
                className="hover:text-black transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <span>·</span>
              <button
                onClick={() => navigate('terms')}
                className="hover:text-black transition-colors cursor-pointer"
              >
                Terms &amp; Conditions
              </button>
              <span>·</span>
              <span className="hover:text-black transition-colors">Governance &amp; Standards</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
