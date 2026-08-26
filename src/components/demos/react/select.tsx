import * as select from "@zag-js/select";
import {
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
} from "@/components/ui/select";

const frameworks = [
  { label: "React", value: "react" },
  { label: "Solid", value: "solid" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
];

const frameworksCollection = select.collection({
  items: frameworks,
  itemToString: (item) => item.label,
  itemToValue: (item) => item.value,
});

function SelectDemo() {
  return (
    <SelectRoot collection={frameworksCollection}>
      <SelectTrigger />
      <SelectContent>
        {frameworks.map((item) => (
          <SelectItem key={item.value} item={item}>
            <SelectItemText>{item.label}</SelectItemText>
            <SelectItemIndicator />
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}

export { SelectDemo };
