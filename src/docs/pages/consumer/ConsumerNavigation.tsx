import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { WexButton } from "@/components/wex/wex-button";
import { WexAvatar } from "@/components/wex/wex-avatar";
import { WexBadge } from "@/components/wex/wex-badge";
import { WexSeparator } from "@/components/wex/wex-separator";
import { WexDropdownMenu } from "@/components/wex/wex-dropdown-menu";
import { WexSheet } from "@/components/wex/wex-sheet";
import { WexAccordion } from "@/components/wex/wex-accordion";
import {
  Bell,
  User,
  House,
  Wallet,
  Receipt,
  FileText,
  ChevronDown,
  Languages,
  Palette,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { navigationItems } from "./mockData";
import { getUnreadCount, UNREAD_COUNT_CHANGED_EVENT } from "./messageCenterUtils";
import { useAuth } from "@/docs/context/AuthContext";

// Icon mapping for navigation items
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "home": House,
  "wallet": Wallet,
  "receipt": Receipt,
  "file-text": FileText,
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
  const { logout } = useAuth();
  const [unreadCount, setUnreadCount] = useState<number>(getUnreadCount());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState("English");
  
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

  // Handle logout - clear auth state and navigate to login page
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Listen for unread count changes
  useEffect(() => {
    // Set initial count
    setUnreadCount(getUnreadCount());

    // Listen for unread count change events
    const handleUnreadCountChange = (event: CustomEvent) => {
      setUnreadCount(event.detail as number);
    };

    window.addEventListener(UNREAD_COUNT_CHANGED_EVENT, handleUnreadCountChange as EventListener);

    // Also listen for storage changes (in case of multiple tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "messageCenter_unreadCount") {
        setUnreadCount(getUnreadCount());
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener(UNREAD_COUNT_CHANGED_EVENT, handleUnreadCountChange as EventListener);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Close the mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-20 items-center px-8 bg-[var(--tw-ring-offset-color)] gap-6">
        {/* Hamburger (mobile <= lg) */}
        <WexSheet open={isMenuOpen} onOpenChange={setIsMenuOpen} modal>
          <WexSheet.Trigger asChild>
            <WexButton
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </WexButton>
          </WexSheet.Trigger>

          <WexSheet.Content
            side="left"
            className="w-[315px] p-0"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center px-4 py-4">
              <span className="text-lg font-semibold text-foreground">Menu</span>
            </div>

            <nav className="flex flex-col gap-1 px-2 py-3">
              {navigationItems.map((item) => {
                const Icon = iconMap[item.icon];
                const active = isActive(item.href);
                const hasSubItems = item.subItems && item.subItems.length > 0;
                
                if (hasSubItems) {
                  return (
                    <WexAccordion key={item.label} type="single" collapsible className="w-full">
                      <WexAccordion.Item value={item.label.toLowerCase()} className="border-none">
                        <WexAccordion.Trigger className="py-3 text-base font-semibold text-foreground px-2 rounded-md hover:bg-muted w-full">
                          <div className="flex items-center gap-2 w-full">
                            {Icon && <Icon className="h-[15.75px] w-[15.75px]" />}
                            <span className="truncate">{item.label}</span>
                          </div>
                        </WexAccordion.Trigger>
                        <WexAccordion.Content className="pb-0">
                          <div className="flex flex-col gap-2 px-4 py-2">
                            {item.subItems?.map((subItem) => {
                              const subActive = isActive(subItem.href);
                              return (
                                <WexSheet.Close asChild key={subItem.label}>
                                  <WexButton
                                    intent="primary"
                                    variant={subActive ? "solid" : "ghost"}
                                    size="lg"
                                    className="justify-start w-full px-2"
                                    asChild
                                  >
                                    <Link to={subItem.href} className="flex items-center gap-2">
                                      <span className="truncate">{subItem.label}</span>
                                    </Link>
                                  </WexButton>
                                </WexSheet.Close>
                              );
                            })}
                          </div>
                        </WexAccordion.Content>
                      </WexAccordion.Item>
                    </WexAccordion>
                  );
                }
                
                return (
                  <WexSheet.Close asChild key={item.label}>
                    <WexButton
                      intent="primary"
                      variant={active ? "solid" : "ghost"}
                      size="lg"
                      className="justify-start w-full px-2"
                      asChild
                    >
                      <Link to={item.href} className="flex items-center gap-2">
                        {Icon && <Icon className="h-[15.75px] w-[15.75px]" />}
                        <span className="truncate">{item.label}</span>
                      </Link>
                    </WexButton>
                  </WexSheet.Close>
                );
              })}

              <div className="mt-2 border-t border-border pt-3 space-y-2">
                <WexAccordion type="single" collapsible>
                  <WexAccordion.Item value="language" className="border-none">
                    <WexAccordion.Trigger className="py-3 text-base font-semibold text-foreground px-2 rounded-md hover:bg-muted">
                      <div className="flex items-center gap-2">
                        <Languages className="h-[15.75px] w-[15.75px]" />
                        <span>{language}</span>
                      </div>
                    </WexAccordion.Trigger>
                    <WexAccordion.Content className="pb-0">
                      <div className="flex flex-col gap-2 px-2 py-2">
                        {["English", "Español", "Français"].map((lang) => (
                          <WexSheet.Close asChild key={lang}>
                            <WexButton
                              variant={language === lang ? "solid" : "ghost"}
                              size="lg"
                              className="justify-start w-full"
                              onClick={() => setLanguage(lang)}
                            >
                              {lang}
                            </WexButton>
                          </WexSheet.Close>
                        ))}
                      </div>
                    </WexAccordion.Content>
                  </WexAccordion.Item>
                </WexAccordion>
                <WexSheet.Close asChild>
                  <WexButton
                    variant="ghost"
                    size="lg"
                    className="justify-start w-full px-2"
                    asChild
                    aria-label="Design System"
                  >
                    <Link to="/design-system" className="flex items-center gap-2">
                      <Palette className="h-[15.75px] w-[15.75px]" />
                      Design System
                    </Link>
                  </WexButton>
                </WexSheet.Close>
              </div>
            </nav>
          </WexSheet.Content>
        </WexSheet>

        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity shrink-0">
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

        {/* Right cluster: nav + utilities */}
        <div className="flex flex-1 items-center justify-end gap-4 min-w-0">
          {/* Navigation Menu (desktop) */}
          <nav className="hidden lg:flex items-center gap-4">
            {navigationItems.map((item) => {
              const Icon = iconMap[item.icon];
              const hasSubItems = item.subItems && item.subItems.length > 0;
              const active = hasSubItems 
                ? item.subItems?.some(subItem => isActive(subItem.href)) || false
                : isActive(item.href);
              
              if (hasSubItems) {
                return (
                  <WexDropdownMenu key={item.label}>
                    <WexDropdownMenu.Trigger asChild>
                      <WexButton
                        intent="primary"
                        variant={active ? "solid" : "ghost"}
                        size="md"
                      >
                        <div className="flex items-center gap-1.5">
                          {Icon && <Icon className="h-4 w-4" />}
                          {item.label}
                          <ChevronDown className="h-3 w-3 ml-0.5" />
                        </div>
                      </WexButton>
                    </WexDropdownMenu.Trigger>
                    <WexDropdownMenu.Content align="start">
                      {item.subItems?.map((subItem) => {
                        const subActive = isActive(subItem.href);
                        return (
                          <WexDropdownMenu.Item
                            key={subItem.label}
                            asChild
                            className={subActive ? "bg-muted" : ""}
                          >
                            <Link to={subItem.href} className="flex items-center">
                              {subItem.label}
                            </Link>
                          </WexDropdownMenu.Item>
                        );
                      })}
                    </WexDropdownMenu.Content>
                  </WexDropdownMenu>
                );
              }
              
              return (
                <WexButton
                  key={item.label}
                  intent="primary"
                  variant={active ? "solid" : "ghost"}
                  size="md"
                  asChild
                >
                  <Link to={item.href} className="flex items-center gap-1.5">
                    {Icon && <Icon className="h-4 w-4" />}
                    {item.label}
                  </Link>
                </WexButton>
              );
            })}
          </nav>

          {/* Right: User Navigation */}
          <div className="flex items-center gap-2">
          {/* Design System Link */}
          <WexButton
            variant="ghost"
            size="icon"
            asChild
            aria-label="Design System"
          >
            <Link to="/design-system">
              <Palette className="h-5 w-5" />
            </Link>
          </WexButton>

          {/* Language Icon (desktop only; mobile in drawer) */}
          <WexButton
            variant="ghost"
            size="icon"
            className="hidden lg:inline-flex"
            aria-label="Language"
          >
            <Languages className="h-5 w-5" />
          </WexButton>

          <WexSeparator orientation="vertical" className="h-6" />


          {/* Notifications with Badge */}
          <div className="relative">
            <WexButton
              variant="ghost"
              size="icon"
              asChild
              aria-label="Notifications"
            >
              <Link to="/message-center">
                <Bell className="h-5 w-5" />
              </Link>
            </WexButton>
            {unreadCount > 0 && (
              <WexBadge 
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                intent="destructive"
              >
                {unreadCount}
              </WexBadge>
            )}
          </div>

          <WexSeparator orientation="vertical" className="h-6" />

          {/* Profile Dropdown Menu */}
          <WexDropdownMenu>
            <WexDropdownMenu.Trigger asChild>
              <WexButton
                variant="ghost"
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
      </div>

    </header>
  );
}

