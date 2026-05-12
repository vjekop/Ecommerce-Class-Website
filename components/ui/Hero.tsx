'use client';

import { motion } from 'framer-motion';

export function Hero() {
    return (
        <section className="relative flex min-h-[80vh] flex-col items-start justify-center px-6 md:px-12 lg:px-24 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                className="max-w-5xl"
            >
                <h1 className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-zinc-500 mb-6 md:mb-8">
                    Bespoke 3D Fabrication
                </h1>
                <div className="space-y-1">
                    <p className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white leading-[0.85]">
                        RAPID
                    </p>
                    <p className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-zinc-500 leading-[0.85]">
                        PRECISION
                    </p>
                    <p className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white leading-[0.85]">
                        FORGE
                    </p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="mt-8 md:mt-0 md:absolute md:bottom-12 md:right-6 lg:right-12 md:text-right"
            >
                <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
                    Based in Frostburg, MD<br />
                    Custom Orders Available
                </p>
            </motion.div>
        </section>
    );
}
