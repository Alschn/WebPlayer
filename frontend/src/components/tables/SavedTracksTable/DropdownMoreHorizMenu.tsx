import type { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import {
    Disc3Icon,
    ListPlusIcon,
    MoreHorizontalIcon,
    PlusIcon,
    RadioIcon,
    ShareIcon,
    Trash2Icon,
    UserIcon,
    UsersIcon,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

type DropdownMoreHorizMenuProps = DropdownMenuProps;

const DropdownMoreHorizMenu = (props: DropdownMoreHorizMenuProps) => {
  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <PlusIcon className="mr-2 h-4 w-4" />
            <span>Add To Playlist</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>{/* todo */}</DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Trash2Icon className="mr-2 h-4 w-4" />
            <span>Remove From Favourite</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ListPlusIcon className="mr-2 h-4 w-4" />
            <span>Add To Queue</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <RadioIcon className="mr-2 h-4 w-4" />
            <span>Go To Radio</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Go To Artist</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Disc3Icon className="mr-2 h-4 w-4" />
            <span>Go To Album</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UsersIcon className="mr-2 h-4 w-4" />
            <span>Show Authors</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <ShareIcon className="mr-2 h-4 w-4" />
            <span>Share</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>{/* todo */}</DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMoreHorizMenu;
