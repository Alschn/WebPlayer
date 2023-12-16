import { Badge } from "../ui/badge";

const ExplicitBadge = () => {
  return (
    <Badge
      className={`
        rounded-sm bg-slate-200 
        px-2 font-bold 
        hover:bg-slate-200 dark:bg-slate-300 
        dark:text-black dark:hover:bg-slate-300`}
      variant="secondary"
    >
      E
    </Badge>
  );
};

export default ExplicitBadge;
