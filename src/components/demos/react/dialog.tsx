import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogCloseTrigger,
} from "@/components/ui/dialog";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileUp, Unplug } from "lucide-react";

function DialogDemo() {
  return (
    <DialogRoot>
      <DialogTrigger>
        <FileUp className="size-4 me-2.5" /> Dialog
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
        <div className="py-5 flex flex-col gap-4">
          <Input type="text" placeholder="Email" />
          <Input type="password" placeholder="Password" />
        </div>
        <div className="flex flex-col sm:flex-row gap-y-3 justify-end mt-3 pb-2">
          <DialogCloseTrigger asChild>
            <Button variant="secondary" className="min-w-30">
              <Unplug className="size-4 me-2.5" />
              Cancel
            </Button>
          </DialogCloseTrigger>
          <Button className="min-w-30" type="submit">
            <Save className="size-4 me-2.5" />
            Save changes
          </Button>
        </div>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}

export { DialogDemo };
