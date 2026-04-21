import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Construction } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface ComingSoonProps {
  title: string;
  description: string;
}

const ComingSoon = ({ title, description }: ComingSoonProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-1 flex items-center justify-center pt-24 pb-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-2xl p-10 md:p-14 max-w-xl w-full text-center"
        >
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-gold flex items-center justify-center shadow-gold-sm mb-6">
            <Construction className="w-7 h-7 text-primary-foreground" />
          </div>
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Coming next</p>
          <h1 className="font-display font-bold text-3xl md:text-4xl mb-4">{title}</h1>
          <p className="text-muted-foreground leading-relaxed mb-8">{description}</p>
          <Link to="/">
            <Button variant="gold-outline" size="lg">Back to home</Button>
          </Link>
        </motion.div>
      </section>
      <Footer />
    </div>
  );
};

export default ComingSoon;
