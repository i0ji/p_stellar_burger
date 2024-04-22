import {motion} from "framer-motion";
import React from "react";

const animationConfiguration = {
    initial: {opacity: 0},
    animate: {opacity: 1},
    exit: {opacity: 0},
};
export default function Transitions({children}: { readonly children: React.ReactNode }) {
    return (
        <motion.div
            animate="animate"
            exit="exit"
            initial="initial"
            transition={{duration: .3}}
            variants={animationConfiguration}
        >
            {children}
        </motion.div>
    );
}