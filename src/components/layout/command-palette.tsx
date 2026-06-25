"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  Code2,
  FileText,
  Home,
  Mail,
  Search,
  Sparkles,
  User,
} from "lucide-react";
import { GitHubIcon } from "@/components/icons/social";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";

const iconMap: Record<string, React.ReactNode> = {
  about: <User className="h-4 w-4" />,
  experience: <Briefcase className="h-4 w-4" />,
  projects: <Code2 className="h-4 w-4" />,
  skills: <Sparkles className="h-4 w-4" />,
  github: <GitHubIcon className="h-4 w-4" />,
  achievements: <Sparkles className="h-4 w-4" />,
  contact: <Mail className="h-4 w-4" />,
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const navigate = (href: string) => {
    setOpen(false);
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    } else if (href.startsWith("http")) {
      window.open(href, "_blank");
    } else {
      router.push(href);
    }
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search sections, links..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => navigate("#hero")}>
            <Home className="h-4 w-4" />
            Home
          </CommandItem>
          {NAV_LINKS.map((link) => (
            <CommandItem key={link.href} onSelect={() => navigate(link.href)}>
              {iconMap[link.href.replace("#", "")] || <Search className="h-4 w-4" />}
              {link.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Links">
          <CommandItem onSelect={() => navigate(SITE_CONFIG.github)}>
            <GitHubIcon className="h-4 w-4" />
            GitHub
          </CommandItem>
          <CommandItem onSelect={() => navigate(SITE_CONFIG.linkedin)}>
            <Mail className="h-4 w-4" />
            LinkedIn
          </CommandItem>
          <CommandItem onSelect={() => navigate(SITE_CONFIG.leetcode)}>
            <Code2 className="h-4 w-4" />
            LeetCode
          </CommandItem>
          <CommandItem onSelect={() => navigate(SITE_CONFIG.codechef)}>
            <Code2 className="h-4 w-4" />
            CodeChef
          </CommandItem>
          <CommandItem onSelect={() => navigate(SITE_CONFIG.hackelite)}>
            <Briefcase className="h-4 w-4" />
            HackElite
          </CommandItem>
          <CommandItem onSelect={() => navigate(SITE_CONFIG.placementPortal)}>
            <Briefcase className="h-4 w-4" />
            Placement Portal
          </CommandItem>
          <CommandItem onSelect={() => navigate(SITE_CONFIG.resumeUrl)}>
            <FileText className="h-4 w-4" />
            Download Resume
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
