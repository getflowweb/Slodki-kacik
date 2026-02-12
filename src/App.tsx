import { useState, useEffect, FormEvent } from 'react';

// --- INTERFEJSY (TYPY) ---
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  tag?: string;
  desc: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'info';
}

// --- DANE ---
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Królewski Sernik',
    price: 18.00,
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tag: 'Bestseller',
    desc: 'Delikatny sernik na kruchym spodzie z sezonowymi owocami.'
  },
  {
    id: 2,
    name: 'Muffin Czekoladowy',
    price: 12.00,
    image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    desc: 'Płynna czekolada w środku, chrupiąca skórka na zewnątrz.'
  },
  {
    id: 3,
    name: 'Croissant Pistacjowy',
    price: 16.00,
    image: 'https://images.unsplash.com/photo-1623334044303-241021148842?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tag: 'Nowość',
    desc: 'Francuskie ciasto z bogatym kremem pistacjowym.'
  },
  {
    id: 4,
    name: 'Tartaletka Malinowa',
    price: 14.00,
    image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?q=80&w=800&auto=format&fit=crop',
    desc: 'Kruche ciasto, krem waniliowy i świeże maliny.'
  }
];

export default function App() {
  // --- STATE ---
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // --- EFEKTY ---
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- LOGIKA KOSZYKA ---
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`Dodano: ${product.name}`, 'success');
  };

  const updateQuantity = (id: number, change: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            return { ...item, quantity: Math.max(0, item.quantity + change) };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      showToast('Twój koszyk jest pusty!', 'info');
      return;
    }
    setIsProcessing(true);
    
    // Symulacja API
    setTimeout(() => {
      setIsProcessing(false);
      setCart([]);
      setIsCartOpen(false);
      showToast('Dziękujemy! Zamówienie zostało złożone.', 'success');
    }, 1500);
  };

  // --- LOGIKA POWIADOMIEŃ ---
  const showToast = (message: string, type: 'success' | 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // --- LOGIKA FORMULARZA ---
  const handleCakeOrder = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const btn = form.querySelector('button') as HTMLButtonElement;
    
    if (!btn) return;

    const originalText = btn.innerText;
    
    btn.innerText = "Wysyłanie...";
    btn.disabled = true;
    
    setTimeout(() => {
      btn.innerText = "Wysłano pomyślnie!";
      showToast("Dziękujemy! Otrzymaliśmy Twoje zapytanie.", 'success');
      form.reset();
      
      setTimeout(() => {
        btn.innerText = originalText;
        btn.disabled = false;
      }, 3000);
    }, 1500);
  };

  // --- RENDER ---
  return (
    <div className="bg-brand-cream text-brand-dark font-sans antialiased overflow-x-hidden">
      
      {/* NAWIGACJA */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white/95 shadow-md' : 'bg-white/90 backdrop-blur-md'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.scrollTo(0,0)}>
              <i className="fa-solid fa-cookie-bite text-3xl text-brand-pink mr-2"></i>
              <span className="font-serif text-2xl font-bold tracking-wider">Słodki Kącik</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#hero" className="text-brand-dark hover:text-brand-pink transition font-medium">Start</a>
              <a href="#menu" className="text-brand-dark hover:text-brand-pink transition font-medium">Menu</a>
              <a href="#orders" className="text-brand-dark hover:text-brand-pink transition font-medium">Torty na Zamówienie</a>
              <a href="#contact" className="text-brand-dark hover:text-brand-pink transition font-medium">Kontakt</a>
              <button 
                onClick={() => setIsCartOpen(true)} 
                className="bg-brand-dark text-white px-5 py-2 rounded-full hover:bg-brand-pink hover:text-white transition flex items-center gap-2 relative group cursor-pointer"
              >
                <i className="fa-solid fa-basket-shopping"></i>
                <span className="font-medium">Koszyk</span>
                {totalItems > 0 && (
                  <span className="bg-brand-pink text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center absolute -top-2 -right-2 border-2 border-white">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
               <button onClick={() => setIsCartOpen(true)} className="relative text-brand-dark hover:text-brand-pink">
                <i className="fa-solid fa-basket-shopping text-2xl"></i>
                {totalItems > 0 && (
                  <span className="bg-brand-pink text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center absolute -top-1 -right-1 border border-white">
                    {totalItems}
                  </span>
                )}
              </button>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-brand-dark hover:text-brand-pink focus:outline-none">
                <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-2xl`}></i>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
              {['Start', 'Menu', 'Torty', 'Kontakt'].map((item) => (
                <a 
                  key={item}
                  href={`#${item === 'Torty' ? 'orders' : item === 'Start' ? 'hero' : item.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 text-brand-dark hover:bg-brand-pink hover:text-white rounded-md"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* --- KOSZYK (PANEL BOCZNY) Z ANIMACJĄ --- */}
      
      {/* 1. TŁO (Backdrop) */}
      <div 
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ease-in-out ${
          isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsCartOpen(false)}
      ></div>

      {/* 2. PANEL BOCZNY (Sidebar) */}
      <div 
        className={`fixed inset-y-0 right-0 w-full md:w-[400px] bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-brand-cream">
          <h2 className="font-serif text-2xl font-bold text-brand-dark">Twój Koszyk</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-brand-dark transition">
            <i className="fa-solid fa-xmark text-2xl"></i>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <i className="fa-solid fa-basket-shopping text-4xl mb-3 opacity-30"></i>
              <p>Twój koszyk jest pusty.</p>
              <button onClick={() => setIsCartOpen(false)} className="mt-4 text-brand-pink font-bold hover:underline">
                Przejdź do menu
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 mb-6">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg shadow-sm bg-gray-100" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-brand-dark text-sm">{item.name}</h4>
                    <p className="text-brand-gold text-sm font-bold">{(item.price * item.quantity).toFixed(2)} zł</p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center bg-gray-100 rounded-lg">
                      <button onClick={() => updateQuantity(item.id, -1)} className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-brand-dark hover:bg-gray-200 rounded-l-lg">-</button>
                      <span className="text-xs font-bold w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-brand-dark hover:bg-gray-200 rounded-r-lg">+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 text-sm underline">Usuń</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Suma:</span>
            <span className="text-2xl font-bold text-brand-dark">{cartTotal.toFixed(2)} zł</span>
          </div>
          <button 
            onClick={handleCheckout} 
            disabled={isProcessing}
            className={`w-full bg-brand-dark text-white py-4 rounded-lg font-bold hover:bg-brand-pink transition shadow-lg flex justify-center items-center gap-2 ${isProcessing ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isProcessing ? (
              <><i className="fa-solid fa-spinner fa-spin"></i> Przetwarzanie...</>
            ) : (
              <>Złóż zamówienie <i className="fa-solid fa-arrow-right"></i></>
            )}
          </button>
        </div>
      </div>


      {/* HERO SECTION */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" alt="Pyszny tort" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white animate-fade-in-up">
          <p className="font-serif italic text-xl md:text-2xl mb-4 text-brand-pink">Rzemieślnicza jakość od 2010 roku</p>
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Tradycja, którą czuć <br/> w każdym kęsie
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light">
            Używamy tylko naturalnych składników, prawdziwego masła i belgijskiej czekolady. Odkryj smak prawdziwych wypieków.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#menu" className="bg-brand-pink text-brand-dark px-8 py-3 rounded-full font-bold hover:bg-white transition transform hover:scale-105 shadow-lg">
              Zobacz Menu
            </a>
            <a href="#orders" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-brand-dark transition transform hover:scale-105">
              Zamów Tort
            </a>
          </div>
        </div>
      </section>

      {/* ZALETY */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: "fa-leaf", title: "100% Naturalne", desc: "Zero konserwantów i polepszaczy. Tylko jajka od szczęśliwych kur." },
              { icon: "fa-heart", title: "Pasja i Serce", desc: "Każde ciasto jest wyrabiane ręcznie przez naszych mistrzów." },
              { icon: "fa-truck-fast", title: "Dostawa do domu", desc: "Zamów online, a my dostarczymy słodkości pod Twoje drzwi." }
            ].map((feature, idx) => (
              <div key={idx} className="p-6 rounded-xl hover:shadow-xl transition duration-300">
                <div className="w-16 h-16 bg-brand-beige rounded-full flex items-center justify-center mx-auto mb-4 text-brand-pink text-2xl">
                  <i className={`fa-solid ${feature.icon}`}></i>
                </div>
                <h3 className="font-serif text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="py-20 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-brand-dark mb-4">Nasze Specjały</h2>
            <div className="w-24 h-1 bg-brand-pink mx-auto mb-4"></div>
            <p className="text-gray-600">Codziennie świeże, codziennie pyszne.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 group">
                <div className="h-64 overflow-hidden relative">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500" />
                  {product.tag && (
                    <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-bold shadow ${product.tag === 'Nowość' ? 'bg-green-100 text-green-800' : 'bg-white text-brand-dark'}`}>
                      {product.tag}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-4">{product.desc}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-brand-gold">{product.price.toFixed(2)} zł</span>
                    <button 
                      onClick={() => addToCart(product)}
                      className="w-10 h-10 rounded-full bg-brand-beige text-brand-dark flex items-center justify-center hover:bg-brand-pink hover:text-white transition group/btn"
                    >
                      <i className="fa-solid fa-plus group-active/btn:scale-90 transition"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TORTY ZAMÓWIENIA */}
      <section id="orders" className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute -top-4 -left-4 w-full h-full border-4 border-brand-pink rounded-2xl z-0"></div>
            <img src="https://images.unsplash.com/photo-1535141192574-5d4897c12636?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Tort weselny" className="w-full rounded-2xl shadow-xl relative z-10" />
          </div>

          <div className="w-full lg:w-1/2">
            <h2 className="font-serif text-4xl font-bold text-brand-dark mb-4">Twój Wymarzony Tort</h2>
            <p className="text-gray-600 mb-8">Napisz nam, czego potrzebujesz. Tworzymy torty na wesela, urodziny i chrzciny.</p>

            <form onSubmit={handleCakeOrder} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-700">Imię i Nazwisko</label>
                  <input type="text" required className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-brand-pink focus:outline-none focus:ring-1 focus:ring-brand-pink transition" placeholder="Jan Kowalski" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-700">Data Odbioru</label>
                  <input type="date" required className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-brand-pink focus:outline-none focus:ring-1 focus:ring-brand-pink transition" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                      <label className="block text-sm font-bold mb-2 text-gray-700">Liczba osób</label>
                      <select className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-brand-pink focus:outline-none focus:ring-1 focus:ring-brand-pink transition">
                          <option>6-8 osób</option>
                          <option>10-12 osób</option>
                          <option>15-20 osób</option>
                          <option>20+ (Wycena indyw.)</option>
                      </select>
                  </div>
                  <div>
                      <label className="block text-sm font-bold mb-2 text-gray-700">Preferowany Smak</label>
                      <select className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-brand-pink focus:outline-none focus:ring-1 focus:ring-brand-pink transition">
                          <option>Śmietankowy z owocami</option>
                          <option>Czekoladowy Truflowy</option>
                          <option>Słony Karmel</option>
                          <option>Oreo</option>
                          <option>Red Velvet</option>
                      </select>
                  </div>
              </div>
              <div>
                  <label className="block text-sm font-bold mb-2 text-gray-700">Dodatkowe uwagi</label>
                  <textarea rows={3} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-brand-pink focus:outline-none focus:ring-1 focus:ring-brand-pink transition" placeholder="Opisz jak ma wyglądać Twój tort..."></textarea>
              </div>

              <button type="submit" className="w-full bg-brand-dark text-white font-bold py-4 rounded-lg hover:bg-brand-pink transition shadow-lg mt-4">
                Poproś o wycenę
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* OPINIE */}
      <section className="py-16 bg-brand-beige">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <i className="fa-solid fa-quote-left text-4xl text-brand-pink mb-6 opacity-50"></i>
          <p className="font-serif text-2xl italic text-brand-dark mb-6">"Najlepszy sernik, jaki jadłam w życiu! Tort na urodziny córki był nie tylko przepiękny, ale też lekki i nie za słodki."</p>
          <div className="flex items-center justify-center gap-4">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Klient" className="w-12 h-12 rounded-full border-2 border-white" />
            <div className="text-left">
              <p className="font-bold text-sm">Anna Nowak</p>
              <div className="text-brand-gold text-xs">
                {[1,2,3,4,5].map(star => <i key={star} className="fa-solid fa-star"></i>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-brand-dark text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center mb-6">
                <i className="fa-solid fa-cookie-bite text-2xl text-brand-pink mr-2"></i>
                <span className="font-serif text-2xl font-bold">Słodki Kącik</span>
              </div>
              <p className="text-gray-400 mb-6">Tworzymy słodkie wspomnienia od lat.</p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-pink transition"><i className="fa-brands fa-facebook-f"></i></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-pink transition"><i className="fa-brands fa-instagram"></i></a>
              </div>
            </div>
            
            <div>
                <h4 className="font-serif text-xl font-bold mb-6 text-brand-pink">Godziny Otwarcia</h4>
                <ul className="space-y-3 text-gray-300">
                    <li className="flex justify-between border-b border-white/10 pb-2"><span>Pn - Pt</span> <span>08:00 - 19:00</span></li>
                    <li className="flex justify-between pb-2"><span>Sob - Nd</span> <span>10:00 - 16:00</span></li>
                </ul>
            </div>
            <div>
                 <h4 className="font-serif text-xl font-bold mb-6 text-brand-pink">Kontakt</h4>
                 <ul className="space-y-4 text-gray-300">
                    <li className="flex items-start"><i className="fa-solid fa-location-dot mt-1 mr-3 text-brand-pink"></i> ul. Słodka 15, Warszawa</li>
                    <li className="flex items-center"><i className="fa-solid fa-phone mr-3 text-brand-pink"></i> +48 123 456 789</li>
                 </ul>
            </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; getflowweb - 2026 Słodki Kącik.</p>
        </div>
      </footer>

      {/* TOAST CONTAINER */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2">
        {toasts.map(toast => (
          <div key={toast.id} className="bg-white border-l-4 border-brand-pink p-4 shadow-lg rounded flex items-center gap-3 animate-[fadeInUp_0.3s_ease-out]">
            {toast.type === 'success' ? (
              <i className="fa-solid fa-check-circle text-green-500 text-xl"></i>
            ) : (
              <i className="fa-solid fa-info-circle text-blue-500 text-xl"></i>
            )}
            <span className="text-sm text-gray-700 font-medium">{toast.message}</span>
          </div>
        ))}
      </div>

    </div>
  );
}