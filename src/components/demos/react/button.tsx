import { Button } from "@/components/ui/button";
import { CheckCircle, LoaderCircle, Trash } from "lucide-react";

function ButtonDemo() {
  return (
    <div className="flex flex-col md:flex-row gap-3">
      <Button variant="destructive" shape="flat">
        <Trash className="size-4 me-2.5" /> Remove
      </Button>
      <Button variant="success">
        <CheckCircle className="size-4 me-2.5" /> Accept
      </Button>
      <Button shape="simple">
        <LoaderCircle className="animate-spin size-4 me-2.5" /> Logging in...
      </Button>
    </div>
  );
}

export { ButtonDemo };
