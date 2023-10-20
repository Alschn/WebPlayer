import { type ReactNode } from "react";
import { Button, type ButtonProps } from "../../ui/button";
import { cn } from "~/lib/tailwind";

type SidebarButtonLinkProps = { icon: ReactNode; name: string } & ButtonProps;

const SidebarButtonLink = ({
  icon,
  name,
  className,
  ...rest
}: SidebarButtonLinkProps) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "flex w-full flex-row items-center justify-start gap-4 hover:bg-gray-200",
        className,
      )}
      {...rest}
    >
      {icon}
      <span>{name}</span>
    </Button>
  );
};

export default SidebarButtonLink;
