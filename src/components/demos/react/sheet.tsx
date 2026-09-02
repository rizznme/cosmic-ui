import {
  SheetRoot,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetCloseTrigger,
} from "@/components/ui/sheet";
import { PanelRight } from "lucide-react";

function SheetDemo() {
  return (
    <SheetRoot>
      <SheetTrigger>
        <PanelRight className="size-4 me-2.5" /> Open Sheet
      </SheetTrigger>
      <SheetContent>
        <SheetCloseTrigger />
        <SheetTitle>Edit Profile</SheetTitle>
        <SheetDescription>
          Make changes to your profile here. Click save when you're done.
        </SheetDescription>
      </SheetContent>
    </SheetRoot>
  );
}

export { SheetDemo };
