import * as React from "react";
import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { Guidance } from "@/docs/components/ProseBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, SubComponentProps, type PropDefinition } from "@/docs/components/PropsTable";
import { WexTabs, WexCard, WexButton, WexInput, WexLabel } from "@/components/wex";

// Props documentation for WexTabs
const tabsRootProps: PropDefinition[] = [
  { name: "value", type: "string", description: "Controlled active tab value" },
  { name: "defaultValue", type: "string", description: "Default active tab for uncontrolled usage" },
  { name: "onValueChange", type: "(value: string) => void", description: "Callback when active tab changes" },
  { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Orientation of the tabs" },
  { name: "className", type: "string", description: "Additional CSS classes" },
];

const tabsTriggerProps: PropDefinition[] = [
  { name: "value", type: "string", required: true, description: "Unique value for this tab" },
  { name: "disabled", type: "boolean", default: "false", description: "Disables this tab" },
  { name: "children", type: "ReactNode", required: true, description: "Tab label content" },
];

const tabsClosableTriggerProps: PropDefinition[] = [
  { name: "value", type: "string", required: true, description: "Unique value for this tab" },
  { name: "onClose", type: "() => void", required: true, description: "Callback when close button is clicked" },
  { name: "children", type: "ReactNode", required: true, description: "Tab label content" },
];

const tabsContentProps: PropDefinition[] = [
  { name: "value", type: "string", required: true, description: "Matches the corresponding trigger value" },
  { name: "className", type: "string", description: "Additional CSS classes" },
  { name: "children", type: "ReactNode", required: true, description: "Panel content" },
];

// Token mappings for Tabs
// Layer 3 component tokens
const tabsTokens: TokenRow[] = [
  { element: "Trigger", property: "Text", token: "--wex-component-tabs-trigger-fg" },
  { element: "Trigger (Hover)", property: "Background", token: "--wex-component-tabs-trigger-hover-bg" },
  { element: "Trigger (Active)", property: "Text", token: "--wex-component-tabs-trigger-active-fg" },
  { element: "Indicator", property: "Color", token: "--wex-component-tabs-indicator" },
  { element: "Divider", property: "Border", token: "--wex-component-tabs-divider" },
  { element: "Focus Ring", property: "Color", token: "--wex-component-tabs-focus-ring" },
];

export default function TabsPage() {
  const [activeTab, setActiveTab] = React.useState("account");
  const [closableTabs, setClosableTabs] = React.useState(["tab1", "tab2", "tab3", "tab4"]);

  const handleCloseTab = (tabId: string) => {
    setClosableTabs(prev => prev.filter(id => id !== tabId));
  };

  return (
    <ComponentPage
      title="Tabs"
      description="Tabbed content panels with scrollable and closable variants."
      status="stable"
      registryKey="tabs"
    >
      <Section title="Overview">
        <ExampleCard>
          <WexTabs defaultValue="account" className="w-full max-w-md">
            <WexTabs.List>
              <WexTabs.Trigger value="account">Account</WexTabs.Trigger>
              <WexTabs.Trigger value="password">Password</WexTabs.Trigger>
            </WexTabs.List>
            <WexTabs.Content value="account" className="p-4">
              <p className="text-sm text-muted-foreground">Account settings content.</p>
            </WexTabs.Content>
            <WexTabs.Content value="password" className="p-4">
              <p className="text-sm text-muted-foreground">Password settings content.</p>
            </WexTabs.Content>
          </WexTabs>
        </ExampleCard>
        <Guidance>
          Use tabs to organize related content into panels. Each panel should 
          contain self-contained content that makes sense without the others.
        </Guidance>
      </Section>

      {/* ============================================================
          SCROLLABLE TABS
          ============================================================ */}
      <Section title="Scrollable Tabs" description="Tabs with navigation arrows when overflow occurs.">
        <ExampleCard title="Scrollable Tab List">
          <div className="w-full max-w-md">
            <WexTabs defaultValue="tab1">
              <WexTabs.ScrollableList>
                <WexTabs.Trigger value="tab1">Dashboard</WexTabs.Trigger>
                <WexTabs.Trigger value="tab2">Analytics</WexTabs.Trigger>
                <WexTabs.Trigger value="tab3">Reports</WexTabs.Trigger>
                <WexTabs.Trigger value="tab4">Settings</WexTabs.Trigger>
                <WexTabs.Trigger value="tab5">Integrations</WexTabs.Trigger>
                <WexTabs.Trigger value="tab6">Notifications</WexTabs.Trigger>
                <WexTabs.Trigger value="tab7">Security</WexTabs.Trigger>
                <WexTabs.Trigger value="tab8">Billing</WexTabs.Trigger>
              </WexTabs.ScrollableList>
              <WexTabs.Content value="tab1" className="p-4">
                <p className="text-sm text-muted-foreground">Dashboard overview content.</p>
              </WexTabs.Content>
              <WexTabs.Content value="tab2" className="p-4">
                <p className="text-sm text-muted-foreground">Analytics data and charts.</p>
              </WexTabs.Content>
              <WexTabs.Content value="tab3" className="p-4">
                <p className="text-sm text-muted-foreground">Generated reports.</p>
              </WexTabs.Content>
              <WexTabs.Content value="tab4" className="p-4">
                <p className="text-sm text-muted-foreground">Application settings.</p>
              </WexTabs.Content>
              <WexTabs.Content value="tab5" className="p-4">
                <p className="text-sm text-muted-foreground">Third-party integrations.</p>
              </WexTabs.Content>
              <WexTabs.Content value="tab6" className="p-4">
                <p className="text-sm text-muted-foreground">Notification preferences.</p>
              </WexTabs.Content>
              <WexTabs.Content value="tab7" className="p-4">
                <p className="text-sm text-muted-foreground">Security settings.</p>
              </WexTabs.Content>
              <WexTabs.Content value="tab8" className="p-4">
                <p className="text-sm text-muted-foreground">Billing and subscription.</p>
              </WexTabs.Content>
            </WexTabs>
          </div>
        </ExampleCard>
        <Guidance>
          Use ScrollableTabsList when you have many tabs that may overflow the container.
          Arrow buttons appear for navigation.
        </Guidance>
      </Section>

      {/* ============================================================
          CLOSABLE TABS
          ============================================================ */}
      <Section title="Closable Tabs" description="Tabs with close button for dynamic content.">
        <ExampleCard title="Closable Tabs">
          <div className="w-full max-w-md">
            <WexTabs defaultValue={closableTabs[0]}>
              <WexTabs.List>
                {closableTabs.map((tabId) => (
                  <WexTabs.ClosableTrigger 
                    key={tabId} 
                    value={tabId}
                    onClose={() => handleCloseTab(tabId)}
                  >
                    Document {tabId.replace('tab', '')}
                  </WexTabs.ClosableTrigger>
                ))}
              </WexTabs.List>
              {closableTabs.map((tabId) => (
                <WexTabs.Content key={tabId} value={tabId} className="p-4">
                  <p className="text-sm text-muted-foreground">
                    Content for {tabId}. Click the X to close this tab.
                  </p>
                </WexTabs.Content>
              ))}
            </WexTabs>
            {closableTabs.length === 0 && (
              <p className="text-sm text-muted-foreground p-4">All tabs closed. Refresh to reset.</p>
            )}
          </div>
        </ExampleCard>
        <Guidance>
          Use ClosableTabsTrigger for document-style interfaces where users can 
          close tabs. Provide the onClose callback to handle tab removal.
        </Guidance>
      </Section>

      {/* ============================================================
          VARIANTS
          ============================================================ */}
      <Section title="Variants" description="Different tab configurations.">
        <div className="space-y-8">
          <ExampleCard title="Full-Width Tabs">
            <WexTabs defaultValue="overview" className="w-full">
              <WexTabs.List className="grid w-full grid-cols-3">
                <WexTabs.Trigger value="overview">Overview</WexTabs.Trigger>
                <WexTabs.Trigger value="analytics">Analytics</WexTabs.Trigger>
                <WexTabs.Trigger value="reports">Reports</WexTabs.Trigger>
              </WexTabs.List>
              <WexTabs.Content value="overview" className="p-4">
                <p className="text-sm text-muted-foreground">Overview dashboard content.</p>
              </WexTabs.Content>
              <WexTabs.Content value="analytics" className="p-4">
                <p className="text-sm text-muted-foreground">Detailed analytics data.</p>
              </WexTabs.Content>
              <WexTabs.Content value="reports" className="p-4">
                <p className="text-sm text-muted-foreground">Generated reports.</p>
              </WexTabs.Content>
            </WexTabs>
          </ExampleCard>

          <ExampleCard title="Tabs in Card">
            <WexCard className="w-full max-w-md">
              <WexCard.Header>
                <WexCard.Title>Account Settings</WexCard.Title>
                <WexCard.Description>Manage your account preferences.</WexCard.Description>
              </WexCard.Header>
              <WexCard.Content className="p-0">
                <WexTabs defaultValue="profile">
                  <WexTabs.List className="w-full rounded-none border-b">
                    <WexTabs.Trigger value="profile" className="rounded-none">Profile</WexTabs.Trigger>
                    <WexTabs.Trigger value="notifications" className="rounded-none">Notifications</WexTabs.Trigger>
                  </WexTabs.List>
                  <WexTabs.Content value="profile" className="p-6 space-y-4">
                    <div className="space-y-2">
                      <WexLabel htmlFor="tab-name">Name</WexLabel>
                      <WexInput id="tab-name" defaultValue="Wex User" />
                    </div>
                    <WexButton>Save Profile</WexButton>
                  </WexTabs.Content>
                  <WexTabs.Content value="notifications" className="p-6">
                    <p className="text-sm text-muted-foreground">Notification settings.</p>
                  </WexTabs.Content>
                </WexTabs>
              </WexCard.Content>
            </WexCard>
          </ExampleCard>

          <ExampleCard title="Disabled Tab">
            <WexTabs defaultValue="active" className="w-full max-w-md">
              <WexTabs.List>
                <WexTabs.Trigger value="active">Active</WexTabs.Trigger>
                <WexTabs.Trigger value="disabled" disabled>Disabled</WexTabs.Trigger>
                <WexTabs.Trigger value="pending">Pending</WexTabs.Trigger>
              </WexTabs.List>
              <WexTabs.Content value="active" className="p-4">
                <p className="text-sm text-muted-foreground">Content for active tab.</p>
              </WexTabs.Content>
              <WexTabs.Content value="pending" className="p-4">
                <p className="text-sm text-muted-foreground">Content for pending tab.</p>
              </WexTabs.Content>
            </WexTabs>
          </ExampleCard>

          <ExampleCard title="Controlled Tabs">
            <div className="w-full max-w-md space-y-4">
              <WexTabs value={activeTab} onValueChange={setActiveTab}>
                <WexTabs.List>
                  <WexTabs.Trigger value="home">Home</WexTabs.Trigger>
                  <WexTabs.Trigger value="dashboard">Dashboard</WexTabs.Trigger>
                </WexTabs.List>
                <WexTabs.Content value="home" className="p-4">
                  <p className="text-sm text-muted-foreground">Home content.</p>
                </WexTabs.Content>
                <WexTabs.Content value="dashboard" className="p-4">
                  <p className="text-sm text-muted-foreground">Dashboard content.</p>
                </WexTabs.Content>
              </WexTabs>
              <div className="flex gap-2">
                <WexButton intent="outline" size="sm" onClick={() => setActiveTab("home")}>Go to Home</WexButton>
                <WexButton intent="outline" size="sm" onClick={() => setActiveTab("dashboard")}>Go to Dashboard</WexButton>
              </div>
            </div>
          </ExampleCard>
        </div>
      </Section>

      <Section title="Accessibility">
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Keyboard Navigation</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Arrow Left/Right: Navigate between tabs</li>
              <li>Enter/Space: Activate tab</li>
              <li>Home/End: Jump to first/last tab</li>
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">ARIA Roles</h3>
            <p className="text-sm text-muted-foreground">
              Uses tablist, tab, and tabpanel roles automatically.
              Each tab has aria-selected and aria-controls attributes.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexTabs } from "@/components/wex";

// Basic tabs
<WexTabs defaultValue="tab1">
  <WexTabs.List>
    <WexTabs.Trigger value="tab1">Tab 1</WexTabs.Trigger>
    <WexTabs.Trigger value="tab2">Tab 2</WexTabs.Trigger>
  </WexTabs.List>
  <WexTabs.Content value="tab1">Content 1</WexTabs.Content>
  <WexTabs.Content value="tab2">Content 2</WexTabs.Content>
</WexTabs>

// Scrollable tabs (many tabs)
<WexTabs defaultValue="tab1">
  <WexTabs.ScrollableList>
    <WexTabs.Trigger value="tab1">Tab 1</WexTabs.Trigger>
    <WexTabs.Trigger value="tab2">Tab 2</WexTabs.Trigger>
    {/* ... more tabs */}
  </WexTabs.ScrollableList>
  ...
</WexTabs>

// Closable tabs
<WexTabs defaultValue="tab1">
  <WexTabs.List>
    <WexTabs.ClosableTrigger 
      value="tab1" 
      onClose={() => handleClose("tab1")}
    >
      Document 1
    </WexTabs.ClosableTrigger>
  </WexTabs.List>
  ...
</WexTabs>`}
        />
      </Section>

      <Section title="API Reference">
        <PropsTable props={tabsRootProps} title="WexTabs" />
        <SubComponentProps name="WexTabs.Trigger" props={tabsTriggerProps} />
        <SubComponentProps name="WexTabs.ClosableTrigger" props={tabsClosableTriggerProps} />
        <SubComponentProps name="WexTabs.Content" props={tabsContentProps} />
      </Section>

      <TokenReference tokens={tabsTokens} className="mt-12" />
    </ComponentPage>
  );
}
