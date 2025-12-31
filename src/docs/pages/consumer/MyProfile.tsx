import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { WexButton } from "@/components/wex/wex-button";
import { WexAlert } from "@/components/wex/wex-alert";
import { WexEmpty } from "@/components/wex/wex-empty";
import { WexAvatar } from "@/components/wex/wex-avatar";
import { WexSeparator } from "@/components/wex/wex-separator";
import { WexCard } from "@/components/wex/wex-card";
import { ConsumerNavigation } from "./ConsumerNavigation";
import { Pencil, Info, Plus } from "lucide-react";

type SubPage = "my-profile" | "dependents" | "beneficiaries" | "banking" | "debit-card" | "login-security" | "communication";

export default function MyProfile() {
  const personalName = "Emily Rose Smith";
  const [searchParams, setSearchParams] = useSearchParams();

  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    const first = parts[0][0] || "";
    const last = parts[parts.length - 1][0] || "";
    return `${first}${last}`.toUpperCase();
  };

  const [activeSubPage, setActiveSubPage] = useState<SubPage>(() => {
    const subPage = searchParams.get("subPage");
    const validSubPages: SubPage[] = ["my-profile", "dependents", "beneficiaries", "banking", "debit-card", "login-security", "communication"];
    if (subPage && validSubPages.includes(subPage as SubPage)) {
      return subPage as SubPage;
    }
    return "my-profile";
  });

  // Sync activeSubPage with URL params
  useEffect(() => {
    const subPage = searchParams.get("subPage");
    const validSubPages: SubPage[] = ["my-profile", "dependents", "beneficiaries", "banking", "debit-card", "login-security", "communication"];
    if (subPage && validSubPages.includes(subPage as SubPage)) {
      setActiveSubPage(subPage as SubPage);
    } else if (!subPage) {
      setActiveSubPage("my-profile");
    }
  }, [searchParams]);

  const handleSubPageChange = (subPage: SubPage) => {
    setActiveSubPage(subPage);
    setSearchParams({ subPage });
  };

  const menuItems: { label: string; key: SubPage }[] = [
    { label: "My Profile", key: "my-profile" },
    { label: "Dependents", key: "dependents" },
    { label: "Beneficiaries", key: "beneficiaries" },
    { label: "Banking", key: "banking" },
    { label: "Debit Card", key: "debit-card" },
    { label: "Login & Security", key: "login-security" },
    { label: "Communication Preferences", key: "communication" },
  ];

  const renderContent = (subPage: SubPage) => {
    switch (subPage) {
      case "my-profile":
        return (
          <>
            {/* Page Header with Avatar */}
            <div className="p-4">
              <div className="flex items-center gap-3">
                <WexAvatar className="h-10 w-10">
                  <WexAvatar.Fallback className="text-base font-medium bg-gray-200">
                    {getInitials(personalName)}
                  </WexAvatar.Fallback>
                </WexAvatar>
                <h2 className="text-2xl font-semibold text-gray-800">My profile</h2>
              </div>
              <WexSeparator className="mt-4" />
            </div>

            {/* Info Banner */}
            <div className="px-6 py-6">
              <WexAlert intent="info" className="border border-[#bfdbfe] bg-[rgba(239,246,255,0.95)] shadow-[0px_4px_8px_0px_rgba(2,5,10,0.04)] rounded-md px-[10.5px] py-[7px] [&>svg]:h-4 [&>svg]:w-4 gap-[7px]">
                <Info className="h-4 w-4 text-[#0058a3]" />
                <WexAlert.Description className="text-[#0058a3] text-base leading-6 tracking-[-0.176px] m-0 whitespace-normal inline">
                  Certain profile information is managed by your organization to keep records consistent and secure. If you notice something incorrect or need an update, please contact your administrator.
                </WexAlert.Description>
              </WexAlert>
            </div>

            <div className="space-y-0">
              {/* Personal Information Section */}
              <div className="px-6 py-6">
                <div className="mb-4 flex items-center gap-4">
                  <h3 className="text-xl font-medium text-gray-800">Personal Information</h3>
                  <WexButton intent="ghost" size="sm">
                    <Pencil />
                    Edit
                  </WexButton>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{personalName}</p>
                  </div>
                  <div className="flex gap-1.5 text-sm">
                    <span className="text-gray-500">Date of birth:</span>
                    <span className="text-gray-800">12/13/1989</span>
                  </div>
                  <div className="flex gap-1.5 text-sm">
                    <span className="text-gray-500">Gender:</span>
                    <span className="text-gray-800">Female</span>
                  </div>
                  <div className="flex gap-1.5 text-sm">
                    <span className="text-gray-500">Marital Status:</span>
                    <span className="text-gray-800">Single</span>
                  </div>
                </div>
              </div>

              <WexSeparator />

              {/* Contact Information Section */}
              <div className="px-6 py-6">
                <div className="mb-4 flex items-center gap-4">
                  <h3 className="text-xl font-medium text-gray-800">Contact Information</h3>
                  <WexButton intent="ghost" size="sm">
                    <Pencil />
                    Edit
                  </WexButton>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-1.5">
                    <span className="text-gray-500">Primary email address:</span>
                    <span className="text-gray-800">emily.grace@email.com</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="text-gray-500">Secondary email address:</span>
                    <span className="text-gray-800">emily.grace2@email.com</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="text-gray-500">Mobile Number:</span>
                    <span className="text-gray-800">+1 (859) 123-12345</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="text-gray-500">Home Number:</span>
                    <span className="text-gray-800">+1 (859) 123-12345</span>
                  </div>
                </div>
              </div>

              <WexSeparator />

              {/* Address Information Section */}
              <div className="px-6 py-6">
                <div className="mb-4 flex items-center gap-4">
                  <h3 className="text-xl font-medium text-gray-800">Address Information</h3>
                  <WexButton intent="ghost" size="sm">
                    <Pencil />
                    Edit
                  </WexButton>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-1.5">
                    <span className="text-gray-500">Home Address:</span>
                    <span className="text-gray-800">123 Main Street</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="text-gray-500">City:</span>
                    <span className="text-gray-800">Anytown</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="text-gray-500">Province/State:</span>
                    <span className="text-gray-800">NY</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="text-gray-500">Zip Code:</span>
                    <span className="text-gray-800">123456</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="text-gray-500">Country:</span>
                    <span className="text-gray-800">United States</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="text-gray-500">Mailing Address:</span>
                    <span className="text-gray-800">The same as my home address</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      case "dependents":
        return (
          <>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-800">Dependents</h2>
                <WexButton
                  intent="outline"
                  className="border-[#0058a3] text-[#0058a3] hover:bg-blue-50"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Dependent
                </WexButton>
              </div>
              <WexSeparator className="mt-4" />
            </div>
            <div className="flex flex-col items-center justify-center px-8 py-16">
              <WexEmpty>
                <WexEmpty.Header>
                  <WexEmpty.Title>No dependents</WexEmpty.Title>
                  <WexEmpty.Description>You have no dependents added yet</WexEmpty.Description>
                </WexEmpty.Header>
              </WexEmpty>
            </div>
          </>
        );

      case "beneficiaries":
        return (
          <>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-800">Beneficiaries</h2>
                <WexButton
                  intent="outline"
                  className="border-[#0058a3] text-[#0058a3] hover:bg-blue-50"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Beneficiary
                </WexButton>
              </div>
              <WexSeparator className="mt-4" />
            </div>
            <div className="p-6">
              <div className="flex flex-col items-center justify-center rounded-lg p-8">
                <WexEmpty>
                  <WexEmpty.Header>
                    <WexEmpty.Title>No beneficiaries</WexEmpty.Title>
                    <WexEmpty.Description>You have no beneficiaries added yet</WexEmpty.Description>
                  </WexEmpty.Header>
                </WexEmpty>
              </div>
            </div>
          </>
        );

      case "banking":
        return (
          <>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-800">Banking</h2>
                <WexButton
                  intent="outline"
                  className="border-[#0058a3] text-[#0058a3] hover:bg-blue-50"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Bank Account
                </WexButton>
              </div>
              <WexSeparator className="mt-4" />
            </div>
            <div className="p-6">
              <div className="flex flex-col items-center justify-center rounded-lg p-8">
                <WexEmpty>
                  <WexEmpty.Header>
                    <WexEmpty.Title>No bank accounts</WexEmpty.Title>
                    <WexEmpty.Description>You have no bank accounts added yet</WexEmpty.Description>
                  </WexEmpty.Header>
                </WexEmpty>
              </div>
            </div>
          </>
        );

      case "debit-card":
        return (
          <>
            <div className="p-4">
              <div className="flex items-center">
                <h2 className="text-2xl font-semibold text-gray-800">Debit Card</h2>
              </div>
              <WexSeparator className="mt-4" />
            </div>
            <div className="p-6">
              <div className="flex flex-col items-center justify-center rounded-lg p-8">
                <WexEmpty>
                  <WexEmpty.Header>
                    <WexEmpty.Title>No debit card</WexEmpty.Title>
                    <WexEmpty.Description>No debit card information available</WexEmpty.Description>
                  </WexEmpty.Header>
                </WexEmpty>
              </div>
            </div>
          </>
        );

      case "login-security":
        return (
          <>
            <div className="p-4">
              <div className="flex items-center">
                <h2 className="text-2xl font-semibold text-gray-800">Login & Security</h2>
              </div>
              <WexSeparator className="mt-4" />
            </div>
            <div className="space-y-0">
              <div className="px-6 py-6">
                <div className="mb-4 flex items-center gap-4">
                  <h3 className="text-xl font-medium text-gray-800">Password</h3>
                  <WexButton intent="ghost" size="sm">
                    <Pencil />
                    Change Password
                  </WexButton>
                </div>
                <p className="text-sm text-gray-600">Last updated: 3 months ago</p>
              </div>
              <WexSeparator />
              <div className="px-6 py-6">
                <div className="mb-4 flex items-center gap-4">
                  <h3 className="text-xl font-medium text-gray-800">Two-Factor Authentication</h3>
                  <WexButton intent="ghost" size="sm">
                    <Pencil />
                    Manage
                  </WexButton>
                </div>
                <p className="text-sm text-gray-600">Status: Not enabled</p>
              </div>
              <WexSeparator />
              <div className="px-6 py-6">
                <div className="mb-4 flex items-center gap-4">
                  <h3 className="text-xl font-medium text-gray-800">Security Questions</h3>
                  <WexButton intent="ghost" size="sm">
                    <Pencil />
                    Update
                  </WexButton>
                </div>
                <p className="text-sm text-gray-600">3 security questions configured</p>
              </div>
            </div>
          </>
        );

      case "communication":
        return (
          <>
            <div className="p-4">
              <div className="flex items-center">
                <h2 className="text-2xl font-semibold text-gray-800">Communication Preferences</h2>
              </div>
              <WexSeparator className="mt-4" />
            </div>
            <div className="space-y-0">
              <div className="px-6 py-6">
                <div className="mb-4 flex items-center gap-4">
                  <h3 className="text-xl font-medium text-gray-800">Email Preferences</h3>
                  <WexButton intent="ghost" size="sm">
                    <Pencil />
                    Edit
                  </WexButton>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Account notifications</span>
                    <span className="text-gray-500">Enabled</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Marketing emails</span>
                    <span className="text-gray-500">Disabled</span>
                  </div>
                </div>
              </div>
              <WexSeparator />
              <div className="px-6 py-6">
                <div className="mb-4 flex items-center gap-4">
                  <h3 className="text-xl font-medium text-gray-800">SMS Preferences</h3>
                  <WexButton intent="ghost" size="sm">
                    <Pencil />
                    Edit
                  </WexButton>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Transaction alerts</span>
                    <span className="text-gray-500">Enabled</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Security alerts</span>
                    <span className="text-gray-500">Enabled</span>
                  </div>
                </div>
              </div>
              <WexSeparator />
              <div className="px-6 py-6">
                <div className="mb-4 flex items-center gap-4">
                  <h3 className="text-xl font-medium text-gray-800">Push Notifications</h3>
                  <WexButton intent="ghost" size="sm">
                    <Pencil />
                    Edit
                  </WexButton>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Mobile app notifications</span>
                    <span className="text-gray-500">Enabled</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F1FAFE]">
      <ConsumerNavigation />

      {/* Main Content */}
      <div className="mx-auto max-w-[1440px] px-8 py-8">
        <div className="mx-auto max-w-[1376px]">
          {/* Page Header */}
          <div className="mb-8 flex items-center">
            <h1 className="text-2xl font-semibold text-gray-800">My Account</h1>
          </div>

          <div className="flex gap-0">
            {/* Left Sidebar */}
            <WexCard className="w-[260px] rounded-l-2xl rounded-r-none border-r-0">
              <WexCard.Content className="px-4 py-6">
                <div className="space-y-2">
                  {menuItems.map((item) => (
                    <WexButton
                      key={item.key}
                      intent={activeSubPage === item.key ? "primary" : "ghost"}
                      size="md"
                      onClick={() => handleSubPageChange(item.key)}
                      className="w-full justify-start text-left whitespace-normal h-auto min-h-[44px] py-2"
                    >
                      {item.label}
                    </WexButton>
                  ))}
                </div>
              </WexCard.Content>
            </WexCard>

            {/* Main Content Area */}
            <WexCard className="flex-1 rounded-r-2xl rounded-l-none border-l-0">
              <WexCard.Content className="p-0">
                {renderContent(activeSubPage)}
              </WexCard.Content>
            </WexCard>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white py-4">
        <div className="mx-auto max-w-[1440px] px-8">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
            <WexButton intent="ghost" className="h-auto p-0 text-sm text-gray-500">
              Copyright
            </WexButton>
            <span>•</span>
            <WexButton intent="ghost" className="h-auto p-0 text-sm text-gray-500">
              Disclaimer
            </WexButton>
            <span>•</span>
            <WexButton intent="ghost" className="h-auto p-0 text-sm text-gray-500">
              Privacy Policy
            </WexButton>
            <span>•</span>
            <WexButton intent="ghost" className="h-auto p-0 text-sm text-gray-500">
              Terms of Use
            </WexButton>
          </div>
          <p className="mt-2 text-center text-sm text-gray-500">
            WEX Health Inc. 2004-2026. All rights reserved. Powered by WEX Health.
          </p>
        </div>
      </footer>
    </div>
  );
}

