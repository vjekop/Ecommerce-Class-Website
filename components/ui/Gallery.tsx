'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const projects = [
    {
        title: 'Prototype_01',
        image: '/images/jakub-zerdzicki-4WwBMdcq-14-unsplash.jpg',
    },
    {
        title: 'Component_X',
        image: '/images/jakub-zerdzicki-AR8vAAw8kv8-unsplash.jpg',
    },
    {
        title: 'Structure_Y',
        image: '/images/karl-hornfeldt-pikP0UyB7I0-unsplash.jpg',
    },
    {
        title: 'Assembly_Z',
        image: '/images/pawel-spychalski-_15l4YuUq1k-unsplash.jpg',
    },
];

function GalleryItem({ project, index }: { project: { title: string; image: string }, index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

    return (
        <div ref={ref} className="relative w-full mb-0">
            <motion.div
                style={{ scale }}
                className="relative mx-auto w-full aspect-[16/10] md:h-screen md:aspect-auto overflow-hidden"
            >
                <motion.div style={{ y }} className="relative h-[120%] w-full -top-[10%]">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                    />
                </motion.div>
            </motion.div>
        </div>
    );
}

export function Gallery() {
    return (
        <section id="gallery" className="relative px-0 py-24">
            <div className="mb-12 px-6 md:px-12">
                <h2 className="font-mono text-sm uppercase tracking-widest text-zinc-500">
                    Fabrication Gallery
                </h2>
            </div>

            <div className="flex flex-col w-full">
                {projects.map((project, index) => (
                    <GalleryItem key={index} project={project} index={index} />
                ))}
            </div>
        </section>
    );
}
