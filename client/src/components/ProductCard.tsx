import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  description?: string;
  shortDescription?: string;
  image: string;
}

export default function ProductCard({ id, name, category, description, shortDescription, image }: ProductCardProps) {
  const displayDescription = shortDescription || description || "";
  
  return (
    <Link href={`/product/${id}`} data-testid={`link-product-${id}`}>
      <Card className="group h-full hover-elevate active-elevate-2 cursor-pointer transition-all duration-300 border-amber-200 hover:border-primary hover:shadow-lg">
        <CardContent className="p-4">
          <div className="aspect-square relative mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-amber-50 to-white">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
          <Badge variant="secondary" className="mb-2 text-xs bg-amber-100 text-amber-900 border-amber-200">
            #{id}
          </Badge>
          <h3 className="font-semibold text-base md:text-lg mb-2 line-clamp-2 min-h-[3rem]" data-testid={`text-product-name-${id}`}>
            {name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3" data-testid={`text-product-description-${id}`}>
            {displayDescription}
          </p>
          <div className="text-sm font-medium text-primary group-hover:translate-x-1 transition-transform" data-testid={`link-view-details-${id}`}>
            View Details →
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
