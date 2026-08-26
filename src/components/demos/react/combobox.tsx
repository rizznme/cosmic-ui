import * as combobox from "@zag-js/combobox";
import { useState } from "react";
import {
  ComboboxRoot,
  ComboboxInput,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxItemGroup,
  ComboboxItem,
  ComboboxItemText,
  ComboboxItemIndicator,
} from "@/components/ui/combobox";

const frameworks = ["React", "Solid", "Vue", "Svelte"];

function ComboboxDemo() {
  const [state, setState] = useState([""]);
  const [itemsCollection, setItemsCollection] = useState(() =>
    combobox.collection({ items: frameworks })
  );

  const handleInputChange = (details: { inputValue: string }) => {
    const query = details.inputValue.toLowerCase();
    setItemsCollection(
      combobox.collection({
        items: frameworks.filter((item) => item.toLowerCase().includes(query)),
      })
    );
  };

  return (
    <ComboboxRoot
      value={state}
      collection={itemsCollection}
      onInputValueChange={handleInputChange}
      onValueChange={(details) => setState(details.value)}
    >
      <ComboboxTrigger />
      <ComboboxContent>
        <ComboboxInput />
        <ComboboxItemGroup>
          {itemsCollection.items.map((item) => (
            <ComboboxItem key={item} item={item}>
              <ComboboxItemText>{item}</ComboboxItemText>
              <ComboboxItemIndicator />
            </ComboboxItem>
          ))}
        </ComboboxItemGroup>
      </ComboboxContent>
    </ComboboxRoot>
  );
}

export { ComboboxDemo };
