import { Link, useLocation, useNavigate } from "react-router-dom";
import { WexButton } from "@/components/wex/wex-button";
import { WexAvatar } from "@/components/wex/wex-avatar";
import { WexBadge } from "@/components/wex/wex-badge";
import { WexSeparator } from "@/components/wex/wex-separator";
import { WexDropdownMenu } from "@/components/wex/wex-dropdown-menu";
import { Bell, User, Home, Wallet, FileText, LifeBuoy, ChevronDown, Languages, Palette, LogOut } from "lucide-react";
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
  const navigate = useNavigate();
  
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

  // Check if we're on the my-profile page
  const isOnMyProfile = location.pathname === "/my-profile";
  
  // Get current subPage from URL params
  const searchParams = new URLSearchParams(location.search);
  const currentSubPage = searchParams.get("subPage") || "my-profile";

  // Handle navigation to MyProfile sub-pages
  const handleProfileNavigation = (subPage: string) => {
    navigate(`/my-profile?subPage=${subPage}`);
  };

  // Handle logout - navigate to login page
  const handleLogout = () => {
    navigate("/login");
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

          {/* Profile Dropdown Menu */}
          <WexDropdownMenu>
            <WexDropdownMenu.Trigger asChild>
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
            </WexDropdownMenu.Trigger>
            <WexDropdownMenu.Content
              align="end"
              className="w-[240px] rounded-[8px] border border-[#e4e6e9] bg-white px-0 py-[8px] shadow-[0px_4px_10px_0px_rgba(2,13,36,0.15),0px_0px_1px_0px_rgba(2,13,36,0.3)]"
            >
              {/* Header Section */}
              <div className="flex gap-[8px] items-center pl-[12px] pr-0 py-[8px]">
                <div className="flex items-center justify-center shrink-0 size-[16px]">
                  <User className="h-4 w-4 text-[#1d2c38]" />
                </div>
                <div className="flex flex-col items-start justify-center flex-1 min-w-0">
                  <p className="font-semibold text-sm text-[#1d2c38] tracking-[-0.084px] leading-[24px]">
                    WEX, Inc.
                  </p>
                  <p className="font-normal text-[13px] text-[#7c858e] tracking-[-0.0325px] leading-[24px]">
                    Switch Account
                  </p>
                </div>
              </div>

              <WexDropdownMenu.Separator />

              {/* Menu Items */}
              <div className="flex flex-col">
                {[
                  { label: "My Profile", subPage: "my-profile" },
                  { label: "Dependents", subPage: "dependents" },
                  { label: "Beneficiaries", subPage: "beneficiaries" },
                  { label: "Banking", subPage: "banking" },
                  { label: "Debit Card", subPage: "debit-card" },
                  { label: "Login and Security", subPage: "login-security" },
                  { label: "Communication Preferences", subPage: "communication" },
                ].map((item) => {
                  const isActive = isOnMyProfile && currentSubPage === item.subPage;
                  return (
                    <WexDropdownMenu.Item
                      key={item.subPage}
                      onClick={() => handleProfileNavigation(item.subPage)}
                      className={`flex items-center gap-[8px] pl-[12px] pr-0 py-[8px] text-sm tracking-[-0.084px] ${
                        isActive
                          ? "bg-[#f1fafe] text-[#00437c]"
                          : "text-[#1d2c38] hover:bg-gray-50"
                      }`}
                    >
                      {item.label}
                    </WexDropdownMenu.Item>
                  );
                })}
              </div>

              <WexDropdownMenu.Separator />

              {/* Log Out */}
              <WexDropdownMenu.Item
                onClick={handleLogout}
                className="flex items-center gap-[8px] pl-[12px] pr-0 py-[8px] text-sm text-[#1d2c38] tracking-[-0.084px] hover:bg-gray-50"
              >
                <LogOut className="h-4 w-4 shrink-0" />
                <span>Log Out</span>
              </WexDropdownMenu.Item>
            </WexDropdownMenu.Content>
          </WexDropdownMenu>
        </div>
      </div>
    </header>
  );
}

