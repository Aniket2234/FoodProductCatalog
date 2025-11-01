import ProductCard from '../ProductCard';
import { Router } from 'wouter';

export default function ProductCardExample() {
  return (
    <Router>
      <div className="p-8 max-w-xs">
        <ProductCard
          id="aloe-gel"
          name="Forever Aloe Vera Gel"
          category="Drinks"
          description="Pure stabilized aloe vera gel for daily wellness"
          image="https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&q=80"
        />
      </div>
    </Router>
  );
}
