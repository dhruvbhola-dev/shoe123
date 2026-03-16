import { useState } from 'react';
import { Package, ShoppingCart, Plus, Trash2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { products as initialProducts, Product, CUSTOMIZATION_FEE } from '@/data/products';
import { toast } from 'sonner';

const Admin = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'sneakers',
    image: '',
  });

  // Mock orders data
  const orders = [
    { id: 'INK001', customer: 'John Doe', total: 4999 + CUSTOMIZATION_FEE, status: 'Painting', date: '2024-01-15' },
    { id: 'INK002', customer: 'Jane Smith', total: 5999 + CUSTOMIZATION_FEE, status: 'Delivered', date: '2024-01-14' },
    { id: 'INK003', customer: 'Mike Johnson', total: (3999 + CUSTOMIZATION_FEE) * 2, status: 'Shipped', date: '2024-01-13' },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      toast.error('Please fill all fields');
      return;
    }

    const product: Product = {
      id: String(Date.now()),
      name: newProduct.name,
      brand: 'Inkwear',
      price: Number(newProduct.price),
      category: newProduct.category as Product['category'],
      image: newProduct.image,
      images: [newProduct.image],
      sizes: [6, 7, 8, 9, 10],
      description: `Plain white ${newProduct.category} shoe ready for custom hand-painting.`,
      featured: false,
      rating: 4.5,
      reviews: 0,
    };

    setProductList(prev => [...prev, product]);
    setNewProduct({ name: '', price: '', category: 'sneakers', image: '' });
    setShowAddForm(false);
    toast.success('Product added successfully!');
  };

  const handleDeleteProduct = (id: string) => {
    setProductList(prev => prev.filter(p => p.id !== id));
    toast.success('Product deleted');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 md:pt-28 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-8">
            Admin Panel
          </h1>

          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            <Button
              variant={activeTab === 'products' ? 'default' : 'outline'}
              onClick={() => setActiveTab('products')}
            >
              <Package className="h-4 w-4 mr-2" />
              Products
            </Button>
            <Button
              variant={activeTab === 'orders' ? 'default' : 'outline'}
              onClick={() => setActiveTab('orders')}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Orders
            </Button>
          </div>

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-display font-bold">
                  Manage Shoes ({productList.length})
                </h2>
                <Button onClick={() => setShowAddForm(!showAddForm)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Shoe
                </Button>
              </div>

              {/* Add Product Form */}
              {showAddForm && (
                <div className="bg-card rounded-xl border border-border p-6 mb-6">
                  <h3 className="font-display font-bold mb-4">Add New White Shoe</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Shoe Name</Label>
                      <Input
                        id="name"
                        value={newProduct.name}
                        onChange={e => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Canvas High-Top"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Base Price (₹)</Label>
                      <Input
                        id="price"
                        type="number"
                        value={newProduct.price}
                        onChange={e => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                        placeholder="4999"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <select
                        id="category"
                        value={newProduct.category}
                        onChange={e => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
                        className="mt-1 w-full h-10 rounded-lg border border-input bg-background px-3 text-sm"
                      >
                        <option value="sneakers">Sneakers</option>
                        <option value="sports">Sports</option>
                        <option value="casual">Casual</option>
                        <option value="formal">Formal</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="image">Image URL</Label>
                      <Input
                        id="image"
                        value={newProduct.image}
                        onChange={e => setNewProduct(prev => ({ ...prev, image: e.target.value }))}
                        placeholder="https://..."
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    Customization fee of {formatPrice(CUSTOMIZATION_FEE)} will be added automatically at checkout.
                  </p>
                  <div className="flex gap-3 mt-4">
                    <Button onClick={handleAddProduct}>Add Shoe</Button>
                    <Button variant="outline" onClick={() => setShowAddForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {/* Products List */}
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-secondary">
                      <tr>
                        <th className="text-left p-4 font-display font-semibold">Shoe</th>
                        <th className="text-left p-4 font-display font-semibold">Category</th>
                        <th className="text-left p-4 font-display font-semibold">Base Price</th>
                        <th className="text-left p-4 font-display font-semibold">Total w/ Paint</th>
                        <th className="text-left p-4 font-display font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productList.map(product => (
                        <tr key={product.id} className="border-t border-border">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                              <span className="font-semibold">{product.name}</span>
                            </div>
                          </td>
                          <td className="p-4 capitalize text-muted-foreground">
                            {product.category}
                          </td>
                          <td className="p-4 font-semibold">
                            {formatPrice(product.price)}
                          </td>
                          <td className="p-4 font-semibold text-primary">
                            {formatPrice(product.price + CUSTOMIZATION_FEE)}
                          </td>
                          <td className="p-4">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-2xl font-display font-bold mb-6">
                Recent Orders
              </h2>

              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-secondary">
                      <tr>
                        <th className="text-left p-4 font-display font-semibold">Order ID</th>
                        <th className="text-left p-4 font-display font-semibold">Customer</th>
                        <th className="text-left p-4 font-display font-semibold">Date</th>
                        <th className="text-left p-4 font-display font-semibold">Total</th>
                        <th className="text-left p-4 font-display font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order.id} className="border-t border-border">
                          <td className="p-4 font-mono text-sm">{order.id}</td>
                          <td className="p-4">{order.customer}</td>
                          <td className="p-4 text-muted-foreground">{order.date}</td>
                          <td className="p-4 font-semibold">{formatPrice(order.total)}</td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              order.status === 'Delivered'
                                ? 'bg-green-500/20 text-green-500'
                                : order.status === 'Shipped'
                                ? 'bg-blue-500/20 text-blue-500'
                                : 'bg-yellow-500/20 text-yellow-500'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
