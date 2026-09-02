import {
  DatePickerRoot,
  DatePickerControl,
  DatePickerContent,
  DatePickerCalendar,
} from "@/components/ui/date-picker";

function DaterangepickerDemo() {
  return (
    <DatePickerRoot selectionMode="range">
      <DatePickerControl />
      <DatePickerContent>
        <DatePickerCalendar />
      </DatePickerContent>
    </DatePickerRoot>
  );
}

export { DaterangepickerDemo };
