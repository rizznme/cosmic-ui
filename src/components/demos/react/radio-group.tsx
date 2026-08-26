import {
  RadioGroupRoot,
  RadioGroupLabel,
  RadioGroupItem,
  RadioGroupItemText,
  RadioGroupItemControl,
} from "@/components/ui/radio-group";

const items = [
  { id: "apple", label: "Apples" },
  { id: "orange", label: "Oranges" },
  { id: "mango", label: "Mangoes" },
  { id: "grape", label: "Grapes" },
];

function RadioGroupDemo() {
  return (
    <RadioGroupRoot defaultValue="apple">
      <RadioGroupLabel>Airplane Mode</RadioGroupLabel>
      {items.map((opt) => (
        <RadioGroupItem value={opt.id} key={opt.id}>
          <RadioGroupItemText>{opt.label}</RadioGroupItemText>
          <RadioGroupItemControl />
        </RadioGroupItem>
      ))}
    </RadioGroupRoot>
  );
}

export { RadioGroupDemo };
