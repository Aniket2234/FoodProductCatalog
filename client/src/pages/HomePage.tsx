import Header from "@/components/Header";
import CategoryCard from "@/components/CategoryCard";
import { useQuery } from "@tanstack/react-query";
import type { CategoryType, ProductType } from "@shared/schema";

export default function HomePage() {
  const { data: categories = [] } = useQuery<CategoryType[]>({
    queryKey: ["/api/categories"],
  });

  const { data: products = [] } = useQuery<ProductType[]>({
    queryKey: ["/api/products"],
  });

  const categoriesWithCounts = categories.map(category => {
    const productCount = products.filter(p => p.categoryId === category.id).length;
    return {
      id: category.id,
      name: category.name,
      description: category.description,
      productCount,
      image: category.image || ""
    };
  });
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=1600&q=80"
          alt="Forever Living Products"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 max-w-4xl">
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4" data-testid="text-hero-title">
              Forever Living Products
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto" data-testid="text-hero-subtitle">
              Discover our complete range of natural health, wellness, and beauty products
            </p>
            <button 
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover-elevate active-elevate-2 transition-all"
              data-testid="button-explore"
              onClick={() => window.scrollTo({ top: window.innerHeight * 0.6, behavior: 'smooth' })}
            >
              Explore Categories
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold mb-4" data-testid="text-categories-title">
            Product Categories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto" data-testid="text-categories-subtitle">
            Browse our carefully curated collection of health and wellness products
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {categoriesWithCounts.map((category) => (
            <CategoryCard
              key={category.id}
              {...category}
            />
          ))}
        </div>
      </div>

      <footer className="border-t bg-muted/30 py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-heading font-bold text-lg mb-4">Forever Living</h3>
              <p className="text-sm text-muted-foreground">
                Quality natural products for health, wellness, and beauty since 1978.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Categories</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {categoriesWithCounts.map(cat => (
                  <li key={cat.id}>
                    <a href={`/category/${cat.id}`} className="hover:text-foreground transition-colors">
                      {cat.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <p className="text-sm text-muted-foreground">
                For more information about our products, please contact your local Forever Living distributor.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
