import { createContext, useContext, useId } from "react";
import { twMerge } from "tailwind-merge";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, X } from "lucide-react";
import { useMachine, normalizeProps } from "@zag-js/react";
import * as datePickerMachine from "@zag-js/date-picker";
import { Portal } from "@/components/ui/portal";

const DatePickerContext = createContext<ReturnType<typeof datePickerMachine.connect> | null>(
  null
);

function useDatePickerContext() {
  const api = useContext(DatePickerContext);
  if (!api) throw new Error("DatePicker parts must be used within <DatePickerRoot>");
  return api;
}

function DatePickerRoot({
  children,
  ...rest
}: React.PropsWithChildren<Partial<datePickerMachine.Props>>) {
  const service = useMachine(datePickerMachine.machine, { id: useId(), ...rest });
  const api = datePickerMachine.connect(service, normalizeProps);

  return <DatePickerContext.Provider value={api}>{children}</DatePickerContext.Provider>;
}

// The input+trigger row used by the popover variants (Datepicker,
// Daterangepicker). A plain inline <DatePickerCalendar> (Calendar) has no
// use for this - there's no text value to type or popover to open.
function DatePickerControl({ className }: { className?: string }) {
  const api = useDatePickerContext();

  return (
    <div
      {...api.getControlProps()}
      className={twMerge([
        "flex items-center gap-2 border border-primary/30 bg-primary/10 px-3 py-2 w-fit",
        className,
      ])}
    >
      <input
        {...api.getInputProps({ index: 0 })}
        placeholder="Pick a date"
        className="outline-none bg-transparent w-28"
      />
      {api.selectionMode === "range" && (
        <>
          <span className="opacity-50">-</span>
          <input
            {...api.getInputProps({ index: 1 })}
            placeholder="Pick a date"
            className="outline-none bg-transparent w-28"
          />
        </>
      )}
      <button
        {...api.getClearTriggerProps()}
        className="opacity-70 hover:opacity-100 cursor-pointer"
      >
        <X className="size-3.5" />
      </button>
      <button
        {...api.getTriggerProps()}
        className="opacity-70 hover:opacity-100 cursor-pointer"
      >
        <CalendarIcon className="size-4" />
      </button>
    </div>
  );
}

// Wraps <DatePickerCalendar> in a floating popover. getContentProps() already
// manages its own `hidden` state, so unlike Dialog/Combobox this doesn't need
// a separate presence hook for an exit animation.
function DatePickerContent({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  const api = useDatePickerContext();
  const positionerProps = api.getPositionerProps();

  return (
    <Portal>
      <div {...positionerProps} style={{ ...positionerProps.style, zIndex: 70 }}>
        <div
          {...api.getContentProps()}
          className={twMerge(["border border-primary/30 bg-background outline-none", className])}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
}

// The day grid, with a prev/next month header. This is the one part shared
// verbatim across Calendar (rendered inline, no popover), Datepicker (single
// selection, inside a popover), and Daterangepicker (range selection, inside
// a popover) - only the selectionMode/inline props passed to DatePickerRoot
// differ between the three.
//
// Scoped to the day view only: Zag's machine also supports drilling into
// month/year picker views (view/minView/maxView, getMonthsGrid, etc.), left
// out here to keep this placeholder implementation a manageable size.
function DatePickerCalendar({ className }: { className?: string }) {
  const api = useDatePickerContext();

  return (
    <div className={twMerge(["p-3", className])}>
      <div className="flex items-center justify-between mb-3">
        <button
          {...api.getPrevTriggerProps()}
          className="p-1 hover:bg-primary/10 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
        >
          <ChevronLeft className="size-4" />
        </button>
        <span className="font-medium">{api.visibleRangeText.formatted}</span>
        <button
          {...api.getNextTriggerProps()}
          className="p-1 hover:bg-primary/10 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
      <table {...api.getTableProps({ view: "day" })} className="border-collapse">
        <thead {...api.getTableHeadProps()}>
          <tr {...api.getTableRowProps()}>
            {api.weekDays.map((day, i) => (
              <th key={i} scope="col" className="text-xs opacity-50 font-normal pb-2 size-8">
                {day.narrow}
              </th>
            ))}
          </tr>
        </thead>
        <tbody {...api.getTableBodyProps()}>
          {api.weeks.map((week, i) => (
            <tr key={i} {...api.getTableRowProps()}>
              {week.map((value, j) => (
                <td key={j} {...api.getDayTableCellProps({ value })} className="text-center p-0.5">
                  <div
                    {...api.getDayTableCellTriggerProps({ value })}
                    className={twMerge([
                      "size-8 flex items-center justify-center cursor-pointer border border-transparent hover:border-primary/30",
                      "data-[selected]:bg-primary/20 data-[selected]:border-primary",
                      "data-[today]:border-primary/50",
                      "data-[in-range]:bg-primary/10",
                      "data-[outside-range]:opacity-30",
                      "data-[unavailable]:opacity-20 data-[unavailable]:pointer-events-none",
                      "data-[disabled]:opacity-20 data-[disabled]:pointer-events-none",
                    ])}
                  >
                    {value.day}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { DatePickerRoot, DatePickerControl, DatePickerContent, DatePickerCalendar };
