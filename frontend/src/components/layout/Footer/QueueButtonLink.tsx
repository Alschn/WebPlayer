import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { ListMusicIcon } from "lucide-react";
import { Button, type ButtonProps } from "~/components/ui/button";

interface QueueButtonLinkProps extends ButtonProps {
  className?: string;
  linkProps?: Omit<NextLinkProps, "href" | "passHref">;
}

export default function QueueButtonLink({
  className,
  linkProps,
  ...props
}: QueueButtonLinkProps) {
  return (
    <NextLink href="/queue" passHref className={className} {...linkProps}>
      <Button variant="ghost" size="icon" {...props}>
        <ListMusicIcon />
      </Button>
    </NextLink>
  );
}
