import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-primary/10 mt-32 py-16 bg-background-secondary/40">
      <div className="container-narrow grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-md bg-gradient-gold flex items-center justify-center">
              <span className="font-display font-black text-primary-foreground text-sm">G</span>
            </div>
            <span className="font-display font-bold text-lg">GolfDraw</span>
          </Link>
          <p className="text-sm text-muted-foreground max-w-sm">
            Your game. Their future. A subscription draw that turns golf scores into life-changing prizes
            and meaningful charitable giving.
          </p>
          <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="px-2 py-1 rounded border border-primary/20 bg-card-foreground/5">
              Powered by Stripe
            </span>
            <span className="px-2 py-1 rounded border border-primary/20 bg-card-foreground/5">
              Secure Payments
            </span>
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold mb-4 text-foreground">Platform</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/charities" className="hover:text-primary transition">Charities</Link></li>
            <li><Link to="/subscribe" className="hover:text-primary transition">Pricing</Link></li>
            <li><Link to="/#how-it-works" className="hover:text-primary transition">How It Works</Link></li>
            <li><Link to="/#prize-pool" className="hover:text-primary transition">Prize Pool</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold mb-4 text-foreground">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary transition">Terms of Service</a></li>
            <li><a href="#" className="hover:text-primary transition">Responsible Play</a></li>
            <li><a href="#" className="hover:text-primary transition">Contact</a></li>
          </ul>
        </div>
      </div>

      <div className="container-narrow mt-12 pt-8 border-t border-primary/10 text-xs text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} GolfDraw. All rights reserved.</p>
        <p>Play responsibly. Give meaningfully.</p>
      </div>
    </footer>
  );
};
