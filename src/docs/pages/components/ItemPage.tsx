import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, type PropDefinition } from "@/docs/components/PropsTable";
import { WexItem, WexButton, WexAvatar } from "@/components/wex";
import { MoreHorizontal } from "lucide-react";

// Props documentation
const itemRootProps: PropDefinition[] = [
  { name: "asChild", type: "boolean", default: "false", description: "Merge with child element" },
  { name: "className", type: "string", description: "Additional CSS classes" },
];

const itemMediaProps: PropDefinition[] = [
  { name: "variant", type: '"icon" | "image" | "avatar"', default: '"icon"', description: "Media type" },
  { name: "children", type: "ReactNode", required: true, description: "Media content" },
];

const itemGroupProps: PropDefinition[] = [
  { name: "divider", type: "boolean", default: "true", description: "Show dividers between items" },
  { name: "className", type: "string", description: "Additional CSS classes" },
];

// Token mappings for WexItem
const itemTokens: TokenRow[] = [
  { element: "Container", property: "Background", token: "--background" },
  { element: "Container (hover)", property: "Background", token: "--accent" },
  { element: "Title", property: "Text", token: "--foreground" },
  { element: "Description", property: "Text", token: "--muted-foreground" },
  { element: "Separator", property: "Color", token: "--border" },
];

export default function ItemPage() {
  return (
    <ComponentPage
      title="Item"
      description="Flexible list item with media, content, and actions."
      status="stable"
      registryKey="item"
    >
      <Section title="Overview">
        <ExampleCard>
          <WexItem.Group className="max-w-md border rounded-lg" aria-label="User list">
            <WexItem>
              <WexItem.Media variant="image">
                <WexAvatar>
                  <WexAvatar.Fallback>JD</WexAvatar.Fallback>
                </WexAvatar>
              </WexItem.Media>
              <WexItem.Content>
                <WexItem.Title>John Doe</WexItem.Title>
                <WexItem.Description>Software Engineer</WexItem.Description>
              </WexItem.Content>
              <WexItem.Actions>
                <WexButton intent="ghost" size="icon" aria-label="More options for John Doe">
                  <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
                </WexButton>
              </WexItem.Actions>
            </WexItem>
          </WexItem.Group>
        </ExampleCard>
      </Section>

      <Section title="Variants" description="Different item configurations.">
        <div className="space-y-6 max-w-md">
          <ExampleCard title="With Icon Media" description="Icon instead of image.">
            <WexItem.Group className="border rounded-lg" aria-label="Notification list">
              <WexItem>
                <WexItem.Media variant="icon">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </WexItem.Media>
                <WexItem.Content>
                  <WexItem.Title>Task Completed</WexItem.Title>
                  <WexItem.Description>Your task has been marked as done.</WexItem.Description>
                </WexItem.Content>
              </WexItem>
            </WexItem.Group>
          </ExampleCard>

          <ExampleCard title="Multiple Items" description="List of items with separators.">
            <WexItem.Group className="border rounded-lg" aria-label="Items list">
              <WexItem>
                <WexItem.Content>
                  <WexItem.Title>First Item</WexItem.Title>
                  <WexItem.Description>Description for first item</WexItem.Description>
                </WexItem.Content>
              </WexItem>
              <WexItem.Separator />
              <WexItem>
                <WexItem.Content>
                  <WexItem.Title>Second Item</WexItem.Title>
                  <WexItem.Description>Description for second item</WexItem.Description>
                </WexItem.Content>
              </WexItem>
              <WexItem.Separator />
              <WexItem>
                <WexItem.Content>
                  <WexItem.Title>Third Item</WexItem.Title>
                  <WexItem.Description>Description for third item</WexItem.Description>
                </WexItem.Content>
              </WexItem>
            </WexItem.Group>
          </ExampleCard>

          <ExampleCard title="With Header and Footer" description="Complex item layout.">
            <WexItem.Group className="border rounded-lg" aria-label="Settings list">
              <WexItem>
                <WexItem.Header>
                  <WexItem.Title>Notification Settings</WexItem.Title>
                  <WexButton intent="ghost" size="sm">Edit</WexButton>
                </WexItem.Header>
                <WexItem.Content>
                  <WexItem.Description>
                    Configure how you want to receive notifications.
                  </WexItem.Description>
                </WexItem.Content>
                <WexItem.Footer>
                  <span className="text-xs text-muted-foreground">Last updated: 2 hours ago</span>
                </WexItem.Footer>
              </WexItem>
            </WexItem.Group>
          </ExampleCard>
        </div>
      </Section>

      <Section title="Accessibility">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">
            WexItem.Group uses role="list" and items are semantically grouped.
            Ensure action buttons have accessible labels.
          </p>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexItem, WexButton, WexAvatar } from "@/components/wex";

<WexItem.Group>
  <WexItem>
    <WexItem.Media variant="image">
      <WexAvatar>
        <WexAvatar.Fallback>JD</WexAvatar.Fallback>
      </WexAvatar>
    </WexItem.Media>
    <WexItem.Content>
      <WexItem.Title>John Doe</WexItem.Title>
      <WexItem.Description>Software Engineer</WexItem.Description>
    </WexItem.Content>
    <WexItem.Actions>
      <WexButton intent="ghost" size="icon">
        <MoreHorizontal />
      </WexButton>
    </WexItem.Actions>
  </WexItem>
  <WexItem.Separator />
  <WexItem>...</WexItem>
</WexItem.Group>`}
        />
      </Section>

      <Section title="API Reference">
        <PropsTable 
          props={itemRootProps}
          subComponents={[
            { name: "WexItem.Group", props: itemGroupProps },
            { name: "WexItem.Media", props: itemMediaProps },
            { name: "WexItem.Content", props: [{ name: "className", type: "string", description: "Additional CSS classes" }] },
            { name: "WexItem.Title", props: [{ name: "className", type: "string", description: "Additional CSS classes" }] },
            { name: "WexItem.Description", props: [{ name: "className", type: "string", description: "Additional CSS classes" }] },
            { name: "WexItem.Actions", props: [{ name: "className", type: "string", description: "Additional CSS classes" }] },
          ]}
        />
      </Section>

      <TokenReference tokens={itemTokens} className="mt-12" />
    </ComponentPage>
  );
}

