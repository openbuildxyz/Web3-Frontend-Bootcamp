"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

const Theme: React.FC = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => {
        const isDark = theme === "dark";
        setTheme(isDark ? "light" : "dark");
      }}
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
};

export default Theme;
