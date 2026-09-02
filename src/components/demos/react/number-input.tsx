import {
  NumberInputRoot,
  NumberInputLabel,
  NumberInputControl,
} from "@/components/ui/number-input";

function NumberInputDemo() {
  return (
    <NumberInputRoot defaultValue="1" min={0} max={10}>
      <NumberInputLabel>Quantity</NumberInputLabel>
      <NumberInputControl />
    </NumberInputRoot>
  );
}

export { NumberInputDemo };
