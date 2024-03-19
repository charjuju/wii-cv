import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";


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