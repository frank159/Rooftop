"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";

const links = [
    { label: "HOME", href: "#home" },
    { label: "SOBRE NÓS", href: "#sobre" },
    { label: "COZINHA & COQUETELARIA", href: "#cozinha" },
    { label: "MÚSICA", href: "#musica" },
    { label: "CONTATO", href: "#contato" },
];

const focus =
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#989258]";

const SCROLLED_HEIGHT = 72;

const layoutTransition = { duration: 0.35, ease: "easeInOut" } as const;

const MotionLink = motion.create(Link);

const menuVariants = {
    closed: {
        height: 0,
        opacity: 0,
        transition: { duration: 0.35, ease: "easeInOut" },
    },
    open: {
        height: "auto",
        opacity: 1,
        transition: {
            duration: 0.4,
            ease: "easeInOut",
            staggerChildren: 0.07,
            delayChildren: 0.15,
        },
    },
} satisfies Variants;

const itemVariants = {
    closed: { y: -16, opacity: 0 },
    open: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 300, damping: 24 },
    },
} satisfies Variants;

export default function Header() {
    const [open, setOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const headerRef = useRef<HTMLElement>(null);
    const scrollRaf = useRef<number | null>(null);

    const cancelScrollAnimation = () => {
        if (scrollRaf.current !== null) {
            cancelAnimationFrame(scrollRaf.current);
            scrollRaf.current = null;
        }
    };

    useEffect(() => {
        window.addEventListener("wheel", cancelScrollAnimation, { passive: true });
        window.addEventListener("touchstart", cancelScrollAnimation, { passive: true });
        return () => {
            window.removeEventListener("wheel", cancelScrollAnimation);
            window.removeEventListener("touchstart", cancelScrollAnimation);
            cancelScrollAnimation();
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!open) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [open]);

    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1200px)");
        const onChange = (e: MediaQueryListEvent) => {
            if (e.matches) setOpen(false);
        };
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, []);

    const closeMenu = () => setOpen(false);

    const animateScrollTo = (rawTop: number) => {
        cancelScrollAnimation();

        const maxTop = Math.max(
            0,
            document.documentElement.scrollHeight - window.innerHeight
        );
        const targetTop = Math.min(Math.max(0, rawTop), maxTop);
        const startTop = window.scrollY;
        const distance = targetTop - startTop;
        if (Math.abs(distance) < 1) return;

        const duration = Math.min(900, Math.max(400, Math.abs(distance) * 0.5));
        let startTime: number | null = null;
        const ease = (t: number) =>
            t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        const step = (now: number) => {
            startTime ??= now;
            const t = Math.min(1, (now - startTime) / duration);
            window.scrollTo({
                top: startTop + distance * ease(t),
                left: 0,
                behavior: "instant" as ScrollBehavior,
            });
            scrollRaf.current = t < 1 ? requestAnimationFrame(step) : null;
        };
        scrollRaf.current = requestAnimationFrame(step);
    };

    const scrollToTarget = (targetId: string) => {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                if (targetId === "home") {
                    animateScrollTo(0);
                    return;
                }

                const elem = document.getElementById(targetId);
                if (!elem) {
                    console.warn(`[Header] Elemento #${targetId} não encontrado na página.`);
                    return;
                }

                const top =
                    elem.getBoundingClientRect().top +
                    window.scrollY -
                    SCROLLED_HEIGHT;
                animateScrollTo(top);
            });
        });
    };

    const handleNavClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string
    ) => {
        e.preventDefault();
        const targetId = href.replace("#", "");

        closeMenu();
        scrollToTarget(targetId);
    };

    const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (window.location.pathname === "/") {
            e.preventDefault();
            scrollToTarget("home");
        }
        closeMenu();
    };

    const desktopLinkEffect =
        "relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#989258] after:transition-transform after:duration-300 hover:after:scale-x-100";

    return (
        <>
            {/* Camada com blur atrás do menu mobile.
                Fica FORA do header de propósito: o backdrop-filter do header
                viraria o "containing block" de um elemento fixed filho. */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        aria-hidden="true"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        onClick={closeMenu}
                        className="fixed inset-0 z-40 bg-[#2d0c05]/75 backdrop-blur-xl min-[1200px]:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Header com altura explícita nos dois estados e items-center,
                para logo e menu/botões ficarem sempre centralizados na vertical. */}
            <motion.header
                ref={headerRef}
                layout
                layoutRoot
                transition={layoutTransition}
                className={`fixed left-0 top-0 z-50 box-border flex w-full items-center justify-between pl-[clamp(20px,1.98vw,38px)] pr-5 transition-[backdrop-filter] duration-300 ease-in-out min-[1200px]:pr-[clamp(24px,5.47vw,105px)] ${isScrolled
                    ? "h-[72px]"
                    : "h-[64px] min-[1200px]:h-[88px]"
                    } ${isScrolled && !open
                        ? "backdrop-blur-md"
                        : "backdrop-blur-[0px]"
                    }`}
            >
                <MotionLink
                    href="/"
                    onClick={handleLogoClick}
                    layout="position"
                    animate={{ scale: isScrolled ? 0.7 : 1 }}
                    style={{ originX: 0, originY: 0.5 }}
                    transition={layoutTransition}
                    className={`font-[family-name:var(--font-allison)] ${focus} mr-auto whitespace-nowrap text-[length:clamp(44px,12vw,64px)] leading-none text-white no-underline transition-colors duration-300 hover:text-[#e3dd8c] min-[1200px]:text-[60px]`}
                >
                    Zênite Rooftop
                </MotionLink>

                <motion.button
                    type="button"
                    layout="position"
                    transition={layoutTransition}
                    className={`${focus} group relative flex h-11 w-11 cursor-pointer flex-col justify-center gap-1.5 border-0 bg-transparent p-2 min-[1200px]:hidden`}
                    style={{ WebkitTapHighlightColor: "transparent" }}
                    aria-label={open ? "Fechar menu" : "Abrir menu"}
                    aria-expanded={open}
                    aria-controls="menu-principal"
                    onClick={() => setOpen(!open)}
                >
                    <motion.span
                        className="block h-0.5 w-full bg-white transition-colors duration-300 group-hover:bg-[#989258]"
                        animate={{ rotate: open ? 45 : 0, y: open ? 8 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                    <motion.span
                        className="block h-0.5 w-full bg-white transition-colors duration-300 group-hover:bg-[#989258]"
                        animate={{ opacity: open ? 0 : 1, scaleX: open ? 0.4 : 1 }}
                        transition={{ duration: 0.2 }}
                    />
                    <motion.span
                        className="block h-0.5 w-full bg-white transition-colors duration-300 group-hover:bg-[#989258]"
                        animate={{ rotate: open ? -45 : 0, y: open ? -8 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                </motion.button>

                <AnimatePresence>
                    {open && (
                        <motion.div
                            id="menu-principal"
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={menuVariants}
                            className="absolute inset-x-0 top-full max-h-[80dvh] overflow-y-auto min-[1200px]:hidden"
                        >
                            <nav
                                aria-label="Menu mobile"
                                className="flex flex-col px-5 pb-6 pt-2 font-[family-name:var(--font-arima)]"
                            >
                                {links.map((link) => (
                                    <motion.div
                                        key={link.href}
                                        variants={itemVariants}
                                        className="border-b border-[#989258]/20 last:border-b-0"
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={(e) => handleNavClick(e, link.href)}
                                            className={`${focus} group flex w-full items-center justify-between py-4 text-[18px] leading-none tracking-[0.06em] text-white no-underline transition-colors duration-300 hover:text-[#989258] active:text-[#989258]`}
                                        >
                                            <span className="transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-1">
                                                {link.label}
                                            </span>
                                            <svg
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={1.5}
                                                className="h-4 w-4 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-active:translate-x-0 group-active:opacity-100"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M5 12h14M13 6l6 6-6 6"
                                                />
                                            </svg>
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.nav
                    aria-label="Principal"
                    layout="position"
                    transition={layoutTransition}
                    className="hidden font-[family-name:var(--font-arima)] min-[1200px]:flex min-[1200px]:flex-row min-[1200px]:gap-[clamp(24px,4.1667vw,80px)]"
                >
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className={`${focus} ${desktopLinkEffect} whitespace-nowrap text-[16px] leading-none text-white no-underline transition-colors duration-300 hover:text-[#989258]`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </motion.nav>

                <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[#989258]/20 transition-opacity duration-300 ${isScrolled || open ? "opacity-100" : "opacity-0"
                        }`}
                />
            </motion.header>
        </>
    );
}