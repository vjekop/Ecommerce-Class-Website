'use client';

import { motion } from 'framer-motion';

export function Hero() {
    return (
        <section className="relative flex min-h-[80vh] flex-col items-start justify-center px-6 md:px-12 lg:px-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                className="max-w-5xl"
            >
                <h1 className="font-mono text-sm uppercase tracking-widest text-zinc-500 mb-8">
                    Bespoke 3D Fabrication
                </h1>
                <div className="space-y-2">
                    <h2 className="text-6xl font-bold tracking-tighter text-white md:text-8xl lg:text-9xl leading-[0.85]">
                        RAPID
                    </h2>
                    <h2 className="text-6xl font-bold tracking-tighter text-zinc-500 md:text-8xl lg:text-9xl leading-[0.85]">
                        PRECISION
                    </h2>
                    <h2 className="text-6xl font-bold tracking-tighter text-white md:text-8xl lg:text-9xl leading-[0.85]">
                        FORGE
                    </h2>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute bottom-12 right-6 md:right-12 text-right"
            >
                <p className="font-mono text-xs text-zinc-600 uppercase tracking-widest">
                    Based in Frostburg, MD<br />
                    Custom Orders Available
                </p>
            </motion.div>
        </section>
    );
}
