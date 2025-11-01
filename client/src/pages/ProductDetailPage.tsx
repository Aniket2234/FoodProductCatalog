import { useRoute, Link } from "wouter";
import Header from "@/components/Header";
import { ChevronRight, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

//todo: remove mock functionality
const PRODUCT_DATA: Record<string, any> = {
  "aloe-gel": {
    name: "Forever Aloe Vera Gel",
    category: "Drinks",
    categoryId: "drinks",
    image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=800&q=80",
    shortDescription: "Pure stabilized aloe vera gel for daily wellness",
    description: "Forever Aloe Vera Gel is as close to the real thing as you can get. Our aloe contains 99.7% inner leaf aloe gel, hand-filleted from freshly harvested leaves. This formula helps maintain a healthy digestive system and promotes a healthy immune system.",
    features: [
      "99.7% pure inner leaf aloe vera gel",
      "Certified by the International Aloe Science Council",
      "No preservatives or added sugars",
      "Supports healthy digestion",
      "Rich in vitamins and minerals"
    ],
    benefits: [
      "Supports digestive health",
      "Promotes immune system function",
      "Helps maintain natural energy levels",
      "Assists nutrient absorption",
      "Supports overall wellness"
    ],
    ingredients: "Aloe vera gel (stabilized), Ascorbic acid (antioxidant), Citric acid (to maintain freshness), Potassium sorbate (to preserve freshness), Sodium benzoate (to preserve freshness), Xanthan gum (thickener), Tocopherol (antioxidant)",
    usage: "Shake well. Drink 2-4 oz (60-120ml) daily. Best when chilled. Keep refrigerated after opening."
  },
  "bee-honey": {
    name: "Forever Bee Honey",
    category: "Bee Products",
    categoryId: "bee",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784363?w=800&q=80",
    shortDescription: "Pure natural honey from our own beehives",
    description: "Forever Bee Honey is a great-tasting, all natural sweetener loaded with nature's goodness. Our honey is carefully collected from hives located in remote, pollution-free regions to ensure optimum purity.",
    features: [
      "100% natural honey",
      "No artificial colors or preservatives",
      "Rich in antioxidants",
      "Natural energy source",
      "Premium quality from remote hives"
    ],
    benefits: [
      "Natural energy boost",
      "Supports immune function",
      "Rich in natural enzymes",
      "Natural antioxidant properties",
      "Great natural sweetener"
    ],
    ingredients: "Pure natural honey",
    usage: "Use as a natural sweetener in beverages, cooking, or enjoy directly. Can be taken daily as a natural energy supplement."
  }
};

export default function ProductDetailPage() {
  const [, params] = useRoute("/product/:id");
  const productId = params?.id || "aloe-gel";
  const product = PRODUCT_DATA[productId] || PRODUCT_DATA["aloe-gel"];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8" data-testid="breadcrumb">
          <Link href="/" className="hover:text-foreground transition-colors" data-testid="link-home-breadcrumb">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link 
            href={`/category/${product.categoryId}`} 
            className="hover:text-foreground transition-colors"
            data-testid="link-category-breadcrumb"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground" data-testid="text-current-product">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12">
          <div>
            <div className="aspect-square rounded-lg overflow-hidden bg-muted sticky top-24">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                data-testid="img-product"
              />
            </div>
          </div>

          <div>
            <Badge variant="secondary" className="mb-4" data-testid="badge-category">
              {product.category}
            </Badge>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold mb-4" data-testid="text-product-name">
              {product.name}
            </h1>
            <p className="text-lg text-muted-foreground mb-8" data-testid="text-short-description">
              {product.shortDescription}
            </p>

            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3" data-testid="tabs-product-info">
                <TabsTrigger value="description" data-testid="tab-description">Description</TabsTrigger>
                <TabsTrigger value="features" data-testid="tab-features">Features</TabsTrigger>
                <TabsTrigger value="benefits" data-testid="tab-benefits">Benefits</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-6 space-y-4">
                <p className="text-foreground leading-relaxed" data-testid="text-description">
                  {product.description}
                </p>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3">How to Use</h3>
                    <p className="text-sm text-muted-foreground" data-testid="text-usage">
                      {product.usage}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="features" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <ul className="space-y-3">
                      {product.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start gap-3" data-testid={`feature-${index}`}>
                          <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                            <Check className="w-4 h-4 text-primary" />
                          </div>
                          <span className="flex-1">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="benefits" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <ul className="space-y-3">
                      {product.benefits.map((benefit: string, index: number) => (
                        <li key={index} className="flex items-start gap-3" data-testid={`benefit-${index}`}>
                          <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                            <Check className="w-4 h-4 text-primary" />
                          </div>
                          <span className="flex-1">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Card className="mt-8">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Ingredients</h3>
                <p className="text-sm text-muted-foreground" data-testid="text-ingredients">
                  {product.ingredients}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
