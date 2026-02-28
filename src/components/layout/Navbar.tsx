import React from 'react';
import { Home, Briefcase, Users, Award, Phone } from "lucide-react"
import { AnimeNavBar } from "@/components/ui/anime-navbar"

const navItems = [
  {
    name: "Home",
    url: "/",
    icon: Home,
  },
  {
    name: "Services",
    url: "/services",
    icon: Briefcase,
  },
  {
    name: "About Us",
    url: "/teams",
    icon: Users,
  },
  {
    name: "Client",
    url: "/client",
    icon: Award,
  },
  {
    name: "Contact",
    url: "/contact",
    icon: Phone,
  },
]

const Navbar: React.FC = () => {
  return <AnimeNavBar items={navItems} logo="/assets/logo-2.png" />
}

export default Navbar;
