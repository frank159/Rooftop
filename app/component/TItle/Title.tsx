import { ReactNode } from "react";

type TitleProps = {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

const sizeMap = {
  sm: "text-2xl md:text-3xl",
  md: "text-3xl md:text-4xl",
  lg: "text-4xl md:text-5xl",
  xl: "text-5xl md:text-6xl lg:text-7xl",
} as const;

// h1: 48px no mobile, 64px a partir do md
const h1Size = "text-5xl md:text-[64px]";

export function Title({
  children,
  as: Tag = "h2",
  size = "md",
  className = "",
}: TitleProps) {
  const sizeClass = Tag === "h1" ? h1Size : sizeMap[size];

  return (
    <Tag
      className={`font-bebas-neue uppercase tracking-wide leading-none ${sizeClass} ${className}`}
    >
      {children}
    </Tag>
  );
}