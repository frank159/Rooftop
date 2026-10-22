"use client";

import Image from "next/image";
import { Bilbo_Swash_Caps } from "next/font/google";
import { motion, useReducedMotion } from "framer-motion";
import { Title } from "@/app/component/TItle/Title";
import { Text } from "@/app/component/Text/Text";
import { Ballet } from "@/app/font/ballet";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const bilboSwashCaps = Bilbo_Swash_Caps({ subsets: ["latin"], weight: "400" });

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
                <div className="relative aspect-[759/392] w-full max-w-[759px] overflow-hidden">
                    <Image
                        src="/imgs/alta_gastronomia.png"
                        alt="Prato de atum selado com folhas e legumes"
                        fill
                        quality={90}
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 759px"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                </div>
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

                <a
                    href="#cardapio"
                    className="relative z-10 mt-6 border border-[#8a4a1e] px-3 py-2 font-arima text-xs uppercase tracking-wide text-[#8a4a1e] transition-colors hover:bg-[#8a4a1e] hover:text-[#979258] md:text-sm"
                >
                    Ver cardápio
                </a>
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
                <div className="relative aspect-[759/392] w-full max-w-[759px] overflow-hidden">
                    <Image
                        src="/imgs/coquetelaria.png"
                        alt="Drinks servidos ao lado de uma luminária de cobre"
                        fill
                        quality={90}
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 759px"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                </div>
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
                        className={`${Ballet.className} pointer-events-none absolute left-31 -top-8 z-0 select-none text-[200px] leading-none text-[#8a4a1e] md:-left-24 md:-top-20 `}
                    >
                        C
                    </span>

                    <Title as="h1" className="relative z-10 text-[#2D0B04]">
                        Coquetelaria
                    </Title>

                    <span
                        className={`relative z-10 hidden md:inline ${bilboSwashCaps.className} text-2xl text-[#8a4a1e]`}
                    >
                        Coquetelaria Premiada!
                    </span>
                </div>

                <div className="relative z-10 mt-3 max-w-md space-y-1 md:max-w-lg">
                    <Text size="sm" className="text-[#2D0B04]">
                        Drinks clássicos, criações autorais exclusivas e contemporâneas
                        feitos pelo nosso bar.
                    </Text>
                    <Text size="sm" className="text-[#2D0B04]">
                        Usamos ingredientes frescos, destilados selecionados e xaropes
                        artesanais feitos na nossa própria casa.
                    </Text>
                </div>

                <a
                    href="#cardapio"
                    className="relative z-10 mt-6 border border-[#8a4a1e] px-3 py-2 font-arima text-xs uppercase tracking-wide text-[#8a4a1e] transition-colors hover:bg-[#8a4a1e] hover:text-[#979258] md:text-sm"
                >
                    Ver carta de drinks
                </a>
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