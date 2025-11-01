import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CategoryCardProps {
  id: string;
  name: string;
  description: string;
  productCount: number;
  image: string;
}

export default function CategoryCard({ id, name, description, productCount, image }: CategoryCardProps) {
  return (
    <Link href={`/category/${id}`} data-testid={`link-category-${id}`}>
      <Card className="group relative overflow-hidden cursor-pointer hover-elevate active-elevate-2 transition-all duration-200 h-full">
        <div className="aspect-square relative">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            <Badge variant="secondary" className="w-fit mb-2" data-testid={`badge-count-${id}`}>
              {productCount} Products
            </Badge>
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2" data-testid={`text-category-name-${id}`}>
              {name}
            </h3>
            <p className="text-sm text-white/90 line-clamp-2" data-testid={`text-category-description-${id}`}>
              {description}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
