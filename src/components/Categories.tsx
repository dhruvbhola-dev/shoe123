import { Link } from 'react-router-dom';
import { categories } from '@/data/products';

const categoryImages: Record<string, string> = {
  sneakers: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&q=80',
  sports: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80',
  casual: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80',
  formal: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&q=80',
};

const Categories = () => {
  return (
    <section className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-primary font-display uppercase tracking-[0.3em] text-sm mb-2">
            Browse By
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            Categories
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/products?category=${category.id}`}
              className="group relative overflow-hidden rounded-xl aspect-[4/5] animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background Image */}
              <img
                src={categoryImages[category.id]}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-4xl mb-2 block">{category.icon}</span>
                <h3 className="text-xl md:text-2xl font-display font-bold text-foreground group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
              </div>

              {/* Hover Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary rounded-xl transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
