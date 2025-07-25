import { JSX } from "react";

export type NavbarLink = {
  name: string;
  href: string;
  icon: () => JSX.Element;
}