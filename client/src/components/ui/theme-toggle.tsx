import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

// Define a fallback theme implementation that uses localStorage directly
const useLocalTheme = () => {
  const [theme, setTheme] = useState(() => {
    // Initial theme based on localStorage or system preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('luxdrive-theme');
      if (saved === 'dark' || saved === 'light') return saved;
      
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });
  
  const [mounted, setMounted] = useState(false);
  
  // Handle initial mount
  useEffect(() => {
    setMounted(true);
    
    // Apply theme to document
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, []);
  
  // Update when theme changes
  useEffect(() => {
    if (!mounted) return;
    
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    localStorage.setItem('luxdrive-theme', theme);
  }, [theme, mounted]);
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return { theme, toggleTheme, mounted };
};

export function ThemeToggle() {
  // Try to use the context, but fallback to local implementation if not available
  let theme = 'light';
  let toggleTheme = () => {};
  let mounted = false;
  
  try {
    // Dynamically import to avoid the hook call error
    const { useTheme } = require("@/context/theme-context");
    const themeContext = useTheme();
    theme = themeContext.theme;
    toggleTheme = themeContext.toggleTheme;
    mounted = true;
  } catch (e) {
    console.log("Using local theme implementation");
    const local = useLocalTheme();
    theme = local.theme;
    toggleTheme = local.toggleTheme;
    mounted = local.mounted;
  }

  if (!mounted) {
    return <div className="w-9 h-9"></div>; // Placeholder with same size
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 text-gray-700 hover:text-[#0F172A]" />
      ) : (
        <Sun className="h-5 w-5 text-yellow-400 hover:text-[#EAB308]" />
      )}
    </Button>
  );
}