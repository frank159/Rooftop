import Image from "next/image";
import { Ballet } from "@/app/font/ballet";
import { Title } from "@/app/component/TItle/Title";
import { Text } from "@/app/component/Text/Text";

const ballet = Ballet;

// Troque pelo número real do WhatsApp (formato internacional, só dígitos)
const WHATSAPP_URL = "https://wa.me/5541999999999";

export default function Music() {
    return (
        <div className="pb-20 md:pb-0">
            <section className="relative left-1/2 -mt-5 flex w-screen -translate-x-1/2 items-center overflow-hidden bg-[#270600] py-5 md:min-h-[47rem] md:py-0">
                {/* Fundo */}
                <Image
                    src="/imgs/musica.png"
                    alt="Mãos tocando um teclado de piano"
                    fill
                    quality={90}
                    sizes="100vw"
                    className="object-cover object-right md:object-center"
                />
                {/* mais escuro no mobile, mais leve no desktop */}
                <div className="absolute inset-0 bg-black/40 md:bg-black/5" />

                {/* Conteúdo */}
                <div className="relative z-10 mx-auto w-full max-w-[1456px] px-5 md:px-16">
                    <div className="relative max-w-4xl">
                        {/* "M" decorativo */}
                        <span
                            aria-hidden
                            className={`${ballet.className} pointer-events-none absolute -left-4 -top-20 z-0 hidden select-none text-[140px] leading-none text-[#a3a566] md:-left-57 md:-top-15 md:block md:text-[200px]`}
                        >
                            M
                        </span>

                        <div className="relative z-10 flex flex-col items-start">
                            <Title as="h1" className="tracking-wider text-white">
                                Música ao vivo toda semana
                            </Title>

                            {/* texto maior no mobile */}
                            <Text
                                size="sm"
                                className="mt-2 max-w-md text-white/90 md:mt-4"
                            >
                                Desfrute de apresentações com artistas selecionados enquanto aprecia
                                a vista panorâmica. Oferecemos almoços ao som de teclado e jantares
                                à luz de velas com música ao vivo.
                            </Text>
                            

                            <a
                                href="#programacao"
                                className="mt-6 border border-[#a3a566] px-3 py-2 font-serif text-xs tracking-wide text-[#a3a566] transition-colors [font-variant:small-caps] hover:bg-[#a3a566] hover:text-[#270600] md:text-sm"
                            >
                                Ver programação da semana
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* mobile: alinhado à direita | desktop: centralizado */}
            <section className="flex w-full flex-col items-end bg-[#979258] px-0 py-5 text-right md:items-center md:py-36 md:text-center">
                <Title as="h1" className="max-w-5xl tracking-wider text-[#2D0B04]">
                    Vem turistar na melhor vista da cidade!
                </Title>

                <Text
                    size="sm"
                    className="mt-4 w-full max-w-2xl text-[#8a4a1e] md:w-auto"
                >
                    Ficou com alguma dúvida ou quer reservar uma mesa ou espaço?
                    <br /> Nos chame no Whats, ficaremos felizes em te atender.
                </Text>

                <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 border border-[#8a4a1e] px-3 py-2 font-serif text-xs tracking-wide text-[#8a4a1e] transition-colors [font-variant:small-caps] hover:bg-[#8a4a1e] hover:text-[#979258] md:mt-6 md:text-sm"
                >
                    Entrar em contato
                </a>
            </section>
        </div>
    );
}