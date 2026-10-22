// app/component/Button/Button.tsx
import type { ComponentProps, CSSProperties } from "react";
import { Bona_Nova_SC } from "next/font/google";

const bonaNovaSC = Bona_Nova_SC({ subsets: ["latin"], weight: "400" });

type ButtonColors = {
    bg: string;
    text: string;
    border: string;
    hoverBg: string;
    hoverText: string;
    hoverBorder: string;
};

type Variant = "filled" | "outline" | "light";

type ButtonProps = {
    variant?: Variant;
    /** Sobrescreve qualquer cor do preset. Aceita qualquer valor CSS de cor. */
    colors?: Partial<ButtonColors>;
} & (
    | ({ href: string } & Omit<ComponentProps<"a">, "href">)
    | ({ href?: undefined } & ComponentProps<"button">)
);

const PRESETS: Record<Variant, ButtonColors> = {
    // foto 1: fundo oliva, texto e borda marrom escuro
    filled: {
        bg: "#979258",
        text: "#2D0B04",
        border: "#2D0B04",
        hoverBg: "transparent",
        hoverText: "#979258",
        hoverBorder: "#979258",
    },
    // foto 2: transparente, borda e texto marrom
    outline: {
        bg: "transparent",
        text: "#8a4a1e",
        border: "#8a4a1e",
        hoverBg: "#8a4a1e",
        hoverText: "#979258",
        hoverBorder: "#8a4a1e",
    },
    // para fundos escuros (hero)
    light: {
        bg: "transparent",
        text: "#a3a566",
        border: "#a3a566",
        hoverBg: "#a3a566",
        hoverText: "#270600",
        hoverBorder: "#a3a566",
    },
};

const BASE =
    "inline-block border px-4 py-2 text-xs tracking-wide transition-colors duration-300 md:text-sm " +
    "border-[color:var(--btn-border)] bg-[color:var(--btn-bg)] text-[color:var(--btn-text)] " +
    "hover:border-[color:var(--btn-hover-border)] hover:bg-[color:var(--btn-hover-bg)] hover:text-[color:var(--btn-hover-text)]";

export function Button({
    variant = "outline",
    colors,
    className = "",
    style,
    ...props
}: ButtonProps) {
    const c = { ...PRESETS[variant], ...colors };

    const cssVars = {
        "--btn-bg": c.bg,
        "--btn-text": c.text,
        "--btn-border": c.border,
        "--btn-hover-bg": c.hoverBg,
        "--btn-hover-text": c.hoverText,
        "--btn-hover-border": c.hoverBorder,
        ...style,
    } as CSSProperties;

    const classes = `${bonaNovaSC.className} ${BASE} ${className}`;

    if ("href" in props && props.href !== undefined) {
        const { href, ...rest } = props as ComponentProps<"a"> & { href: string };
        const external = /^https?:\/\//.test(href);

        return (
            <a
                href={href}
                className={classes}
                style={cssVars}
                {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                {...rest}
            />
        );
    }

    return (
        <button
            type="button"
            className={classes}
            style={cssVars}
            {...(props as ComponentProps<"button">)}
        />
    );
}