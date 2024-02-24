import React, {useState} from "react";
import styles from "./Fade.module.scss"

export default function Fade({show, children}: {
    show: boolean,
    children: React.ReactNode
}) {
    const [shouldRender, setRender] = useState(show);

    // Use CSS animations based on the 'show' prop
    return shouldRender ? (
        <div
            style={{
                animation: `${show ? styles.fadeIn : styles.fadeOut} 1s`,
            }}
            onAnimationEnd={() => {
                if (!show) setRender(false);
            }}
        >
            {children}
        </div>
    ) : null;
}