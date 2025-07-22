import { FacebookIcon, HistoryIcon, HomeIcon, PictureInPictureIcon, PieChartIcon, SettingsIcon } from "lucide-react";

import { NavbarLink } from "@/types";

export const navbarLinks: {
  primary: NavbarLink[],
  secondary: NavbarLink[],
  socials: NavbarLink[]
} = {
  primary: [
  {
    name: 'Home',
    href: '/',
    icon: HomeIcon
  },
  {
    name: 'Portfolio',
    href: '/portfolio',
    icon: PieChartIcon
  },
  {
    name: 'NFTs',
    href: '/nfts',
    icon: PictureInPictureIcon
  },
  {
    name: 'Transactions',
    href: '/transactions',
    icon: HistoryIcon
  },
  ],
  secondary: [
    {
      name: 'Settings',
      href: '/settings',
      icon: SettingsIcon  
    },
  ],
  socials: [
    {
      name: 'Facebook',
      href: 'https://facebook.com',
      icon: FacebookIcon
    }
  ]
}