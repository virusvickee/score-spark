import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const Navbar = () => {
  const location = useLocation();
  const links = [
    { to: "/charities", label: "Charities" },
    { to: "/#how-it-works", label: "How It Works" },
    { to: "/#prize-pool", label: "Prize Pool" },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/60 border-b border-primary/10"
    >
      <nav className="container-narrow flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-md bg-gradient-gold flex items-center justify-center shadow-gold-sm group-hover:scale-110 transition-transform">
            <span className="font-display font-black text-primary-foreground text-sm">G</span>
          </div>
          <span className="font-display font-bold text-lg tracking-tight">GolfDraw</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm text-muted-foreground hover:text-primary transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {location.pathname !== "/login" && (
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-foreground hover:text-primary hover:bg-primary/10">
                Sign In
              </Button>
            </Link>
          )}
          <Link to="/register">
            <Button variant="hero" size="sm">Get Started</Button>
          </Link>
        </div>
      </nav>
    </motion.header>
  );
};
