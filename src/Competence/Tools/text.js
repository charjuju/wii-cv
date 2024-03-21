import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";


/*
    en gros la ça permet d'avoir deux style un pour quand on voie pas et un qui va progresivement se taper
    ya hidden et visible
*/
export function TapingAnimationText({ text, el: Wrapper = "p", className, once, animation =
    {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.1,
            },
        },
    },
}) {
    const controls = useAnimation();
    const textArray = Array.isArray(text) ? text : [text];
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.5, once });

    useEffect(() => {
        let timeout = 0;

        const show = () => {
            controls.start("visible");
            timeout = setTimeout(async () => {
                await controls.start("hidden");
                controls.start("visible");
            });
        };

        if (isInView) {
            show();
        } else {
            controls.start("hidden");
        }

        return () => clearTimeout(timeout);
    }, [isInView, controls]);

    return (
        <Wrapper className={className}>
            <motion.span ref={ref} initial="hidden" animate={controls} variants={{ visible: { transition: { staggerChildren: 0.1 } }, }}>
                {textArray.map((line, lineIndex) => (
                    <span key={`${line}-${lineIndex}`}>
                        {line.split(" ").map((word, wordIndex) => (
                            <span className="inline-block" key={`${word}-${wordIndex}`}>
                                {word.split("").map((char, charIndex) => (
                                    <motion.span
                                        key={`${char}-${charIndex}`}
                                        className="inline-block"
                                        variants={animation}
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                                <span className="inline-block">&nbsp;</span>
                            </span>
                        ))}
                    </span>
                ))}
            </motion.span>
        </Wrapper>
    );
};

export const AnimationDecente = ({ children }) => {
    const controls = useAnimation();

    const variants = {
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: -40 },
    };

    return (
        <motion.div
            initial="hidden"
            animate={controls}
            variants={variants}
            transition={{ duration: 1.5 }}
            whileInView={{ opacity: 1, y: 0 }}
            onViewportEnter={() => controls.start("visible")}
        >
            {children}
        </motion.div>
    );
};

export const AnimationApparetDeLaDroite = ({ children }) => {
    const controls = useAnimation();

    const variants = {
        visible: { opacity: 1, x: 0 },
        hidden: { opacity: 0, x: "100%" },
    };

    return (
        <motion.div
            initial="hidden"
            animate={controls}
            variants={variants}
            transition={{ duration: 1.5 }}
            whileInView={{ opacity: 1, x: 0 }}
            onViewportEnter={() => controls.start("visible")}
        >
            {children}
        </motion.div>
    );
};

export const AnimationApparetDeLaPasDroite = ({ children }) => {
    const controls = useAnimation();

    const variants = {
        visible: { opacity: 1, x: 0 },
        hidden: { opacity: 0, x: "-100%" },
    };

    return (
        <motion.div
            initial="hidden"
            animate={controls}
            variants={variants}
            transition={{ duration: 1.5 }}
            whileInView={{ opacity: 1, x: 0 }}
            onViewportEnter={() => controls.start("visible")}
        >
            {children}
        </motion.div>
    );
};

export const RotationAnimation = ({ children, style }) => {
    const controls = useAnimation();

    const variants = {
        visible: { opacity: 1, rotate: 0 },
        hidden: { opacity: 0, rotate: -350 },
    };

    return (
        <motion.div
            style={style}
            initial="hidden"
            animate={controls}
            variants={variants}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            onViewportEnter={() => controls.start("visible")}
        >
            {children}
        </motion.div>
    );
};

export const PopAnimation = ({ children, style }) => {
    const controls = useAnimation();

    const variants = {
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0.8 },
    };

    return (
        <motion.div
            style={style}
            initial="hidden"
            animate={controls}
            variants={variants}
            transition={{ type: 'spring', duration: 1 }}
            whileInView={{ opacity: 1, scale: 1 }}
            onViewportEnter={() => controls.start("visible")}
        >
            {children}
        </motion.div>
    );
};

export function TapingAnimationTextRembow({
    text,
    el: Wrapper = "p",
    className,
    once,
    animation = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.1,
            },
        },
    },
}) {
    const controls = useAnimation();
    const textArray = Array.isArray(text) ? text : [text];
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.5, once });

    const [charColors, setCharColors] = useState([]);

    useEffect(() => {
        const rainbowColors = [
            "#ff0000", // rouge
            "#ff7f00", // orange
            "#ffff00", // jaune
            "#00ff00", // vert
            "#0000ff", // bleu
            "#4b0082", // indigo
            "#9400d3", // violet
        ];
        const colors = [];
        for (let i = 0; i < text.length; i++) {
            colors.push(rainbowColors[i % rainbowColors.length]);
        }
        setCharColors(colors);
    }, [text]);

    useEffect(() => {
        let timeout = 0;

        const show = () => {
            controls.start("visible");
            timeout = setTimeout(async () => {
                await controls.start("hidden");
                controls.start("visible");
            });
        };

        if (isInView) {
            show();
        } else {
            controls.start("hidden");
        }

        return () => clearTimeout(timeout);
    }, [isInView, controls]);

    return (
        <Wrapper className={className}>
            <motion.span ref={ref} initial="hidden" animate={controls} variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
                {textArray.map((line, lineIndex) => (
                    <span key={`${line}-${lineIndex}`}>
                        {line.split(" ").map((word, wordIndex) => (
                            <span className="inline-block" key={`${word}-${wordIndex}`}>
                                {word.split("").map((char, charIndex) => (
                                    <motion.span
                                        key={`${char}-${charIndex}`}
                                        className="inline-block"
                                        style={{ color: charColors[charIndex] }}
                                        variants={animation}
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                                <span className="inline-block">&nbsp;</span>
                            </span>
                        ))}
                    </span>
                ))}
            </motion.span>
        </Wrapper>
    );
}