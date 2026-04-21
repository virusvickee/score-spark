import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Heart, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CountUp } from "@/components/CountUp";

const CHARITIES = [
  { id: "1", name: "Children's Heart Foundation", category: "Health", desc: "Funding life-saving cardiac surgeries for children with congenital heart defects.", raised: 18420, featured: true },
  { id: "2", name: "Ocean Conservation Trust", category: "Environment", desc: "Protecting marine ecosystems and coastlines for future generations.", raised: 12840 },
  { id: "3", name: "Veterans Aid", category: "Community", desc: "Supporting ex-service personnel facing homelessness and crisis.", raised: 9620 },
  { id: "4", name: "Youth Sports Initiative", category: "Sport", desc: "Free coaching and equipment for young people in underserved communities.", raised: 7380 },
  { id: "5", name: "Mental Health Matters", category: "Health", desc: "Free, accessible mental health support for adults and teens.", raised: 14210 },
  { id: "6", name: "Food For All", category: "Community", desc: "Tackling food poverty across the UK with weekly community pantries.", raised: 11050 },
];

const CATEGORIES = ["All", "Health", "Environment", "Community", "Sport"];

const Charities = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = CHARITIES.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.desc.toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === "All" || c.category === category;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-12">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">Charity directory</p>
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-4">Pick a cause that moves you.</h1>
            <p className="text-muted-foreground text-lg">
              Every subscriber chooses one charity. Your contribution flows directly to them every month.
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-4 mb-10">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search charities..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-12 bg-input/40 border-primary/15 focus-visible:border-primary/50"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 h-12 rounded-md text-sm font-medium whitespace-nowrap transition-all border ${
                    category === cat
                      ? "bg-primary text-primary-foreground border-primary shadow-gold-sm"
                      : "bg-card-foreground/5 border-primary/15 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((c, i) => (
              <motion.div
                key={c.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
                className={`glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col ${
                  c.featured ? "border-primary/50 shadow-gold-sm" : ""
                }`}
              >
                <div className="relative aspect-[16/10] bg-gradient-to-br from-primary/20 via-primary/5 to-background-secondary flex items-center justify-center">
                  <Heart className="w-16 h-16 text-primary/40" strokeWidth={1.2} />
                  {c.featured && (
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-gold text-primary-foreground text-[10px] font-bold uppercase tracking-wider">
                      <Sparkles className="w-3 h-3" /> Featured
                    </span>
                  )}
                  <span className="absolute top-3 right-3 px-2 py-1 rounded-md bg-background/70 backdrop-blur text-[10px] font-medium uppercase tracking-wider text-muted-foreground border border-primary/15">
                    {c.category}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-display font-bold text-lg mb-2">{c.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">{c.desc}</p>
                  <div className="flex items-end justify-between pt-4 border-t border-primary/10">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Raised</p>
                      <p className="text-xl text-gradient-gold"><CountUp end={c.raised} prefix="£" /></p>
                    </div>
                    <Link to={`/charities/${c.id}`}>
                      <Button variant="gold-outline" size="sm">View</Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              No charities match your search.
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Charities;
