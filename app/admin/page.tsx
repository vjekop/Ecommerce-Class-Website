'use client';

import { useState, useEffect } from 'react';
import type { Product } from '@/lib/db';
import { Plus, Trash2, Edit2, Save, X, Lock, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [currentForm, setCurrentForm] = useState<Partial<Product>>({});

  // Hardcoded simple auth for demo purposes
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'frostforge2024') {
      setIsAuthenticated(true);
      fetchProducts();
    } else {
      alert('Incorrect password');
    }
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const res = await fetch(`/api/admin?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchProducts();
      } else {
        const error = await res.json();
        alert('Failed to delete: ' + error.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const method = isEditing ? 'PUT' : 'POST';
    
    try {
      const res = await fetch('/api/admin', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentForm),
      });
      
      if (res.ok) {
        setCurrentForm({});
        setIsEditing(false);
        fetchProducts();
      } else {
        const error = await res.json();
        alert('Failed to save: ' + error.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReSeed = async () => {
    if (!confirm('This will RESET the database to defaults. All custom changes will be lost. Continue?')) return;
    
    setIsLoading(true);
    try {
      const res = await fetch('/api/seed');
      if (res.ok) {
        alert('Database reset to defaults!');
        fetchProducts();
      } else {
        alert('Failed to re-seed.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const openEdit = (product: Product) => {
    setCurrentForm({
      ...product,
      features: Array.isArray(product.features) ? product.features.join(', ') as any : product.features
    });
    setIsEditing(true);
  };

  const openCreate = () => {
    setCurrentForm({
      id: '', name: '', character: '', series: '', price: 0, description: '', image: '/images/', features: [] as any,
      model_path: '/models/berserk.glb', model_scale: 1.0
    });
    setIsEditing(false);
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center p-6">
        <form onSubmit={handleLogin} className="border border-zinc-800 bg-zinc-950 p-12 max-w-sm w-full text-center">
          <Lock className="w-8 h-8 text-zinc-500 mx-auto mb-6" />
          <h1 className="font-mono text-sm uppercase tracking-widest text-white mb-8">Admin Access</h1>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black border border-zinc-800 text-white p-3 mb-4 font-mono text-xs focus:outline-none focus:border-zinc-500"
          />
          <button type="submit" className="w-full bg-white text-black font-mono text-xs font-bold uppercase tracking-widest p-3 hover:bg-zinc-200 transition-colors">
            Unlock Database
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12 lg:p-24 pt-24 md:pt-32">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter uppercase mb-2">Inventory Management</h1>
            <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Connected to Neon PostgreSQL</p>
          </div>
          <div className="flex flex-wrap gap-4">
             <button onClick={() => setIsAuthenticated(false)} className="border border-zinc-800 text-zinc-500 font-mono text-[10px] uppercase tracking-widest px-4 py-2 hover:text-white transition-colors">
              Logout
            </button>
             <button onClick={handleReSeed} className="flex items-center gap-2 border border-red-900/30 text-red-500 font-mono text-[10px] uppercase tracking-widest px-4 py-2 hover:bg-red-950/20 transition-all">
              <RefreshCw className="w-3 h-3" /> Reset Defaults
            </button>
             <Link href="/store" className="border border-zinc-800 text-zinc-400 font-mono text-[10px] uppercase tracking-widest px-4 py-2 hover:text-white transition-colors">
              View Store
            </Link>
            <button onClick={openCreate} className="flex items-center gap-2 bg-white text-black font-mono text-[10px] font-bold uppercase tracking-widest px-4 py-2 hover:bg-zinc-200 transition-colors">
              <Plus className="w-3 h-3" /> Add Product
            </button>
          </div>
        </div>

        {currentForm.id !== undefined && (
          <form onSubmit={handleSave} className="border border-zinc-800 bg-zinc-950 p-6 md:p-8 mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            <button type="button" onClick={() => setCurrentForm({})} className="absolute top-4 right-4 text-zinc-500 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h2 className="md:col-span-2 lg:col-span-3 font-mono text-xs uppercase tracking-widest text-zinc-400 mb-2 border-b border-zinc-800 pb-4">
              {isEditing ? 'Edit Product' : 'Create New Product'}
            </h2>
            
            <div className="space-y-1">
              <label className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">ID (Unique URL slug)</label>
              <input required disabled={isEditing} value={currentForm.id || ''} onChange={e => setCurrentForm({...currentForm, id: e.target.value})} className="w-full bg-black border border-zinc-800 p-2 text-sm focus:border-zinc-500 focus:outline-none disabled:opacity-50" />
            </div>
            
            <div className="space-y-1">
              <label className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Name</label>
              <input required value={currentForm.name || ''} onChange={e => setCurrentForm({...currentForm, name: e.target.value})} className="w-full bg-black border border-zinc-800 p-2 text-sm focus:border-zinc-500 focus:outline-none" />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Character</label>
              <input required value={currentForm.character || ''} onChange={e => setCurrentForm({...currentForm, character: e.target.value})} className="w-full bg-black border border-zinc-800 p-2 text-sm focus:border-zinc-500 focus:outline-none" />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Series</label>
              <input required value={currentForm.series || ''} onChange={e => setCurrentForm({...currentForm, series: e.target.value})} className="w-full bg-black border border-zinc-800 p-2 text-sm focus:border-zinc-500 focus:outline-none" />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Price ($)</label>
              <input required type="number" step="0.01" value={currentForm.price || ''} onChange={e => setCurrentForm({...currentForm, price: parseFloat(e.target.value)})} className="w-full bg-black border border-zinc-800 p-2 text-sm focus:border-zinc-500 focus:outline-none" />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Image URL Path</label>
              <input required value={currentForm.image || ''} onChange={e => setCurrentForm({...currentForm, image: e.target.value})} className="w-full bg-black border border-zinc-800 p-2 text-sm focus:border-zinc-500 focus:outline-none" />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest text-zinc-300">3D Model Path (.glb)</label>
              <input required value={currentForm.model_path || ''} onChange={e => setCurrentForm({...currentForm, model_path: e.target.value})} className="w-full bg-black border border-zinc-700 p-2 text-sm focus:border-white focus:outline-none" placeholder="/models/berserk.glb" />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest text-zinc-300">3D Model Scale</label>
              <input required type="number" step="0.1" value={currentForm.model_scale || 1.0} onChange={e => setCurrentForm({...currentForm, model_scale: parseFloat(e.target.value)})} className="w-full bg-black border border-zinc-700 p-2 text-sm focus:border-white focus:outline-none" />
            </div>

            <div className="md:col-span-2 lg:col-span-1 space-y-1">
              <label className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Features (Comma Separated)</label>
              <input required value={currentForm.features as any || ''} onChange={e => setCurrentForm({...currentForm, features: e.target.value as any})} className="w-full bg-black border border-zinc-800 p-2 text-sm focus:border-zinc-500 focus:outline-none" placeholder="LED Detail, Hand Painted" />
            </div>

            <div className="md:col-span-2 lg:col-span-3 space-y-1">
              <label className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Description</label>
              <textarea required value={currentForm.description || ''} onChange={e => setCurrentForm({...currentForm, description: e.target.value})} className="w-full bg-black border border-zinc-800 p-2 text-sm focus:border-zinc-500 focus:outline-none h-24 resize-none" />
            </div>

            <div className="md:col-span-2 lg:col-span-3 pt-4">
              <button type="submit" className="flex items-center justify-center gap-2 w-full bg-white text-black font-mono text-xs font-bold uppercase tracking-widest p-4 hover:bg-zinc-200 transition-colors">
                <Save className="w-4 h-4" /> Save to Database
              </button>
            </div>
          </form>
        )}

        <div className="border border-zinc-800 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-950">
                <th className="p-4 font-mono text-[10px] uppercase tracking-widest text-zinc-500 font-normal">ID</th>
                <th className="p-4 font-mono text-[10px] uppercase tracking-widest text-zinc-500 font-normal">Name</th>
                <th className="p-4 font-mono text-[10px] uppercase tracking-widest text-zinc-500 font-normal">Price</th>
                <th className="p-4 font-mono text-[10px] uppercase tracking-widest text-zinc-500 font-normal">3D Model</th>
                <th className="p-4 font-mono text-[10px] uppercase tracking-widest text-zinc-500 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={5} className="p-8 text-center text-zinc-500 font-mono text-xs">Loading Database...</td></tr>
              ) : products.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-zinc-500 font-mono text-xs">No products found.</td></tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="border-b border-zinc-900 hover:bg-zinc-950/50 transition-colors">
                    <td className="p-4 font-mono text-xs text-zinc-400">{product.id}</td>
                    <td className="p-4 font-bold">{product.name}</td>
                    <td className="p-4 font-mono text-xs text-zinc-300">${product.price.toFixed(2)}</td>
                    <td className="p-4 font-mono text-[10px] text-zinc-500 truncate max-w-[150px]">{product.model_path}</td>
                    <td className="p-4 flex justify-end gap-2">
                      <button onClick={() => openEdit(product)} className="p-2 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 transition-all bg-black">
                        <Edit2 className="w-3 h-3" />
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="p-2 border border-zinc-800 text-red-500 hover:bg-red-950/30 hover:border-red-900 transition-all bg-black">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
