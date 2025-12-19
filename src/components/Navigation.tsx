import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Activity, TrendingUp, Brain, Menu, X } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home', icon: BarChart3 },
    { path: '/crisis-monitor', label: 'Crisis Monitor', icon: Activity },
    { path: '/global-rankings', label: 'Global Rankings', icon: TrendingUp },
    { path: '/policy-impact-engine', label: 'Policy Impact Engine', icon: Brain },
  ];

  // Check if we're on landing page and at top (hero section)
  const isLandingPage = location.pathname === '/';
  const isHeroSection = isLandingPage && !isScrolled;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isHeroSection 
        ? 'bg-black/20 backdrop-blur-md' 
        : 'bg-white/95 backdrop-blur-md shadow-elegant border-b border-neutral-200'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <BarChart3 className={`h-10 w-10 transition-all duration-300 group-hover:scale-110 ${
                isHeroSection ? 'text-white' : 'text-black'
              }`} />
            </div>
            <div>
              <span className={`text-2xl font-bold transition-colors duration-300 ${
                isHeroSection ? 'text-white' : 'text-black'
              }`}>
                Invisible Labor Index
              </span>
              <div className={`text-xs font-medium transition-colors duration-300 ${
                isHeroSection ? 'text-white/80' : 'text-neutral-600'
              }`}>
                Real-time policy tracker
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                  location.pathname === path
                    ? isHeroSection 
                      ? 'bg-white text-black shadow-elegant'
                      : 'bg-black text-white shadow-elegant'
                    : isHeroSection
                      ? 'text-white hover:text-black hover:bg-white/90'
                      : 'text-black hover:text-white hover:bg-black/80'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-xl transition-all duration-300 ${
              isHeroSection 
                ? 'text-white hover:text-black hover:bg-white/90'
                : 'text-black hover:text-white hover:bg-black/80'
            }`}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-4 right-4 bg-white/95 backdrop-blur-md border border-neutral-200 p-6 rounded-xl animate-scale-in">
            <div className="space-y-3">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                    location.pathname === path
                      ? 'bg-black text-white shadow-elegant'
                      : 'text-black hover:text-white hover:bg-black/80'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
