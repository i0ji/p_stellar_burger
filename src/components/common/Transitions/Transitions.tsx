import {motion} from "framer-motion";
import React from "react";

const animationConfiguration = {
    initial: {opacity: 0},
    animate: {opacity: 1},
    exit: {opacity: 0},
};
export default function Transitions({children}: { children: React.ReactNode }) {
    return (
        <motion.div
            variants={animationConfiguration}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{duration: .3}}
        >
            {children}
        </motion.div>
    );
}