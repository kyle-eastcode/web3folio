import { cn } from "@/lib/utils";
import { NavbarLink } from "@/types";
import Link from "next/link";

export function NavbarLinkItem({
  link,
  active = false,
}: {
  link: NavbarLink;
  active: boolean;
}) {
  return (
    <li className="relative w-full">
      {active && (
        <div className="absolute top-0 left-0 z-1 w-[4px] h-full bg-primary rounded-tr-full rounded-br-full" />
      )}
      <Link
        href={link.href}
        className={cn("flex items-center gap-x-3 px-5 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 ease-in-out duration-200", active ? 'text-grey-800 dark:text-gray-200' : '')}
      >
        {link.icon()}
        <span className={cn(active ? 'font-semibold' : 'font-medium')}>
          {link.name}
        </span>
      </Link>
    </li>
  );
}
