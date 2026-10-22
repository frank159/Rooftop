import { ReactNode } from "react";

type TextProps = {
  children: ReactNode;
  as?: "p" | "span" | "div";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeMap = {
  sm: "text-base",
  md: "text-base md:text-lg",
  lg: "text-lg md:text-xl",
} as const;

export function Text({
  children,
  as: Tag = "p",
  size = "md",
  className = "",
}: TextProps) {
  return (
    <Tag
      className={`font-arima leading-relaxed ${sizeMap[size]} ${className}`}
    >
      {children}
    </Tag>
  );
}