'use client';

import { motion } from "framer-motion";

export default function UnderConstruction() {
    return (
        <section
            id="under-construction"
            className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 px-6"
        >
            {/* Background graphic */}
            <motion.img
                src="https://plus.unsplash.com/premium_vector-1682304072455-44433ae545ce?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Under Construction"
                className="absolute top-0 left-0 w-full h-full object-cover opacity-10 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                transition={{ duration: 1 }}
            />

            {/* Content */}
            <motion.div
                className="z-10 text-center text-white"
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 80, damping: 12 }}
            >
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-yellow-400 drop-shadow-md">
                    🚧 Under Construction
                </h2>
                <p className="mt-4 text-gray-300 text-lg max-w-xl mx-auto">
                    This section of my portfolio is currently under development. Stay tuned for something awesome!
                </p>
            </motion.div>
        </section>
    );
}
