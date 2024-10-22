import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function InfoLevel({ content, onClick }) {
    // Define animation variants for list items
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="p-4 bg-gray-100 rounded-md">
            <ul className="space-y-2">
                <AnimatePresence>
                    {content?.map((item, index) => (
                        <motion.li
                            key={index}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            transition={{ duration: 0.3, delay: index * 0.2 }}
                        >
                            <a
                                onClick={() => onClick(item)}
                                className="text-blue-600 text-sm md:text-base cursor-pointer hover:text-blue-800 hover:underline"
                            >
                                {item}
                            </a>
                        </motion.li>
                    ))}
                </AnimatePresence>
            </ul>
        </div>
    );
}

export default InfoLevel;
