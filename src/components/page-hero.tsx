import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-border bg-primary-soft/50">
      <div className="container-page py-14 md:py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-extrabold text-balance md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">{description}</p>
        {children && <div className="mt-7 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}
