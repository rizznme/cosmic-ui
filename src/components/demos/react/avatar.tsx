import { AvatarRoot, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

function AvatarDemo() {
  return (
    <AvatarRoot>
      <AvatarImage src="https://i.pravatar.cc/150?u=cosmic-ui" alt="User avatar" />
      <AvatarFallback>CU</AvatarFallback>
    </AvatarRoot>
  );
}

export { AvatarDemo };
