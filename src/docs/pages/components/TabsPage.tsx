import * as React from "react";
import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { Guidance } from "@/docs/components/ProseBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { Tabs, TabsContent, TabsList, TabsTrigger, ScrollableTabsList, ClosableTabsTrigger } from "@/components/ui/tabs";
import { WexCard, WexButton, WexInput, WexLabel } from "@/components/wex";

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
          <Tabs defaultValue="account" className="w-full max-w-md">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="p-4">
              <p className="text-sm text-muted-foreground">Account settings content.</p>
            </TabsContent>
            <TabsContent value="password" className="p-4">
              <p className="text-sm text-muted-foreground">Password settings content.</p>
            </TabsContent>
          </Tabs>
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
            <Tabs defaultValue="tab1">
              <ScrollableTabsList>
                <TabsTrigger value="tab1">Dashboard</TabsTrigger>
                <TabsTrigger value="tab2">Analytics</TabsTrigger>
                <TabsTrigger value="tab3">Reports</TabsTrigger>
                <TabsTrigger value="tab4">Settings</TabsTrigger>
                <TabsTrigger value="tab5">Integrations</TabsTrigger>
                <TabsTrigger value="tab6">Notifications</TabsTrigger>
                <TabsTrigger value="tab7">Security</TabsTrigger>
                <TabsTrigger value="tab8">Billing</TabsTrigger>
              </ScrollableTabsList>
              <TabsContent value="tab1" className="p-4">
                <p className="text-sm text-muted-foreground">Dashboard overview content.</p>
              </TabsContent>
              <TabsContent value="tab2" className="p-4">
                <p className="text-sm text-muted-foreground">Analytics data and charts.</p>
              </TabsContent>
              <TabsContent value="tab3" className="p-4">
                <p className="text-sm text-muted-foreground">Generated reports.</p>
              </TabsContent>
              <TabsContent value="tab4" className="p-4">
                <p className="text-sm text-muted-foreground">Application settings.</p>
              </TabsContent>
              <TabsContent value="tab5" className="p-4">
                <p className="text-sm text-muted-foreground">Third-party integrations.</p>
              </TabsContent>
              <TabsContent value="tab6" className="p-4">
                <p className="text-sm text-muted-foreground">Notification preferences.</p>
              </TabsContent>
              <TabsContent value="tab7" className="p-4">
                <p className="text-sm text-muted-foreground">Security settings.</p>
              </TabsContent>
              <TabsContent value="tab8" className="p-4">
                <p className="text-sm text-muted-foreground">Billing and subscription.</p>
              </TabsContent>
            </Tabs>
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
            <Tabs defaultValue={closableTabs[0]}>
              <TabsList>
                {closableTabs.map((tabId) => (
                  <ClosableTabsTrigger 
                    key={tabId} 
                    value={tabId}
                    onClose={() => handleCloseTab(tabId)}
                  >
                    Document {tabId.replace('tab', '')}
                  </ClosableTabsTrigger>
                ))}
              </TabsList>
              {closableTabs.map((tabId) => (
                <TabsContent key={tabId} value={tabId} className="p-4">
                  <p className="text-sm text-muted-foreground">
                    Content for {tabId}. Click the X to close this tab.
                  </p>
                </TabsContent>
              ))}
            </Tabs>
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
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="p-4">
                <p className="text-sm text-muted-foreground">Overview dashboard content.</p>
              </TabsContent>
              <TabsContent value="analytics" className="p-4">
                <p className="text-sm text-muted-foreground">Detailed analytics data.</p>
              </TabsContent>
              <TabsContent value="reports" className="p-4">
                <p className="text-sm text-muted-foreground">Generated reports.</p>
              </TabsContent>
            </Tabs>
          </ExampleCard>

          <ExampleCard title="Tabs in Card">
            <WexCard className="w-full max-w-md">
              <WexCard.Header>
                <WexCard.Title>Account Settings</WexCard.Title>
                <WexCard.Description>Manage your account preferences.</WexCard.Description>
              </WexCard.Header>
              <WexCard.Content className="p-0">
                <Tabs defaultValue="profile">
                  <TabsList className="w-full rounded-none border-b">
                    <TabsTrigger value="profile" className="rounded-none">Profile</TabsTrigger>
                    <TabsTrigger value="notifications" className="rounded-none">Notifications</TabsTrigger>
                  </TabsList>
                  <TabsContent value="profile" className="p-6 space-y-4">
                    <div className="space-y-2">
                      <WexLabel htmlFor="tab-name">Name</WexLabel>
                      <WexInput id="tab-name" defaultValue="Wex User" />
                    </div>
                    <WexButton>Save Profile</WexButton>
                  </TabsContent>
                  <TabsContent value="notifications" className="p-6">
                    <p className="text-sm text-muted-foreground">Notification settings.</p>
                  </TabsContent>
                </Tabs>
              </WexCard.Content>
            </WexCard>
          </ExampleCard>

          <ExampleCard title="Disabled Tab">
            <Tabs defaultValue="active" className="w-full max-w-md">
              <TabsList>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="disabled" disabled>Disabled</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
              </TabsList>
              <TabsContent value="active" className="p-4">
                <p className="text-sm text-muted-foreground">Content for active tab.</p>
              </TabsContent>
              <TabsContent value="pending" className="p-4">
                <p className="text-sm text-muted-foreground">Content for pending tab.</p>
              </TabsContent>
            </Tabs>
          </ExampleCard>

          <ExampleCard title="Controlled Tabs">
            <div className="w-full max-w-md space-y-4">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="home">Home</TabsTrigger>
                  <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                </TabsList>
                <TabsContent value="home" className="p-4">
                  <p className="text-sm text-muted-foreground">Home content.</p>
                </TabsContent>
                <TabsContent value="dashboard" className="p-4">
                  <p className="text-sm text-muted-foreground">Dashboard content.</p>
                </TabsContent>
              </Tabs>
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
          code={`import { 
  Tabs, TabsList, TabsTrigger, TabsContent,
  ScrollableTabsList,
  ClosableTabsTrigger 
} from "@/components/ui/tabs";

// Basic tabs
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>

// Scrollable tabs (many tabs)
<Tabs defaultValue="tab1">
  <ScrollableTabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
    {/* ... more tabs */}
  </ScrollableTabsList>
  ...
</Tabs>

// Closable tabs
<Tabs defaultValue="tab1">
  <TabsList>
    <ClosableTabsTrigger 
      value="tab1" 
      onClose={() => handleClose("tab1")}
    >
      Document 1
    </ClosableTabsTrigger>
  </TabsList>
  ...
</Tabs>`}
        />
        <div className="mt-4 text-sm text-muted-foreground">
          <p><strong>New Components:</strong></p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><code className="bg-muted px-1 rounded">ScrollableTabsList</code>: Wrapper with scroll arrows</li>
            <li><code className="bg-muted px-1 rounded">ClosableTabsTrigger</code>: Tab with close button (onClose prop)</li>
          </ul>
        </div>
      </Section>

      <TokenReference tokens={tabsTokens} className="mt-12" />
    </ComponentPage>
  );
}
