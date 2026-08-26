import { TabsRoot, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const data = [
  { value: "item-1", label: "Item one", content: "Item one content" },
  { value: "item-2", label: "Item two", content: "Item two content" },
  { value: "item-3", label: "Item three", content: "Item three content" },
];

function TabsDemo() {
  return (
    <TabsRoot defaultValue={data[0].value}>
      <TabsList>
        {data.map((item) => (
          <TabsTrigger key={item.value} value={item.value}>
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {data.map((item) => (
        <TabsContent className="xl:w-150" key={item.value} value={item.value}>
          {item.content}
        </TabsContent>
      ))}
    </TabsRoot>
  );
}

export { TabsDemo };
