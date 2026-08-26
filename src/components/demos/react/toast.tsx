import { Button } from "@/components/ui/button";
import { SquareCheck, Rocket } from "lucide-react";
import {
  createToaster,
  Toaster,
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastCloseTrigger,
} from "@/components/ui/toast";

const toaster = createToaster({
  overlap: true,
  placement: "bottom-end",
  offsets: "1.6rem",
  max: 3,
});

function ToastDemo() {
  return (
    <>
      <Button
        onClick={() => {
          toaster.create({
            title: (
              <>
                <SquareCheck className="flex-none size-4 me-2.5" /> Success!
                Event has been created!
              </>
            ),
            description: "This is a toast with icon, title and description.",
            duration: 100000000,
          });
        }}
        className="min-w-30"
        type="submit"
      >
        <Rocket className="size-4 me-2.5" />
        Launch Project
      </Button>
      <Toaster toaster={toaster}>
        {(toast) => (
          <ToastRoot key={toast.id}>
            <ToastTitle>{toast.title}</ToastTitle>
            <ToastDescription>{toast.description}</ToastDescription>
            <ToastCloseTrigger />
          </ToastRoot>
        )}
      </Toaster>
    </>
  );
}

export { ToastDemo };
