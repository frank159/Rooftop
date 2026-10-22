import { Ballet } from "@/app/font/ballet";
import { Title } from "@/app/component/TItle/Title";
import { Text } from "@/app/component/Text/Text";
import Vitrine from "@/app/component/vitrine/Vitrine";
import Destaques from "@/app/component/destaques/Destaques";
import Music from "@/app/component/music/Music";

const ballet = Ballet
export default function InfoSection() {
  return (
    <div className="overflow-hidden bg-[#979258] px-5 pt-24 md:py-32">
      <div className="relative py-10 mx-auto flex max-w-5xl flex-col items-center justify-center text-center">
        <span
          aria-hidden
          className={`${ballet.className} pointer-events-none absolute left-1/2 top-1/2 z-0 translate-x-[-5%] translate-y-[-92%] select-none text-[150px] leading-none text-[#8a4a1e] md:translate-x-[15%] md:translate-y-[-67%] md:text-[200px]`}
        >
          E
        </span>

        <div className="relative z-10 flex flex-col items-center">
          <Title as="h1" size="xl" className="text-[#2D0B04]">
            Conheça nosso espaço!
          </Title>
          <Text size="sm" className="mt-4 text-[#2D0B04] md:max-w-2xl">
            A mais de 80 metros do chão, oferecemos coquetelaria autoral, gastronomia
            contemporânea e uma vista panorâmica inesquecível para sua noite.
          </Text>
        </div>
      </div>
      <Vitrine />
      <Destaques />
      <Music />
    </div>
  );
}