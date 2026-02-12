'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
    { name: 'Shop', path: '/' },
    { name: 'Gallery', path: '#gallery' },
    { name: 'Custom', path: '/contact' },
];

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 z-50 w-full mix-blend-difference px-6 py-6 md:px-12">
            <div className="mx-auto flex max-w-full items-center justify-between">
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
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            {isOpen && (
                <div className="fixed inset-0 top-16 z-40 bg-zinc-950 p-6 md:hidden">
                    <div className="flex flex-col gap-4">
                        {navItems.map((item, index) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                onClick={() => setIsOpen(false)}
                                className="text-2xl font-bold uppercase tracking-widest text-white"
                            >
                                <span className="mr-4 text-sm text-zinc-600">0{index + 1}</span>
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
