import { SwitchRoot, SwitchControl, SwitchLabel } from "@/components/ui/switch";

function SwitchDemo() {
  return (
    <SwitchRoot>
      <SwitchControl />
      <SwitchLabel>Airplane Mode</SwitchLabel>
    </SwitchRoot>
  );
}

export { SwitchDemo };
