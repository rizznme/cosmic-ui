import { ChevronRight } from "lucide-react";
import { twMerge } from "tailwind-merge";

function BreadcrumbRoot({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <nav aria-label="breadcrumb" className={className}>
      {children}
    </nav>
  );
}

function BreadcrumbList({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <ol className={twMerge(["flex flex-wrap items-center gap-2 text-sm", className])}>
      {children}
    </ol>
  );
}

function BreadcrumbItem({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return <li className={twMerge(["flex items-center gap-2", className])}>{children}</li>;
}

function BreadcrumbLink({
  href,
  children,
  className,
}: React.PropsWithChildren<{ href: string; className?: string }>) {
  return (
    <a href={href} className={twMerge(["text-foreground/50 hover:text-foreground", className])}>
      {children}
    </a>
  );
}

function BreadcrumbPage({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <span aria-current="page" className={twMerge(["text-foreground", className])}>
      {children}
    </span>
  );
}

function BreadcrumbSeparator({ className }: { className?: string }) {
  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={twMerge(["text-foreground/30", className])}
    >
      <ChevronRight className="size-3.5" />
    </li>
  );
}

export {
  BreadcrumbRoot,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
