import CategoryCard from '../CategoryCard';
import { Router } from 'wouter';

export default function CategoryCardExample() {
  return (
    <Router>
      <div className="p-8 max-w-sm">
        <CategoryCard
          id="drinks"
          name="Drinks"
          description="Pure stabilized aloe vera drinks and nutritional beverages"
          productCount={12}
          image="https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=800&q=80"
        />
      </div>
    </Router>
  );
}
