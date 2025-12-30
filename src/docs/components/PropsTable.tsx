import {
  WexTable,
} from "@/components/wex";

/**
 * PropDefinition - Describes a single component prop
 */
export interface PropDefinition {
  /** Prop name */
  name: string;
  /** TypeScript type (e.g., "string", "boolean", '"primary" | "secondary"') */
  type: string;
  /** Default value if any */
  default?: string;
  /** Whether the prop is required */
  required?: boolean;
  /** Human-readable description */
  description: string;
}

/**
 * SubComponent definition for compound components
 */
export interface SubComponentDef {
  /** Name of the sub-component (e.g., "Dialog.Content") */
  name: string;
  /** Props for this sub-component */
  props: PropDefinition[];
}

export interface PropsTableProps {
  /** Array of prop definitions to display */
  props: PropDefinition[];
  /** Optional title override (defaults to "Props") */
  title?: string;
  /** Optional sub-components for compound components */
  subComponents?: SubComponentDef[];
}

/**
 * PropsTable - Displays component API documentation
 * 
 * @example
 * const buttonProps: PropDefinition[] = [
 *   { name: "intent", type: '"primary" | "secondary"', default: '"primary"', description: "Visual variant" },
 *   { name: "disabled", type: "boolean", default: "false", description: "Disable the button" },
 * ];
 * 
 * <PropsTable props={buttonProps} />
 */
export function PropsTable({ props, title = "Props", subComponents }: PropsTableProps) {
  if (!props || props.length === 0) {
    return null;
  }

  return (
    <div className="my-4">
      {title && (
        <h4 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
          {title}
        </h4>
      )}
      <div className="overflow-x-auto rounded-lg border border-border">
        <WexTable>
          <WexTable.Header>
            <WexTable.Row>
              <WexTable.Head className="w-[140px]">Prop</WexTable.Head>
              <WexTable.Head className="w-[200px]">Type</WexTable.Head>
              <WexTable.Head className="w-[100px]">Default</WexTable.Head>
              <WexTable.Head>Description</WexTable.Head>
            </WexTable.Row>
          </WexTable.Header>
          <WexTable.Body>
            {props.map((prop) => (
              <WexTable.Row key={prop.name}>
                <WexTable.Cell className="font-mono text-sm">
                  <span className="text-primary">{prop.name}</span>
                  {prop.required && (
                    <span className="text-destructive ml-0.5">*</span>
                  )}
                </WexTable.Cell>
                <WexTable.Cell>
                  <code className="text-xs bg-muted px-1.5 py-0.5 rounded text-muted-foreground break-all">
                    {prop.type}
                  </code>
                </WexTable.Cell>
                <WexTable.Cell className="text-sm text-muted-foreground">
                  {prop.default ? (
                    <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                      {prop.default}
                    </code>
                  ) : (
                    <span className="text-muted-foreground/50">—</span>
                  )}
                </WexTable.Cell>
                <WexTable.Cell className="text-sm text-muted-foreground">
                  {prop.description}
                </WexTable.Cell>
              </WexTable.Row>
            ))}
          </WexTable.Body>
        </WexTable>
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        <span className="text-destructive">*</span> Required prop
      </p>

      {/* Render sub-components if provided */}
      {subComponents && subComponents.length > 0 && (
        <div className="mt-8 space-y-6">
          {subComponents.map((sub) => (
            <SubComponentProps key={sub.name} name={sub.name} props={sub.props} />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * SubComponentProps - For documenting compound component sub-parts
 */
interface SubComponentPropsProps {
  /** Name of the sub-component (e.g., "Dialog.Content") */
  name: string;
  /** Props for this sub-component */
  props: PropDefinition[];
}

export function SubComponentProps({ name, props }: SubComponentPropsProps) {
  return (
    <div className="mt-6">
      <h5 className="text-sm font-medium text-foreground mb-2 font-mono">
        {name}
      </h5>
      <PropsTable props={props} title="" />
    </div>
  );
}

