import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shadcn-components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
type DropdownParam = {
  name: string;
  onClick: () => void;
};
interface DropDownMenuProps {
  dropdownParam: DropdownParam[];
}

export const DropDownMenu = (props: DropDownMenuProps) => {
  const { dropdownParam } = props;
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Ellipsis className="cursor-pointer hover:text-gray-400 mx-2" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSeparator />
          {dropdownParam.map((param: DropdownParam) => (
            <DropdownMenuItem key={param.name} onClick={param.onClick}>
              {param.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
