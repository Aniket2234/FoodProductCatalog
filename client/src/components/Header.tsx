import { Search, ShoppingBag } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Input } from "@/components/ui/input";

export default function Header() {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between gap-4 h-16 md:h-20">
          <Link href="/" data-testid="link-home">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="font-heading text-xl md:text-2xl font-bold text-primary">
                FOREVER
              </div>
              <div className="hidden sm:block text-sm text-muted-foreground">
                Living Products
              </div>
            </div>
          </Link>

          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10"
                data-testid="input-search"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="md:hidden p-2 hover-elevate active-elevate-2 rounded-md" data-testid="button-search-mobile">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 hover-elevate active-elevate-2 rounded-md" data-testid="button-cart">
              <ShoppingBag className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
