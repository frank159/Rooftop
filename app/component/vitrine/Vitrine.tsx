"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Title } from "@/app/component/TItle/Title";
import { Text } from "@/app/component/Text/Text";
import { Button } from "../Button/Button";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Space = {
    id: string;
    tab: string;
    title: string;
    description: string[];
    buttonLabel: string;
    buttonHref: string;
    image: string;
    alt: string;
    caption?: string;
};

const spaces: Space[] = [
    {
        id: "bar",
        tab: "Bar",
        title: "Bar",
        description: [
            "Nosso bar, além de clássico e elegante, conta com uma das vistas mais lindas e românticas da cidade.",
            "É o ponto de encontro perfeito para iniciar a noite ou celebrar momentos especiais.",
        ],
        buttonLabel: "Ver carta de drinks",
        buttonHref: "#cardapio",
        image: "/imgs/vitrini/bar.png",
        alt: "Balcão do bar com banquetas e garrafas iluminadas",
    },
    {
        id: "terraco",
        tab: "Terraço Open Air",
        title: "Terraço Open Air",
        description: [
            "Um lounge ao ar livre projetado para você apreciar o horizonte do melhor ângulo. Desfrute da nossa coquetelaria autoral em um ambiente charmoso, cercado por vegetação e uma vista panorâmica de tirar o fôlego.",
        ],
        buttonLabel: "Fazer reserva",
        buttonHref: "#reserva",
        image: "/imgs/vitrini/TERRAÇO_OPEN_AIR.png",
        alt: "Terraço ao ar livre com sofás e vista da cidade",
    },
    {
        id: "salao",
        tab: "Salão Panorâmico",
        title: "Salão Panorâmico",
        description: [
            "Mesas estrategicamente posicionadas para garantir a melhor vista da cidade.",
            "Almoço de terça a sábado com som de teclado ao vivo todos os dias.",
        ],
        buttonLabel: "Fazer reserva",
        buttonHref: "#reserva",
        image: "/imgs/vitrini/SALÃO_PANORÂMICO.png",
        alt: "Mesa posta no salão com janelas panorâmicas",
    },
    {
        id: "eventos",
        tab: "Eventos Zênite",
        title: "Eventos Zênite",
        description: [
            "Aniversários, casamentos, jantares corporativos, festas privadas, oferecemos um espaço exclusivo com estrutura completa, alta gastronomia e uma vista única no ponto mais alto da cidade.",
        ],
        buttonLabel: "Fazer reserva",
        buttonHref: "#reserva",
        image: "/imgs/vitrini/eventos_ZÊNITE.png",
        alt: "Silhuetas de convidados diante das janelas ao pôr do sol",
    },
];

/** Conteúdo de texto de um espaço (usado no texto visível e no "medidor" invisível). */
function SpaceContent({ space }: { space: Space }) {
    return (
        <div className="flex flex-col items-start">
            <Title as="h1" size="lg" className="text-[#2D0B04]">
                {space.title}
            </Title>

            <div className="mt-2 max-w-md space-y-1 md:mt-3">
                {space.description.map((line) => (
                    <Text key={line} size="sm" className="text-[#2D0B04]">
                        {line}
                    </Text>
                ))}
            </div>

            <Button href={space.buttonHref} variant="outline" className="mt-4 md:mt-6">
                {space.buttonLabel}
            </Button>
        </div>
    );
}

export default function Vitrine() {
    const [activeId, setActiveId] = useState(spaces[0].id);
    const reduce = useReducedMotion();
    const active = spaces.find((s) => s.id === activeId) ?? spaces[0];
    return (
        <section className="flex h-svh w-full snap-center flex-col bg-[#979258] py-4 md:block md:h-auto md:py-10">
            <div className="flex min-h-0 flex-1 flex-col gap-4 md:grid md:grid-cols-[1.9fr_1fr] md:gap-0">
                <div className="relative ml-[calc(50%-50vw)] min-h-[22svh] w-screen flex-1 overflow-hidden md:ml-0 md:aspect-[2.14/1] md:min-h-0 md:w-full md:flex-none md:self-center">
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={active.id}
                            className="absolute inset-0"
                            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.06 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8, ease: EASE }}
                        >
                            <Image
                                src={encodeURI(active.image)}
                                alt={active.alt}
                                fill
                                priority
                                quality={90}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 66vw"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/30" />
                            {active.caption && (
                                <span className="absolute bottom-3 right-4 font-script text-sm italic text-[#c9a46a] md:bottom-6 md:right-8 md:text-2xl">
                                    {active.caption}
                                </span>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Texto + abas */}
                <div className="flex shrink-0 flex-col justify-between gap-4 border-t border-[#8a4a1e] px-0 pt-3 md:relative md:ml-5 md:gap-5 md:border-t-0 md:px-4 md:py-4 md:pt-0 md:before:absolute md:before:-bottom-4 md:before:-top-4 md:before:left-0 md:before:w-[1px] md:before:bg-[#8a4a1e] md:before:content-['']">
                    {/* Altura reservada = a do MAIOR texto naquela largura de tela.
                        Os 4 textos ficam empilhados e invisíveis só para "medir";
                        o texto animado fica por cima (absolute). Assim a animação
                        original continua igual e o tamanho do componente nunca muda. */}
                    <div className="relative">
                        <div className="grid" aria-hidden inert>
                            {spaces.map((space) => (
                                <div
                                    key={space.id}
                                    className="invisible col-start-1 row-start-1"
                                >
                                    <SpaceContent space={space} />
                                </div>
                            ))}
                        </div>

                        <div className="absolute inset-0">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={active.id}
                                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.45, ease: EASE }}
                                >
                                    <SpaceContent space={active} />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Abas */}
                    <div role="tablist" aria-label="Espaços" className="flex flex-col md:max-w-xs">
                        {spaces.map((space) => {
                            const isActive = space.id === activeId;
                            return (
                                <button
                                    key={space.id}
                                    type="button"
                                    role="tab"
                                    aria-selected={isActive}
                                    onClick={() => setActiveId(space.id)}
                                    className={`cursor-pointer border-b border-white/25 py-0 text-end font-bebas-neue text-[40px] uppercase tracking-wide transition-colors duration-300 md:py-1 md:text-left md:text-[48px] md:leading-[1.2] ${isActive
                                        ? "text-[#e3dd8c]"
                                        : "text-[#bdb87a] hover:text-[#d6d085]"
                                        }`}
                                >
                                    {space.tab}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}