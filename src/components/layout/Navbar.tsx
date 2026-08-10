import React from 'react';
import { Home, Briefcase, Users, Award, Phone, BookOpen } from "lucide-react"
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
    name: "Blog",
    url: "/blog",
    icon: BookOpen,
  },
  {
    name: "Contact",
    // Points straight at the fragment so the link resolves in one hop —
    // no internal 302 through the legacy /contact redirect (SEO: avoid
    // internal links to redirecting URLs).
    url: "/#contact",
    icon: Phone,
  },
]

const Navbar: React.FC = () => {
  return <AnimeNavBar items={navItems} logo="/assets/logo-2.png" />
}

export default Navbar;
