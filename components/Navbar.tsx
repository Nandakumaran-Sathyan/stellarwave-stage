import React from 'react';
import { Home, Briefcase, Award, Phone } from "lucide-react"
import { AnimeNavBar } from "./ui/anime-navbar"

const navItems = [
  {
    name: "Home",
    url: "#hero",
    icon: Home,
  },
  {
    name: "Services",
    url: "#services",
    icon: Briefcase,
  },
  {
    name: "Work",
    url: "#work",
    icon: Award,
  },
  {
    name: "Contact",
    url: "#contact",
    icon: Phone,
  },
]

const Navbar: React.FC = () => {
  return <AnimeNavBar items={navItems} defaultActive="Home" logo="/assets/logo-2.png" />
}

export default Navbar;
