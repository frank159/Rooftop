"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Bilbo_Swash_Caps } from "next/font/google";
import { motion, useReducedMotion } from "framer-motion";
import { Title } from "@/app/component/TItle/Title";
import { Text } from "@/app/component/Text/Text";
import { Ballet } from "@/app/font/ballet";
import { Button } from "../Button/Button";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const bilboSwashCaps = Bilbo_Swash_Caps({ subsets: ["latin"], weight: "400" });

const COQUETELARIA_IMGS = [
    { src: "/imgs/destaques/drink0.png", alt: "drink 01" },
    { src: "/imgs/destaques/drink1.png", alt: "drink 02" },
    { src: "/imgs/destaques/drink2.png", alt: "drink 03" },
    { src: "/imgs/destaques/drink3.png", alt: "drink 04" },
    { src: "/imgs/destaques/drink4.png", alt: "drink 05" },
];

const GASTRONOMIA_IMGS = [
    { src: "/imgs/destaques/gastro0.png", alt: "gastro 01" },
    { src: "/imgs/destaques/gastro1.png", alt: "gastro 02" },
    { src: "/imgs/destaques/gastro2.png", alt: "gastro 03" },
    { src: "/imgs/destaques/gastro3.png", alt: "gastro 04" },
    { src: "/imgs/destaques/gastro4.png", alt: "gastro 05" },
];

type Slide = { src: string; alt: string };

function ImageCarousel({
    images,
    interval = 5000,
}: {
    images: Slide[];
    interval?: number;
}) {
    const [{ current, prev }, setSlide] = useState({ current: 0, prev: -1 });

    const next = useCallback(
        () =>
            setSlide((s) => ({
                current: (s.current + 1) % images.length,
                prev: s.current,
            })),
        [images.length],
    );

    // Reinicia a cada troca, então um clique também dá o intervalo completo
    useEffect(() => {
        if (images.length < 2) return;
        const id = setTimeout(next, interval);
        return () => clearTimeout(id);
    }, [current, next, interval, images.length]);

    return (
        <div
            role="button"
            tabIndex={0}
            aria-label="Próxima imagem"
            onClick={next}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    next();
                }
            }}
            className="relative aspect-[759/392] w-full max-w-[759px] cursor-pointer select-none overflow-hidden"
        >
            {images.map((img, i) => {
                const isCurrent = i === current;
                const isPrev = i === prev;

                return (
                    <div
                        key={img.src}
                        aria-hidden={!isCurrent}
                        className={`absolute inset-0 transition-[opacity,transform] duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${isCurrent
                                ? "z-20 scale-100 opacity-100"
                                : isPrev
                                    ? "z-10 scale-100 opacity-100"
                                    : "z-0 scale-[1.04] opacity-0"
                            }`}
                    >
                        <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            quality={90}
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 759px"
                            className="object-cover"
                        />
                    </div>
                );
            })}

            <div className="pointer-events-none absolute inset-0 z-30 bg-black/20" />
        </div>
    );
}

function AltaGastronomia() {
    const reduce = useReducedMotion();

    return (
        <div className="flex flex-col md:grid md:grid-cols-2 md:items-start md:gap-12 xl:grid-cols-[1fr_759px] xl:gap-16">
            {/* Foto: vem depois do texto (mobile e desktop) */}
            <motion.div
                className="order-2 -mx-5 flex flex-col items-center gap-3 md:mx-0"
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 1, ease: EASE }}
            >
                <ImageCarousel images={GASTRONOMIA_IMGS} />
            </motion.div>

            {/* Texto */}
            <motion.div
                className="order-1 flex flex-col items-end pb-8 pt-8 text-right md:pb-0 md:pt-0"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
            >
                <div className="relative">
                    <span
                        aria-hidden
                        className={`${Ballet.className} pointer-events-none absolute -left-25 top-0 z-0 select-none text-[150px] leading-none text-[#8a4a1e] md:-left-20 md:-top-14 md:text-[200px] lg:-left-33 lg:-top-9.5`}
                    >
                        A
                    </span>

                    <Title as="h1" className="relative z-10 text-[#2D0B04]">
                        Alta Gastronomia
                    </Title>
                </div>

                <div className="relative z-10 mt-3 max-w-[90%] md:max-w-lg">
                    <Text size="sm" className="text-[#2D0B04]">
                        Nossa cozinha contemporânea une técnicas refinadas a ingredientes
                        selecionados. Nossos pratos são pensados para proporcionar uma
                        verdadeira experiência sensorial.
                    </Text>
                </div>

                <Button
                    href="#cardapio"
                    variant="outline"
                    className="relative z-10 mt-6 px-3 py-2 md:text-sm"
                >
                    Ver cardápio
                </Button>
            </motion.div>
        </div>
    );
}

function Coquetelaria() {
    const reduce = useReducedMotion();

    return (
        <div className="flex flex-col md:grid md:grid-cols-2 md:items-end md:gap-12 xl:grid-cols-[759px_1fr] xl:gap-16 min-[1760px]:-mt-6">
            {/* Foto */}
            <motion.div
                className="order-1 -mx-5 flex flex-col items-center gap-3 md:mx-0"
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 1, ease: EASE }}
            >
                <ImageCarousel images={COQUETELARIA_IMGS} />
            </motion.div>

            {/* Texto */}
            <motion.div
                className="order-2 flex flex-col items-start pt-10 md:pt-0 md:text-left"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
            >
                <div className="relative flex flex-row items-baseline">
                    <span
                        aria-hidden
                        className={`${Ballet.className} pointer-events-none absolute left-31 -top-8 z-20 select-none text-[200px] leading-none text-[#8a4a1e] md:-left-24 md:-top-20 `}
                    >
                        C
                    </span>

                    <Title as="h1" className="relative z-90 text-[#2D0B04]">
                        Coquetelaria
                    </Title>

                    <span
                        className={`relative z-10 hidden md:inline ${bilboSwashCaps.className} text-2xl text-[#8a4a1e]`}
                    >
                        Coquetelaria Premiada!
                    </span>
                </div>

                <div className="relative z-90 mt-3 max-w-md space-y-1 md:max-w-lg">
                    <Text size="sm" className="text-[#2D0B04]">
                        Drinks clássicos, criações autorais exclusivas e contemporâneas
                        feitos pelo nosso bar.
                    </Text>
                    <Text size="sm" className="text-[#2D0B04]">
                        Usamos ingredientes frescos, destilados selecionados e xaropes
                        artesanais feitos na nossa própria casa.
                    </Text>
                </div>
                <Button
                    href="#cardapio"
                    variant="outline"
                    className="relative z-10 mt-6 px-3 py-2 md:text-sm"
                >
                    Ver carta de drinks
                </Button>
            </motion.div>
        </div>
    );
}

export default function Destaques() {
    return (
        <section className="mx-auto flex w-full mt-50 md:mt-30 max-w-[1720px] flex-col justify-center py-16 md:py-24">
            <AltaGastronomia />
            <Coquetelaria />
        </section>
    );
}