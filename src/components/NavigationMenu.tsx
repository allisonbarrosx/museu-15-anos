import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Gamepad2, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NavigationMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    {
      name: "Início",
      path: "/",
      sub: "Voltar ao lobby",
      icon: <Gamepad2 size={20} />,
    },
    {
      name: "Configurações",
      path: "/settings",
      sub: "Ajustes de sistema",
      icon: <Settings size={20} />,
    },
  ];

  // 1. Scroll Visibility Logic (Hide menu when scrolling down)
  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Scroll Lock Logic (Prevent root scroll when menu is open)
  useEffect(() => {
    const root = document.getElementById("root") || document.body;
    if (isOpen) {
      root.style.overflow = "hidden";
      root.style.height = "100vh"; // Force viewport height
    } else {
      root.style.overflow = "unset";
      root.style.height = "auto";
    }
    return () => {
      root.style.overflow = "unset";
      root.style.height = "auto";
    };
  }, [isOpen]);

  return (
    <>
      {/* Header Bar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 p-4 flex justify-between items-center bg-[#0a0a14]/80 backdrop-blur-md border-b border-purple-900/30 transition-all duration-500 ease-in-out ${
          isAtTop
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="text-white font-bold tracking-widest text-xl uppercase">
          <Link to="/">
            Museu do <span className="text-purple-500">Videogame</span>
          </Link>
        </div>

        <button
          onClick={toggleMenu}
          className="text-white hover:text-purple-400 transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </nav>

      {/* Full Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-[#06060e] flex flex-col justify-center items-center p-6"
          >
            {/* Background Glow Effect */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full" />

            <div className="w-full max-w-2xl space-y-4">
              <p className="text-gray-400 text-center uppercase tracking-[0.2em] text-sm mb-8">
                Navegação do Sistema
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    onClick={toggleMenu}
                    className="group relative overflow-hidden rounded-xl bg-[#1a1a2e]/50 border border-white/10 p-6 transition-all hover:bg-white/5 hover:border-purple-500/50"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-purple-900/30 rounded-lg text-purple-400 group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <div>
                        <h2 className="text-white font-bold text-xl uppercase tracking-wider group-hover:text-purple-400 transition-colors">
                          {item.name}
                        </h2>
                        <p className="text-gray-500 text-sm mt-1 uppercase tracking-tight">
                          {item.sub}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Close Button at bottom for mobile ergonomics */}
            <button
              onClick={toggleMenu}
              className="mt-12 px-8 py-3 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white transition-all uppercase tracking-widest text-xs"
            >
              Fechar Menu
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavigationMenu;
