import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, type PropDefinition } from "@/docs/components/PropsTable";
import { WexEmpty, WexButton } from "@/components/wex";
import { FileQuestion, Search, InboxIcon } from "lucide-react";

// Props documentation
const emptyRootProps: PropDefinition[] = [
  { name: "className", type: "string", description: "Additional CSS classes" },
];

const emptyMediaProps: PropDefinition[] = [
  { name: "variant", type: '"icon" | "image" | "illustration"', default: '"icon"', description: "Media type" },
  { name: "children", type: "ReactNode", required: true, description: "Media content (icon, image, etc.)" },
];

// Token mappings for WexEmpty
const emptyTokens: TokenRow[] = [
  { element: "Container", property: "Background", token: "--background" },
  { element: "Icon", property: "Color", token: "--muted-foreground" },
  { element: "Title", property: "Text", token: "--foreground" },
  { element: "Description", property: "Text", token: "--muted-foreground" },
];

export default function EmptyPage() {
  return (
    <ComponentPage
      title="Empty"
      description="Empty state placeholder for when no data is available."
      status="stable"
      registryKey="empty"
    >
      <Section title="Overview">
        <ExampleCard>
          <WexEmpty className="border">
            <WexEmpty.Header>
              <WexEmpty.Media variant="icon">
                <InboxIcon className="h-6 w-6" />
              </WexEmpty.Media>
              <WexEmpty.Title>No messages</WexEmpty.Title>
              <WexEmpty.Description>
                You don't have any messages yet. Start a conversation!
              </WexEmpty.Description>
            </WexEmpty.Header>
            <WexEmpty.Content>
              <WexButton>Compose Message</WexButton>
            </WexEmpty.Content>
          </WexEmpty>
        </ExampleCard>
      </Section>

      <Section title="Variants" description="Different empty state configurations.">
        <div className="space-y-6">
          <ExampleCard title="Search Empty" description="No search results.">
            <WexEmpty className="border">
              <WexEmpty.Header>
                <WexEmpty.Media variant="icon">
                  <Search className="h-6 w-6" />
                </WexEmpty.Media>
                <WexEmpty.Title>No results found</WexEmpty.Title>
                <WexEmpty.Description>
                  Try adjusting your search or filter to find what you're looking for.
                </WexEmpty.Description>
              </WexEmpty.Header>
            </WexEmpty>
          </ExampleCard>

          <ExampleCard title="File Not Found" description="Missing content.">
            <WexEmpty className="border">
              <WexEmpty.Header>
                <WexEmpty.Media variant="icon">
                  <FileQuestion className="h-6 w-6" />
                </WexEmpty.Media>
                <WexEmpty.Title>File not found</WexEmpty.Title>
                <WexEmpty.Description>
                  The file you're looking for doesn't exist or has been moved.
                </WexEmpty.Description>
              </WexEmpty.Header>
              <WexEmpty.Content>
                <WexButton intent="outline">Go Back</WexButton>
              </WexEmpty.Content>
            </WexEmpty>
          </ExampleCard>
        </div>
      </Section>

      <Section title="Accessibility">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">
            Empty states should provide clear context and actionable next steps.
            The title and description help users understand what to do next.
          </p>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexEmpty, WexButton } from "@/components/wex";
import { InboxIcon } from "lucide-react";

<WexEmpty>
  <WexEmpty.Header>
    <WexEmpty.Media variant="icon">
      <InboxIcon className="h-6 w-6" />
    </WexEmpty.Media>
    <WexEmpty.Title>No messages</WexEmpty.Title>
    <WexEmpty.Description>
      You don't have any messages yet.
    </WexEmpty.Description>
  </WexEmpty.Header>
  <WexEmpty.Content>
    <WexButton>Compose Message</WexButton>
  </WexEmpty.Content>
</WexEmpty>`}
        />
      </Section>

      <Section title="API Reference">
        <PropsTable 
          props={emptyRootProps}
          subComponents={[
            { name: "WexEmpty.Header", props: [{ name: "className", type: "string", description: "Additional CSS classes" }] },
            { name: "WexEmpty.Media", props: emptyMediaProps },
            { name: "WexEmpty.Title", props: [{ name: "className", type: "string", description: "Additional CSS classes" }] },
            { name: "WexEmpty.Description", props: [{ name: "className", type: "string", description: "Additional CSS classes" }] },
            { name: "WexEmpty.Content", props: [{ name: "className", type: "string", description: "Additional CSS classes" }] },
          ]}
        />
      </Section>

      <TokenReference tokens={emptyTokens} className="mt-12" />
    </ComponentPage>
  );
}

