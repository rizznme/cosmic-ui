import { useContext } from "react";
import { twMerge } from "tailwind-merge";
import { NavLink } from "react-router";
import { MobileMenuContext } from "../App";
import { X } from "lucide-react";

function Main() {
  const { showMenu, setShowMenu } = useContext(MobileMenuContext);

  return (
    <div
      className={twMerge([
        "before:fixed before:absolute before:w-screen before:left-0 before:top-0 before:h-screen before:bg-background/5 before:backdrop-blur before:z-[-1]",
        "after:fixed after:absolute after:inset-0 after:bg-background/80 after:border-r after:border-primary/30 lg:after:backdrop-none after:z-[-1]",
        "top-0 left-0 fixed flex flex-col gap-10 text-foreground/50 w-70 lg:w-65 lg:top-30 bottom-0  z-60 -ml-[100%] transition-[margin] lg:left-auto lg:ml-0 before:hidden after:hidden [&.active]:ml-0 [&.active]:after:block [&.active]:before:block [&.active]:lg:before:hidden [&.active]:lg:after:hidden",
        showMenu && "active",
      ])}
    >
      <div
        className="overflow-y-auto overflow-x-hidden max-h-screen pb-3 pt-1 pl-10 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-primary/30 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent flex flex-col gap-6"
      >
        <div
          onClick={() => setShowMenu(false)}
          className="absolute top-0 right-0 -mr-14 mt-8 cursor-pointer text-foreground lg:hidden"
        >
          <X className="size-6" />
        </div>
        <div className="flex flex-col">
          <div className="font-medium text-foreground mb-2">Getting Started</div>
          <NavLink
            onClick={() => setShowMenu(false)}
            to="/docs"
            className={({ isActive }) =>
              twMerge([
                "hover:text-foreground py-1",
                isActive && "text-foreground",
              ])
            }
            end
          >
            Introduction
          </NavLink>
          <NavLink
            onClick={() => setShowMenu(false)}
            to="/docs/how-to-use"
            className={({ isActive }) =>
              twMerge([
                "hover:text-foreground py-1",
                isActive && "text-foreground",
              ])
            }
          >
            How to Use
          </NavLink>
        </div>
        <div className="flex flex-col">
          <div className="font-medium text-foreground mb-2">Components</div>
          <NavLink
            onClick={() => setShowMenu(false)}
            to="/docs/frame"
            className={({ isActive }) =>
              twMerge([
                "hover:text-foreground py-1",
                isActive && "text-foreground",
              ])
            }
          >
            Frame
          </NavLink>
          <NavLink
            onClick={() => setShowMenu(false)}
            to="/docs/menu"
            className={({ isActive }) =>
              twMerge([
                "hover:text-foreground py-1",
                isActive && "text-foreground",
              ])
            }
          >
            Menu
          </NavLink>
          <NavLink
            onClick={() => setShowMenu(false)}
            to="/docs/alert"
            className={({ isActive }) =>
              twMerge([
                "hover:text-foreground py-1",
                isActive && "text-foreground",
              ])
            }
          >
            Alert
          </NavLink>
          <NavLink
            onClick={() => setShowMenu(false)}
            to="/docs/accordion"
            className={({ isActive }) =>
              twMerge([
                "hover:text-foreground py-1",
                isActive && "text-foreground",
              ])
            }
          >
            Accordion
          </NavLink>
          <NavLink
            onClick={() => setShowMenu(false)}
            to="/docs/dialog"
            className={({ isActive }) =>
              twMerge([
                "hover:text-foreground py-1",
                isActive && "text-foreground",
              ])
            }
          >
            Dialog
          </NavLink>
          <NavLink
            onClick={() => setShowMenu(false)}
            to="/docs/tabs"
            className={({ isActive }) =>
              twMerge([
                "hover:text-foreground py-1",
                isActive && "text-foreground",
              ])
            }
          >
            Tabs
          </NavLink>
          <NavLink
            onClick={() => setShowMenu(false)}
            to="/docs/toast"
            className={({ isActive }) =>
              twMerge([
                "hover:text-foreground py-1",
                isActive && "text-foreground",
              ])
            }
          >
            Toast{" "}
            <span className="px-2 py-px border border-primary/30 bg-primary/10 text-sm ms-2">
              New
            </span>
          </NavLink>
          <NavLink
            onClick={() => setShowMenu(false)}
            to="/docs/button"
            className={({ isActive }) =>
              twMerge([
                "hover:text-foreground py-1",
                isActive && "text-foreground",
              ])
            }
          >
            Button
          </NavLink>
          <NavLink
            onClick={() => setShowMenu(false)}
            to="/docs/input"
            className={({ isActive }) =>
              twMerge([
                "hover:text-foreground py-1",
                isActive && "text-foreground",
              ])
            }
          >
            Input
          </NavLink>
          <NavLink
            onClick={() => setShowMenu(false)}
            to="/docs/switch"
            className={({ isActive }) =>
              twMerge([
                "hover:text-foreground py-1",
                isActive && "text-foreground",
              ])
            }
          >
            Switch
          </NavLink>
          <NavLink
            onClick={() => setShowMenu(false)}
            to="/docs/textarea"
            className={({ isActive }) =>
              twMerge([
                "hover:text-foreground py-1",
                isActive && "text-foreground",
              ])
            }
          >
            Textarea
          </NavLink>
          <NavLink
            onClick={() => setShowMenu(false)}
            to="/docs/radio-group"
            className={({ isActive }) =>
              twMerge([
                "hover:text-foreground py-1",
                isActive && "text-foreground",
              ])
            }
          >
            Radio Group
          </NavLink>
          <NavLink
            onClick={() => setShowMenu(false)}
            to="/docs/checkbox"
            className={({ isActive }) =>
              twMerge([
                "hover:text-foreground py-1",
                isActive && "text-foreground",
              ])
            }
          >
            Checkbox
          </NavLink>
          <NavLink
            onClick={() => setShowMenu(false)}
            to="/docs/chart"
            className={({ isActive }) =>
              twMerge([
                "hover:text-foreground py-1",
                isActive && "text-foreground",
              ])
            }
          >
            Chart
          </NavLink>
          <NavLink
            onClick={() => setShowMenu(false)}
            to="/docs/combobox"
            className={({ isActive }) =>
              twMerge([
                "hover:text-foreground py-1",
                isActive && "text-foreground",
              ])
            }
          >
            Combobox{" "}
            <span className="px-2 py-px border border-primary/30 bg-primary/10 text-sm ms-2">
              New
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Main;
