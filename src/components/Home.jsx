import React, { useEffect, useMemo, useRef, useState } from 'react'
import ProductCard from './ProductCard'

const PRODUCTS = [
  { id: 1, title: 'iPhone 15 Pro', description: '6.1" display, A17 Pro chip', price: '999.99', image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=400&h=300&fit=crop' },
  { id: 2, title: 'Samsung Galaxy S24', description: '6.2" AMOLED display', price: '899.99', image: 'https://tse1.mm.bing.net/th/id/OIP.CD_9dn4ih9BugbapZ_fuXwHaEK?cb=defcachec2&rs=1&pid=ImgDetMain&o=7&rm=3' },
  { id: 3, title: 'MacBook Pro M3', description: '14" • 8GB RAM • 512GB SSD', price: '1999.99', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop' },
  { id: 4, title: 'Dell XPS 15', description: '15.6" • RTX 4060 • 16GB RAM', price: '1799.99', image: 'https://th.bing.com/th/id/OIP.WeZOX2THKG17oCCD_yt2OQHaFj?w=240&h=180&c=7&r=0&o=7&cb=defcachec2&dpr=1.3&pid=1.7&rm=3' },
  { id: 5, title: 'Google Pixel 8 Pro', description: '6.7" • Google Tensor G3', price: '899.99', image: 'https://th.bing.com/th/id/OIP.GDPSY2Q7n-dLCskNCff1QQHaEK?w=271&h=180&c=7&r=0&o=7&cb=defcachec2&dpr=1.3&pid=1.7&rm=3' },
  { id: 6, title: 'ASUS VivoBook 15', description: '15.6" FHD • Ryzen 7', price: '649.99', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop' },
  { id: 7, title: 'OnePlus 12', description: '6.7" AMOLED • 256GB', price: '799.99', image: 'https://images.unsplash.com/photo-1505236858219-8359498aa6f7?w=400&h=300&fit=crop' },
  { id: 8, title: 'iPad Air', description: '11" • M2 chip', price: '799.99', image: 'https://images.unsplash.com/photo-1533279443086-d1c19ad9d51b?w=400&h=300&fit=crop' },
]

const Home = ({ user, onLogout, onLoginClick }) => {
  const [cart, setCart] = useState([])
  const [query, setQuery] = useState('')
  const [cartOpen, setCartOpen] = useState(false)
  const [toast, setToast] = useState('')
  const gridRef = useRef(null)

  // Persist cart to localStorage (simple, non-blocking enhancement)
  useEffect(() => {
    const saved = localStorage.getItem('cart')
    if (saved) setCart(JSON.parse(saved))
  }, [])
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return PRODUCTS
    return PRODUCTS.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
  }, [query])

  const handleAddToCart = (product) => {
    setCart(prev => [...prev, product])
    setToast(`Added: ${product.title}`)
    setTimeout(() => setToast(''), 1800)
  }

  const handleRemoveFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index))
  }

  const total = cart.reduce((s, item) => s + Number(item.price || 0), 0).toFixed(2)

  const scrollToProducts = () => gridRef.current?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="bg-white min-h-screen text-gray-800">
      {/* NAV */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-3">
              <img src="/logo.jpg" alt="Logo" className="h-8 sm:h-10 w-8 sm:w-10 rounded-md object-cover" />
            </a>
          </div>

          <div className="flex-1 max-w-2xl">
            <input
              aria-label="Search products"
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:block text-sm text-gray-600">Hello, <span className="font-medium text-gray-900">{user?.email?.split('@')[0] ?? 'Guest'}</span></div>

            <button
              onClick={() => setCartOpen(v => !v)}
              className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium"
              aria-label="Open cart"
            >
              🛒 {cart.length}
            </button>

            {user ? (
              <button onClick={onLogout} className="px-3 py-2 bg-red-50 text-red-600 rounded-lg font-medium">Logout</button>
            ) : (
              <button onClick={onLoginClick} className="px-3 py-2 bg-green-50 text-green-700 rounded-lg font-medium">Login</button>
            )}
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-gradient-to-r from-indigo-50 via-white to-pink-50 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">Discover gadgets that delight</h1>
          <p className="mt-4 text-gray-600 text-lg sm:text-xl">Handpicked tech with transparent pricing and fast delivery.</p>
          <div className="mt-8 flex justify-center gap-3">
            <button onClick={scrollToProducts} className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 transform transition">Shop curated gear</button>
            <button onClick={() => setQuery('')} className="px-6 py-3 rounded-full border border-gray-200 text-gray-700 bg-white">Browse all</button>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <main className="max-w-7xl mx-auto px-4 py-10" ref={gridRef}>
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg font-medium text-gray-600">No products match your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(product => (
              <ProductCard key={product.id} {...product} onAddToCart={() => handleAddToCart(product)} />
            ))}
          </div>
        )}
      </main>

      {/* CART (simple sidebar) */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 shadow-xl transform transition-transform ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`} aria-hidden={!cartOpen}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Your Cart</h3>
            <button onClick={() => setCartOpen(false)} className="text-gray-500">✕</button>
          </div>

          <div className="flex-1 overflow-auto space-y-4">
            {cart.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">Your cart is empty</div>
            ) : (
              cart.map((item, i) => (
                <div key={i} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold">{item.title}</div>
                      <div className="text-sm font-bold text-emerald-600 mt-1">${item.price}</div>
                    </div>
                    <button onClick={() => handleRemoveFromCart(i)} className="text-sm text-red-600">Remove</button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-4 border-t pt-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium">Total</span>
              <span className="text-lg font-bold text-emerald-600">${total}</span>
            </div>
            <button className="w-full py-3 bg-gradient-to-r from-indigo-600 to-pink-500 text-white rounded-lg shadow">Checkout</button>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {cartOpen && <div onClick={() => setCartOpen(false)} className="fixed inset-0 bg-black/30 z-40"></div>}

      {/* Toast */}
      {toast && (
        <div className="fixed right-6 bottom-6 bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-4 py-2 rounded-lg shadow-lg">{toast}</div>
      )}
    </div>
  )
}

export default Home
