import { Link, useLocation } from "react-router-dom";
import { WexButton } from "@/components/wex/wex-button";
import { WexAvatar } from "@/components/wex/wex-avatar";
import { WexBadge } from "@/components/wex/wex-badge";
import { WexSeparator } from "@/components/wex/wex-separator";
import { Bell, User, Home, Wallet, FileText, LifeBuoy, ChevronDown, Languages, Palette } from "lucide-react";
import { navigationItems } from "./mockData";

// Icon mapping for navigation items
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "home": Home,
  "wallet": Wallet,
  "file-text": FileText,
  "life-buoy": LifeBuoy,
};

/**
 * Consumer Experience Navigation Header
 * 
 * Custom navigation that matches the Figma design with:
 * - WEX logo on left
 * - Navigation menu items in center
 * - User utilities on right (search, notifications, profile)
 */
export function ConsumerNavigation() {
  const location = useLocation();
  
  // Check if a nav item is currently active based on the URL
  const isActive = (href: string) => {
    // Handle hash links (not real routes)
    if (href.startsWith("#")) return false;
    // Handle root path - check for both "/" and empty string
    if (href === "/") {
      return location.pathname === "/" || location.pathname === "";
    }
    // Check if current path matches the nav item's href
    return location.pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-20 items-center justify-between px-8 bg-[var(--tw-ring-offset-color)]">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img
            src={`${import.meta.env.BASE_URL}WEX_Logo_Red_Vector.svg`}
            alt="WEX"
            className="h-8 dark:hidden"
          />
          <img
            src={`${import.meta.env.BASE_URL}WEX_Logo_White_Vector.svg`}
            alt="WEX"
            className="h-8 hidden dark:block"
          />
        </Link>

        {/* Center: Navigation Menu */}
        <nav className="flex items-center gap-4">
          {navigationItems.map((item) => {
            const Icon = iconMap[item.icon];
            const active = isActive(item.href);
            
            return (
              <WexButton
                key={item.label}
                intent={active ? "primary" : "ghost"}
                size="md"
                asChild
              >
                <Link to={item.href} className="flex items-center gap-1.5">
                  {Icon && <Icon className="h-4 w-4" />}
                  {item.label}
                  {item.hasDropdown && <ChevronDown className="h-3 w-3 ml-0.5" />}
                </Link>
              </WexButton>
            );
          })}
        </nav>

        {/* Right: User Navigation */}
        <div className="flex items-center gap-2">
          {/* Design System Link */}
          <WexButton
            intent="ghost"
            size="icon"
            asChild
            aria-label="Design System"
          >
            <Link to="/design-system">
              <Palette className="h-5 w-5" />
            </Link>
          </WexButton>

          {/* Language Icon */}
          <WexButton
            intent="ghost"
            size="icon"
            aria-label="Language"
          >
            <Languages className="h-5 w-5" />
          </WexButton>

          <WexSeparator orientation="vertical" className="h-6" />


          {/* Notifications with Badge */}
          <div className="relative">
            <WexButton
              intent="ghost"
              size="icon"
              asChild
              aria-label="Notifications"
            >
              <Link to="/message-center">
                <Bell className="h-5 w-5" />
              </Link>
            </WexButton>
            <WexBadge 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              intent="destructive"
            >
              1
            </WexBadge>
          </div>

          <WexSeparator orientation="vertical" className="h-6" />

          {/* Profile Avatar */}
          <WexButton
            intent="ghost"
            size="icon"
            className="rounded-full"
            aria-label="User profile"
          >
            <WexAvatar>
              <WexAvatar.Fallback>
                <User className="h-5 w-5" />
              </WexAvatar.Fallback>
            </WexAvatar>
          </WexButton>
        </div>
      </div>
    </header>
  );
}

