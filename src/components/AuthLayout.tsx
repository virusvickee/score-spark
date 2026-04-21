import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}

export const AuthLayout = ({ title, subtitle, children, footer }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen relative flex items-center justify-center px-6 py-16 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,hsl(var(--primary)/0.08),transparent_50%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <Link to="/" className="flex items-center justify-center gap-2 mb-10">
          <div className="w-9 h-9 rounded-md bg-gradient-gold flex items-center justify-center shadow-gold-sm">
            <span className="font-display font-black text-primary-foreground">G</span>
          </div>
          <span className="font-display font-bold text-xl">GolfDraw</span>
        </Link>

        <div className="glass-card rounded-2xl p-8 md:p-10">
          <h1 className="font-display font-bold text-3xl mb-2">{title}</h1>
          <p className="text-muted-foreground text-sm mb-8">{subtitle}</p>
          {children}
        </div>

        {footer && <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>}
      </motion.div>
    </div>
  );
};
