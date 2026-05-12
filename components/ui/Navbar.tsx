'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
    { name: 'Shop', path: '/store' },
    { name: 'About', path: '/about' },
];

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 z-50 w-full">
            {/* Top bar — mix-blend-difference only on this strip, not the overlay */}
            <div className="mix-blend-difference px-6 py-6 md:px-12 flex items-center justify-between">
                <Link href="/" className="font-mono text-sm font-bold uppercase tracking-widest text-white">
                    FrostForge_MD
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex md:gap-x-8">
                    {navItems.map((item, index) => {
                        const isActive = pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={cn(
                                    'text-sm font-medium uppercase tracking-widest transition-opacity hover:opacity-100',
                                    isActive ? 'text-white opacity-100' : 'text-zinc-400 opacity-60'
                                )}
                            >
                                <span className="mr-1 text-[10px] text-zinc-600">0{index + 1}</span>
                                {item.name}
                            </Link>
                        );
                    })}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-white md:hidden"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav Overlay — rendered outside mix-blend-difference so it looks normal */}
            {isOpen && (
                <div className="fixed inset-0 z-40 bg-zinc-950 flex flex-col px-6 pt-24 pb-12 md:hidden">
                    {/* Close strip at top */}
                    <div className="flex flex-col gap-6 mt-4">
                        {navItems.map((item, index) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                onClick={() => setIsOpen(false)}
                                className="group flex items-baseline gap-4 border-b border-zinc-900 pb-6"
                            >
                                <span className="font-mono text-xs text-zinc-700">0{index + 1}</span>
                                <span className="text-3xl font-bold uppercase tracking-widest text-white group-hover:text-zinc-300 transition-colors">
                                    {item.name}
                                </span>
                            </Link>
                        ))}
                    </div>

                    {/* Bottom wordmark */}
                    <div className="mt-auto">
                        <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-700">
                            FrostForge — Frostburg, MD
                        </p>
                    </div>
                </div>
            )}
        </nav>
    );
}
