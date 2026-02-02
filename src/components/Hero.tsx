import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />
      
      {/* Animated Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] animate-pulse" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <p className="text-primary font-display uppercase tracking-[0.3em] text-sm mb-4">
              New Collection 2024
            </p>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] mb-6">
              Step Into
              <span className="block text-gradient">Style</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto lg:mx-0 mb-8">
              Discover premium footwear crafted for those who dare to stand out. 
              Comfort meets cutting-edge design.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/products">
                <Button variant="hero" size="xl">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Link to="/products?category=sneakers">
                <Button variant="outline" size="xl">
                  Explore Sneakers
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-border">
              <div>
                <p className="text-3xl md:text-4xl font-display font-bold text-gradient">50+</p>
                <p className="text-sm text-muted-foreground mt-1">Premium Styles</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-display font-bold text-gradient">10K+</p>
                <p className="text-sm text-muted-foreground mt-1">Happy Customers</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-display font-bold text-gradient">4.9</p>
                <p className="text-sm text-muted-foreground mt-1">Average Rating</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-slide-up">
            <div className="relative z-10 animate-float">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
                alt="Featured Shoe"
                className="w-full max-w-lg mx-auto drop-shadow-2xl"
                style={{ 
                  filter: 'drop-shadow(0 40px 80px rgba(255, 107, 0, 0.3))',
                  transform: 'rotate(-15deg)',
                }}
              />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-primary/20 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-primary/10 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
