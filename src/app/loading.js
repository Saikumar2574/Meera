"use client"
import React from 'react';
import { motion } from 'framer-motion';

const loading = () => 
{
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center text-5xl font-bold">
                Meera
                <motion.span
                    className="inline-block"
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                        repeat: Infinity,
                        repeatDelay: 0.5,
                        duration: 0.5
                    }}
                >
                    .
                </motion.span>
                <motion.span
                    className="inline-block"
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                        repeat: Infinity,
                        repeatDelay: 0.7,
                        duration: 0.5
                    }}
                >
                    .
                </motion.span>
                <motion.span
                    className="inline-block"
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                        repeat: Infinity,
                        repeatDelay: 0.9,
                        duration: 0.5
                    }}
                >
                    .
                </motion.span>
            </div>
        </div>
    );
};

export default loading;
