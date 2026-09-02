import { twMerge } from "tailwind-merge";

function TableRoot({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className="relative w-full overflow-x-auto">
      <table className={twMerge(["w-full text-sm border-collapse", className])}>
        {children}
      </table>
    </div>
  );
}

function TableHeader({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return <thead className={twMerge(["border-b border-primary/30", className])}>{children}</thead>;
}

function TableBody({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <tbody className={twMerge(["[&_tr:last-child]:border-0", className])}>{children}</tbody>
  );
}

function TableFooter({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <tfoot className={twMerge(["border-t border-primary/30 font-medium", className])}>
      {children}
    </tfoot>
  );
}

function TableRow({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <tr className={twMerge(["border-b border-primary/10 hover:bg-primary/5", className])}>
      {children}
    </tr>
  );
}

function TableHead({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <th
      className={twMerge([
        "h-10 px-4 text-left align-middle font-medium text-foreground/70",
        className,
      ])}
    >
      {children}
    </th>
  );
}

function TableCell({
  children,
  className,
  colSpan,
}: React.PropsWithChildren<{ className?: string; colSpan?: number }>) {
  return (
    <td colSpan={colSpan} className={twMerge(["p-4 align-middle", className])}>
      {children}
    </td>
  );
}

function TableCaption({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return <caption className={twMerge(["mt-4 text-sm opacity-70", className])}>{children}</caption>;
}

export {
  TableRoot,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
};
