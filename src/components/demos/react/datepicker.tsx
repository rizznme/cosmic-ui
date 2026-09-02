import {
  DatePickerRoot,
  DatePickerControl,
  DatePickerContent,
  DatePickerCalendar,
} from "@/components/ui/date-picker";

function DatepickerDemo() {
  return (
    <DatePickerRoot>
      <DatePickerControl />
      <DatePickerContent>
        <DatePickerCalendar />
      </DatePickerContent>
    </DatePickerRoot>
  );
}

export { DatepickerDemo };
