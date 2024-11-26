"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function ThemeChangeM() {
  const { setTheme } = useTheme();
  return (
    <ToggleGroup type="single">
      <ToggleGroupItem value="light" onClick={() => setTheme("light")}>
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </ToggleGroupItem>
      <ToggleGroupItem value="dark" onClick={() => setTheme("dark")}>
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      </ToggleGroupItem>
      <ToggleGroupItem value="system" onClick={() => setTheme("system")}>
        System
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
