import { Link } from 'react-router-dom';
import { Paintbrush, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product, CUSTOMIZATION_FEE } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const totalPrice = product.price + CUSTOMIZATION_FEE;

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="relative overflow-hidden rounded-xl bg-card card-hover">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Customization Badge */}
          <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold uppercase">
            Customizable
          </div>

          {/* Customize Button */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <Button
              variant="cart"
              size="sm"
              className="w-full"
            >
              <Paintbrush className="h-4 w-4 mr-2" />
              Customize This Shoe
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="flex items-center gap-1 mb-2">
            <Star className="h-3.5 w-3.5 fill-primary text-primary" />
            <span className="text-xs text-muted-foreground">
              {product.rating} ({product.reviews})
            </span>
          </div>
          
          <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          
          <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
            Plain White · {product.category}
          </p>

          <div className="mt-3">
            <span className="text-lg font-bold text-foreground">
              {formatPrice(totalPrice)}
            </span>
            <p className="text-xs text-muted-foreground mt-0.5">
              Shoe {formatPrice(product.price)} + Painting {formatPrice(CUSTOMIZATION_FEE)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
