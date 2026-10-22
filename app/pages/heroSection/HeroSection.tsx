"use client";

import { type ReactNode, useEffect } from "react";
import { Bilbo_Swash_Caps } from "next/font/google";
import { Ballet } from "@/app/font/ballet";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Title } from "@/app/component/TItle/Title";
import { Text } from "@/app/component/Text/Text";
import { Button } from "@/app/component/Button/Button";

const ballet = Ballet

const bilboSwashCaps = Bilbo_Swash_Caps({
    subsets: ["latin"],
    weight: "400",
    display: "swap",
});

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const T = {
    title: 0.25,
    titleStep: 0.1,
    letter: 0.7,
    paragraph: 1.1,
    buttons: 1.35,
    buttonsStep: 0.12,
    note: 1.6,
};

/** Palavra do título: sobe de dentro de uma máscara (overflow hidden). */
function Word({ children, index }: { children: ReactNode; index: number }) {
    const reduce = useReducedMotion();
    return (
        // padding/margem negativa evitam cortar acentos (Ç, Á...) das letras
        <span className="inline-block overflow-hidden align-bottom pt-[0.12em] -mt-[0.12em] pb-[0.15em] -mb-[0.15em]">
            <motion.span
                className="inline-block"
                initial={reduce ? { opacity: 0 } : { y: "115%", rotate: 4, opacity: 0 }}
                animate={{ y: 0, rotate: 0, opacity: 1 }}
                transition={{
                    duration: 0.9,
                    ease: EASE,
                    delay: T.title + index * T.titleStep,
                }}
                style={{ transformOrigin: "0% 100%" }}
            >
                {children}
            </motion.span>
        </span>
    );
}

/** Botão que sobe com leve escala, em cascata. */
/** Envolve o Button com a entrada em cascata + hover/tap do botão antigo. */
function HeroButton({
    children,
    href,
    index,
}: {
    children: ReactNode;
    href: string;
    index: number;
}) {
    const reduce = useReducedMotion();
    return (
        <motion.div
            className="inline-flex"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={reduce ? undefined : { y: -2 }}
            whileTap={reduce ? undefined : { scale: 0.97 }}
            transition={{
                duration: 0.7,
                ease: EASE,
                delay: T.buttons + index * T.buttonsStep,
            }}
        >
            <Button href={href} variant="filled">
                {children}
            </Button>
        </motion.div>
    );
}
export default function HeroSection() {
    const reduce = useReducedMotion();
    const { scrollY } = useScroll();
    const noteY = useTransform(scrollY, [0, 800], [0, 120]);
    const bgY = useTransform(scrollY, [0, 800], [0, 200]);

    useEffect(() => {
        if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }
        window.scrollTo(0, 0);
    }, []);

    return (
        <section
            id="home"
            className="relative flex min-h-svh w-full flex-col justify-start overflow-hidden bg-[#270600] text-white md:justify-center"
        >
            {/* Fundo: zoom out lento + parallax leve no scroll */}
            <motion.div className="absolute inset-0" style={{ y: bgY }}>
                <motion.div
                    className="absolute inset-0 scale-110"
                    initial={reduce ? false : { scale: 1.12 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2, ease: EASE }}
                >
                    {/* Mobile: imagem vertical */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
                        style={{ backgroundImage: "url('/imgs/heroSectionMobile.png')" }}
                    />
                    {/* Desktop: imagem horizontal (adicione em public/imgs) */}
                    <div
                        className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat md:block"
                        style={{ backgroundImage: "url('/imgs/heroSection.png')" }}
                    />
                </motion.div>
            </motion.div>

            <motion.div
                className="absolute inset-0 "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

            {/* Conteúdo */}
            <div className="relative z-10 w-full px-5 pt-40 pb-24 md:px-16 md:py-0 lg:px-32">
                <div className="relative max-w-[18rem] sm:max-w-md md:max-w-3xl">
                    {/* "D" decorativo (Ballet): revelado da esquerda pra direita */}
                    <motion.span
                        aria-hidden
                        className={`${ballet.className} pointer-events-none absolute -top-11 -left-6 z-0 select-none text-[8rem] leading-none text-[#a3a566] md:-top-12 md:left-[20rem] md:text-[12rem] lg:left-[27rem]`}
                        initial={
                            reduce
                                ? { opacity: 0 }
                                : { clipPath: "inset(-80% 100% -80% -40%)", opacity: 0, filter: "blur(6px)" }
                        }
                        animate={
                            reduce
                                ? { opacity: 1 }
                                : { clipPath: "inset(-80% -40% -80% -40%)", opacity: 1, filter: "blur(0px)" }
                        }
                        transition={{ duration: 1.4, ease: "easeOut", delay: T.letter }}
                    >
                        D
                    </motion.span>

                    <div className="relative z-10">
                        <Title as="h1" size="xl" className="text-white">
                            {"Conheça a vista mais bonita da cidade!".split(" ").map((word, i, arr) => (
                                <span key={i}>
                                    <Word index={i}>{word}</Word>
                                    {i < arr.length - 1 ? " " : null}
                                </span>
                            ))}
                        </Title>

                        <motion.div
                            initial={reduce ? { opacity: 0 } : { opacity: 0, x: -28, filter: "blur(8px)" }}
                            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                            transition={{ duration: 1, ease: EASE, delay: T.paragraph }}
                        >
                            <Text
                                size="md"
                                className="mt-4 max-w-xs text-white/90 md:max-w-none md:text-base"
                            >
                                Uma experiência sensorial única no ponto mais alto da cidade.
                            </Text>
                        </motion.div>

                        <div className="mt-6 flex flex-wrap gap-3 md:mt-8">
                            <HeroButton href="#reserva" index={0}>
                                Fazer reserva
                            </HeroButton>
                            <HeroButton href="#cardapio" index={1}>
                                Ver cardápio
                            </HeroButton>
                        </div>
                    </div>
                </div>
            </div>

            {/* Frase manuscrita
          1) externa → parallax no scroll
          2) interna → entrada (fade + revelação) */}
            <motion.div
                style={{ y: noteY }}
                className="absolute bottom-18 -right-10 z-10 w-40 -translate-x-1/2 md:bottom-auto md:left-auto md:right-[8%] md:top-1/2 md:w-48 md:translate-x-0 md:-translate-y-1/2"
            >
                <motion.div
                    className="flex rotate-6 flex-col items-center text-center"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: EASE, delay: T.note }}
                >
                    <motion.svg
                        aria-hidden
                        viewBox="0 0 24 24"
                        className="mb-1 h-4 w-4 fill-[#a3a566]"
                        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 10,
                            delay: T.note + 0.5,
                        }}
                    >
                        <path d="M12 21s-7-4.6-9.3-9C1.1 8.7 3 5 6.6 5c2 0 3.6 1 5.4 3 1.8-2 3.4-3 5.4-3C21 5 22.9 8.7 21.3 12 19 16.4 12 21 12 21z" />
                    </motion.svg>
                    <span className={`${bilboSwashCaps.className} text-base leading-snug text-white/90 md:text-xl`}>
                        A mais de 80 metros<br />
                        do chão!
                    </span>
                </motion.div>
            </motion.div>
        </section>
    );
}