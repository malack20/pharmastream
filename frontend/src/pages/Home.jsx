import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Mic, 
  Upload, 
  ShieldCheck, 
  Truck, 
  ArrowRight, 
  Activity,
  HeartPulse,
  Smartphone
} from 'lucide-react'
import SearchBar from '../components/SearchBar'
import VoiceSearch from '../components/VoiceSearch'
import ProductCard from '../components/ProductCard'
import CategoryFilter from '../components/CategoryFilter'
import { getProducts } from '../api/products'
import { Link } from 'react-router-dom'

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchBar] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [selectedCategory, searchQuery])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const params = {}
      if (selectedCategory !== 'all') {
        params.category = selectedCategory
      }
      if (searchQuery) {
        params.search = searchQuery
      }
      const res = await getProducts(params)
      setProducts(res.data)
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleVoiceTranscript = (transcript) => {
    setSearchBar(transcript)
  }

  const features = [
    {
      icon: <Mic className="text-emerald-600" size={24} />,
      title: "Voice Search",
      description: "Find medicines instantly using just your voice. Advanced clinical term recognition."
    },
    {
      icon: <Upload className="text-emerald-600" size={24} />,
      title: "Digital Prescriptions",
      description: "Securely upload your prescriptions for pharmacist verification and instant fulfillment."
    },
    {
      icon: <Smartphone className="text-emerald-600" size={24} />,
      title: "Mobile Payments",
      description: "Seamless checkout via M-Pesa STK Push and Airtel Money for ultimate convenience."
    },
    {
      icon: <ShieldCheck className="text-emerald-600" size={24} />,
      title: "Verified Pharmacy",
      description: "All medications are sourced from licensed distributors and verified by expert pharmacists."
    }
  ]

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40 bg-gradient-to-br from-emerald-50 via-white to-white">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm tracking-wide uppercase">
                <Activity size={16} />
                Clinical Excellence Meets Technology
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-navy-900 leading-[1.1]">
                Healthcare <br/>
                <span className="text-emerald-600">Reimagined.</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                PharmaStream revolutionizes pharmacy services with AI-powered voice search, 
                secure prescription management, and instant mobile payments. Experience 
                clinical-grade care with modern convenience.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/signup" className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 flex items-center gap-2 group">
                  Start Your Journey
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/upload" className="px-8 py-4 bg-white border-2 border-gray-100 text-navy-800 rounded-2xl font-bold text-lg hover:border-emerald-500 transition-all flex items-center gap-2">
                  <Upload size={20} />
                  Upload Rx
                </Link>
              </div>
              <div className="flex items-center gap-8 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-navy-900">50K+</div>
                  <div className="text-sm text-gray-500">Prescriptions Filled</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-navy-900">24/7</div>
                  <div className="text-sm text-gray-500">Pharmacist Support</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-navy-900">&lt;60min</div>
                  <div className="text-sm text-gray-500">Average Delivery</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2 relative"
            >
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?auto=format&fit=crop&q=80&w=1000" 
                  alt="Modern Pharmacy" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-xl border border-gray-100 z-20 flex items-center gap-4 animate-bounce-slow">
                <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white">
                  <HeartPulse size={24} />
                </div>
                <div>
                  <div className="font-bold text-navy-900">Expert Care</div>
                  <div className="text-sm text-gray-500">Licensed Pharmacists</div>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-navy-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-4xl font-bold text-navy-900">Why Choose PharmaStream?</h2>
            <p className="text-lg text-gray-500">Built for the modern patient, combining convenience with clinical excellence.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.slice(0, 3).map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-gray-50/50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-4xl font-bold text-navy-900">How It Works</h2>
            <p className="text-lg text-gray-500">Four simple steps to get your medications delivered safely and quickly.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: "Upload Prescription",
                description: "Securely upload your doctor's prescription for expert verification.",
                icon: <Upload className="text-emerald-600" size={32} />
              },
              {
                step: 2,
                title: "Search & Select",
                description: "Use voice search or browse our clinical-grade catalog to find your medications.",
                icon: <Search className="text-emerald-600" size={32} />
              },
              {
                step: 3,
                title: "Secure Payment",
                description: "Pay seamlessly with M-Pesa or Airtel Money for instant processing.",
                icon: <Smartphone className="text-emerald-600" size={32} />
              },
              {
                step: 4,
                title: "Fast Delivery",
                description: "Receive your medications at your doorstep within 60 minutes.",
                icon: <Truck className="text-emerald-600" size={32} />
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="text-center space-y-6"
              >
                <div className="relative">
                  <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                    {item.icon}
                  </div>
                  <div className="absolute inset-0 bg-emerald-100 rounded-full scale-110 opacity-50"></div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-navy-900">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.description}</p>
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-emerald-200 transform -translate-x-8"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shopping Section */}
      <section className="py-24 bg-gray-50/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-navy-900">Browse Medications</h2>
              <p className="text-lg text-gray-500">Find exactly what you need with our clinical-grade search.</p>
            </div>
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-80">
                <SearchBar value={searchQuery} onChange={(e) => setSearchBar(e.target.value)} />
              </div>
              <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
              <VoiceSearch onTranscript={handleVoiceTranscript} />
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-pulse">
              {[1, 2, 3, 4].map(id => (
                <div key={id} className="bg-white border border-gray-100 h-[400px] rounded-[2.5rem]"></div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {products.map((product, idx) => (
                <motion.div
                  key={product.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="transition-all duration-300"
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-gray-200">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                <Search size={40} />
              </div>
              <h3 className="text-2xl font-bold text-navy-900 mb-2">No medicines found</h3>
              <p className="text-gray-500 mb-8">We couldn't find anything matching your search criteria.</p>
              <button 
                onClick={() => {setSelectedCategory('all'); setSearchBar('')}}
                className="px-8 py-3 bg-navy-900 text-white rounded-xl font-bold hover:bg-navy-800 transition-all"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Delivery Banner */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-emerald-600 rounded-[3rem] p-12 lg:p-20 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="relative z-10 space-y-6 lg:w-3/5 text-center lg:text-left">
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                Get your medications delivered <br className="hidden lg:block"/> in under 60 minutes.
              </h2>
              <p className="text-emerald-100 text-xl font-medium">
                Our lightning-fast delivery network ensures you never miss a dose.
              </p>
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-4">
                <div className="flex items-center gap-3 text-white font-bold">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/50 flex items-center justify-center">
                    <Truck size={20} />
                  </div>
                  Express Delivery
                </div>
                <div className="flex items-center gap-3 text-white font-bold">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/50 flex items-center justify-center">
                    <ShieldCheck size={20} />
                  </div>
                  Secure Handling
                </div>
              </div>
            </div>
            <div className="lg:w-1/3 flex justify-center relative z-10">
              <Link to="/products" className="px-10 py-5 bg-white text-emerald-600 rounded-2xl font-extrabold text-xl hover:bg-emerald-50 transition-all shadow-2xl">
                Start Shopping Now
              </Link>
            </div>
            {/* Decorative background circles */}
            <div className="absolute -right-20 -top-20 w-96 h-96 bg-emerald-500 rounded-full opacity-50"></div>
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-emerald-700 rounded-full opacity-30"></div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
