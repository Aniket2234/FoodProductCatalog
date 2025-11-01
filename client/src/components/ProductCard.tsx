import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
}

export default function ProductCard({ id, name, category, description, image }: ProductCardProps) {
  return (
    <Link href={`/product/${id}`} data-testid={`link-product-${id}`}>
      <Card className="group h-full hover-elevate active-elevate-2 cursor-pointer transition-all duration-200">
        <CardContent className="p-4">
          <div className="aspect-square relative mb-4 rounded-md overflow-hidden bg-muted">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2" data-testid={`text-product-name-${id}`}>
            {name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3" data-testid={`text-product-description-${id}`}>
            {description}
          </p>
          <div className="text-sm font-medium text-primary" data-testid={`link-view-details-${id}`}>
            View Details →
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
