import { MenuRoot, MenuTrigger, MenuContent, MenuItem } from "@/components/ui/menu";
import { PenLine, FilePenLine, CopySlash, Eraser, FileUp } from "lucide-react";

function MenuDemo() {
  return (
    <MenuRoot>
      <MenuTrigger className="w-56">
        <PenLine className="size-4 me-2.5" /> Actions
      </MenuTrigger>
      <MenuContent>
        <MenuItem value="edit">
          <FilePenLine className="size-4 me-2.5" /> Edit
        </MenuItem>
        <MenuItem value="duplicate">
          <CopySlash className="size-4 me-2.5" /> Duplicate
        </MenuItem>
        <MenuItem value="delete">
          <Eraser className="size-4 me-2.5" /> Delete
        </MenuItem>
        <MenuItem value="export">
          <FileUp className="size-4 me-2.5" /> Export...
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
}

export { MenuDemo };
