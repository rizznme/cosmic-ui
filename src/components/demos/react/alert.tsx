import {
  AlertRoot,
  AlertTitle,
  AlertDescription,
  AlertCloseTrigger,
} from "@/components/ui/alert";
import { SquareCheck } from "lucide-react";

function AlertDemo() {
  return (
    <AlertRoot>
      <AlertTitle>
        <SquareCheck className="flex-none size-4.5 me-2.5" /> Success! Your
        changes have been saved
      </AlertTitle>
      <AlertDescription>
        This is an alert with icon, title and description.
      </AlertDescription>
      <AlertCloseTrigger />
    </AlertRoot>
  );
}

export { AlertDemo };
