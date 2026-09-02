import {
  AlertDialogRoot,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

function AlertDialogDemo() {
  return (
    <AlertDialogRoot>
      <AlertDialogTrigger>Delete account</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </AlertDialogDescription>
        <div className="flex justify-end gap-2 mt-4">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => console.log("account deleted")}>
            Continue
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialogRoot>
  );
}

export { AlertDialogDemo };
