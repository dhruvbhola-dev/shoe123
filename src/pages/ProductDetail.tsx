import { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Star, Minus, Plus, ShoppingBag, Zap, Upload, Camera, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { getProductById, CUSTOMIZATION_FEE } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || '');
  const { addToCart } = useCart();
  
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [uploadedDesign, setUploadedDesign] = useState<string | null>(null);
  const [arModalOpen, setArModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-display font-bold mb-4">Product Not Found</h1>
          <Link to="/products">
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const totalPrice = product.price + CUSTOMIZATION_FEE;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/heic'];
    if (!validTypes.includes(file.type) && !file.name.toLowerCase().endsWith('.heic')) {
      toast.error('Please upload a .jpg, .png, or .heic file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedDesign(event.target?.result as string);
      toast.success('Design uploaded! See your preview below.');
    };
    reader.readAsDataURL(file);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    addToCart(product, selectedSize, quantity);
    toast.success(`${product.name} (Custom) added to cart!`);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    addToCart(product, selectedSize, quantity);
    window.location.href = '/checkout';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 md:pt-28 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <Link
            to="/products"
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Shop
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Visualizer Area */}
            <div className="space-y-4">
              {/* Main Image with Design Overlay */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-card">
                <img
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {/* Design overlay */}
                {uploadedDesign && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={uploadedDesign}
                      alt="Your custom design"
                      className="w-3/5 h-3/5 object-contain opacity-80 mix-blend-multiply"
                      style={{ filter: 'contrast(1.1)' }}
                    />
                  </div>
                )}
                {uploadedDesign && (
                  <button
                    onClick={() => setUploadedDesign(null)}
                    className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        activeImage === index
                          ? 'border-primary'
                          : 'border-transparent hover:border-muted'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Upload & AR Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.heic"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Upload Your Design / Photo
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  className="flex-1"
                  onClick={() => setArModalOpen(true)}
                >
                  <Camera className="h-5 w-5 mr-2" />
                  Try It On (AR View)
                </Button>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Category & Rating */}
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs uppercase tracking-wider rounded-full">
                  Plain White · {product.category}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="text-sm">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              {/* Name & Brand */}
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">
                  {product.brand}
                </p>
                <h1 className="text-3xl md:text-5xl font-display font-bold mt-1">
                  {product.name}
                </h1>
              </div>

              {/* Price Breakdown */}
              <div className="bg-card rounded-xl border border-border p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Base Shoe Price</span>
                  <span>{formatPrice(product.price)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Custom Hand-Painting Fee</span>
                  <span>{formatPrice(CUSTOMIZATION_FEE)}</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between">
                  <span className="font-display font-bold">Total</span>
                  <span className="text-2xl font-display font-bold text-primary">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-lg leading-relaxed">
                {product.description}
              </p>

              {/* Size Selection */}
              <div>
                <h3 className="font-display font-semibold mb-3">
                  Select Size (UK)
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-14 rounded-lg border-2 font-display font-semibold transition-all ${
                        selectedSize === size
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border hover:border-primary'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="font-display font-semibold mb-3">Quantity</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-secondary transition-colors rounded-l-lg"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-6 font-display font-semibold">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-secondary transition-colors rounded-r-lg"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  variant="cart"
                  size="xl"
                  className="flex-1"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Add to Cart — {formatPrice(totalPrice * quantity)}
                </Button>
                <Button
                  variant="outline"
                  size="xl"
                  className="flex-1"
                  onClick={handleBuyNow}
                >
                  <Zap className="h-5 w-5 mr-2" />
                  Buy Now
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                ✨ Custom Hand-Painted Service Included · 7–10 business days delivery
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* AR Modal */}
      <Dialog open={arModalOpen} onOpenChange={setArModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              Try It On — AR Live View
            </DialogTitle>
            <DialogDescription>
              See how your custom shoe looks in real life.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Camera className="h-10 w-10 text-primary" />
            </div>
            <p className="text-lg font-display font-semibold">
              AR Live View Camera launching...
            </p>
            <p className="text-sm text-muted-foreground max-w-sm">
              This feature uses augmented reality to project the custom design onto your foot in real-time. Integration required — coming soon!
            </p>
            <Button variant="outline" onClick={() => setArModalOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDetail;
