import * as React from "react";
import * as LucideIcons from "lucide-react";
import { WexInput, WexButton, WexSelect, WexCard, WexDialog, WexPagination, WexBadge } from "@/components/wex";
import { Search, ChevronLeft, ChevronRight, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { IconGrid, type IconItem } from "@/docs/components/IconGrid";
import { CodeBlock } from "@/docs/components/CodeBlock";
import {
  iconCategories,
  getIconCategory,
  matchesSearch,
  type IconCategory,
} from "@/docs/data/iconCategories";

/**
 * Get all available icons from lucide-react
 */
function getAllIcons(): IconItem[] {
  const icons: IconItem[] = [];
  const seenNames = new Set<string>();

  // Get all exports from lucide-react
  Object.keys(LucideIcons).forEach((name) => {
    const component = (LucideIcons as Record<string, unknown>)[name];
    
    // Filter for icon components
    // Icons are React components that:
    // 1. Start with uppercase letter
    // 2. Are either functions or objects (React forwardRef components)
    // 3. Don't match excluded patterns
    const isUppercase = name.length > 0 && name[0] === name[0].toUpperCase();
    const isExcluded = 
      name.startsWith("create") ||
      name.startsWith("Icon") ||
      name === "LucideProps" ||
      name === "LucideIcon" ||
      name === "default";
    
    // Skip *Icon variants (e.g., "AArrowDownIcon") - use base names (e.g., "AArrowDown")
    const baseName = name.endsWith("Icon") ? name.slice(0, -4) : name;
    
    if (isUppercase && !isExcluded && !seenNames.has(baseName)) {
      // Accept both function components and object components (forwardRef, memo, etc.)
      // React components have $$typeof property
      const isValidComponent = 
        typeof component === "function" ||
        (typeof component === "object" && 
         component !== null && 
         ("$$typeof" in component || "render" in component));
      
      if (isValidComponent) {
        try {
          // Use base name (without "Icon" suffix) for consistency
          const iconName = baseName;
          const category = getIconCategory(iconName);
          icons.push({
            name: iconName,
            component: component as React.ComponentType<{ className?: string }>,
            category,
          });
          seenNames.add(iconName);
        } catch {
          // Skip icons that cause errors during categorization
          // Silently skip invalid icons
        }
      }
    }
  });

  return icons.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Icon Detail Modal - Shows when an icon is selected
 */
function IconDetailModal({
  icon,
  open,
  onOpenChange,
}: {
  icon: IconItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [svgCopied, setSvgCopied] = React.useState(false);
  const [svgString, setSvgString] = React.useState<string | null>(null);
  const svgContainerRef = React.useRef<HTMLDivElement>(null);

  // Extract SVG when modal opens or icon changes
  React.useEffect(() => {
    if (!open || !icon) {
      setSvgString(null);
      return;
    }

    // Small delay to ensure React has rendered the icon
    const timer = setTimeout(() => {
      if (!svgContainerRef.current) {
        setSvgString(null);
        return;
      }

      const svgElement = svgContainerRef.current.querySelector('svg');
      if (!svgElement) {
        setSvgString(null);
        return;
      }

      // Clone to avoid mutating the original
      const svgClone = svgElement.cloneNode(true) as SVGElement;

      // Clean for Figma - remove React-specific attributes
      svgClone.removeAttribute('class');
      svgClone.removeAttribute('style');
      
      // Get original viewBox or set default
      const viewBox = svgElement.getAttribute('viewBox') || '0 0 24 24';
      
      // Set standard attributes for Figma compatibility
      svgClone.setAttribute('width', '24');
      svgClone.setAttribute('height', '24');
      svgClone.setAttribute('viewBox', viewBox);
      svgClone.setAttribute('fill', 'none');
      svgClone.setAttribute('stroke', 'currentColor');
      svgClone.setAttribute('stroke-width', '2');
      svgClone.setAttribute('stroke-linecap', 'round');
      svgClone.setAttribute('stroke-linejoin', 'round');
      svgClone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

      // Serialize to string
      const serializer = new XMLSerializer();
      setSvgString(serializer.serializeToString(svgClone));
    }, 150);

    return () => clearTimeout(timer);
  }, [open, icon]);

  // Early return AFTER all hooks
  if (!icon) {
    return null;
  }

  const IconComponent = icon.component;
  const sizes = [
    { label: "16px", class: "h-4 w-4", size: "sm" },
    { label: "24px", class: "h-6 w-6", size: "md" },
    { label: "32px", class: "h-8 w-8", size: "lg" },
    { label: "48px", class: "h-12 w-12", size: "xl" },
  ];

  const importCode = `import { ${icon.name} } from "lucide-react";`;
  const categoryLabel = iconCategories.find((c) => c.id === icon.category)?.label || "Uncategorized";

  // Copy SVG to clipboard
  const copyAsSVG = async () => {
    if (!svgString) return;

    try {
      await navigator.clipboard.writeText(svgString);
      setSvgCopied(true);
      setTimeout(() => setSvgCopied(false), 2000);
    } catch {
      // Silently fail - user can try again
    }
  };

  return (
    <WexDialog open={open} onOpenChange={onOpenChange}>
      <WexDialog.Content size="xl" className="max-w-5xl">
        <WexDialog.Header className="pb-3 border-b">
          <div className="flex items-center gap-3">
            <WexDialog.Title className="text-2xl">{icon.name}</WexDialog.Title>
            <WexBadge intent="default" size="sm">
              {categoryLabel}
            </WexBadge>
          </div>
        </WexDialog.Header>
        
        {/* Hidden container for SVG extraction */}
        <div ref={svgContainerRef} className="sr-only" aria-hidden="true">
          <IconComponent className="h-6 w-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
          {/* Left Panel - Icon Display */}
          <div className="flex flex-col items-center justify-center p-12 bg-muted/30 rounded-lg border border-border">
            <div className="mb-4">
              <IconComponent className="h-40 w-40 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">{categoryLabel}</p>
            </div>
          </div>

          {/* Right Panel - Details */}
          <div className="space-y-6">

            {/* Size Previews */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Sizes</h3>
              <div className="grid grid-cols-4 gap-3">
                {sizes.map(({ label, class: sizeClass, size }) => (
                  <div
                    key={size}
                    className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-muted/50"
                  >
                    <div className="flex items-center justify-center p-2 rounded bg-background">
                      <IconComponent className={cn(sizeClass, "text-foreground")} />
                    </div>
                    <p className="text-xs font-medium text-foreground">{label}</p>
                    <p className="text-[10px] text-muted-foreground">{sizeClass}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Import Code */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Import Code</h3>
              <CodeBlock language="tsx" code={importCode} />
            </div>

            {/* Copy as SVG Button */}
            <div>
              <WexButton
                intent="secondary"
                variant="solid"
                size="lg"
                onClick={copyAsSVG}
                className="w-full gap-2"
                disabled={!svgString}
              >
                {svgCopied ? (
                  <>
                    <Check className="h-4 w-4" />
                    SVG Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy as SVG
                  </>
                )}
              </WexButton>
              <p className="text-xs text-muted-foreground mt-2">
                Copy clean SVG markup for use in Figma or other design tools
              </p>
            </div>
          </div>
        </div>
      </WexDialog.Content>
    </WexDialog>
  );
}

const ICONS_PER_PAGE = 200;

/**
 * Generate pagination page numbers with ellipsis
 */
function generatePaginationPages(currentPage: number, totalPages: number): (number | "ellipsis")[] {
  const pages: (number | "ellipsis")[] = [];
  
  // Always show first page
  pages.push(1);
  
  // Add ellipsis if needed before current range
  if (currentPage > 3) {
    pages.push("ellipsis");
  }
  
  // Add pages around current
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);
  
  for (let i = start; i <= end; i++) {
    if (i !== 1 && i !== totalPages) {
      pages.push(i);
    }
  }
  
  // Add ellipsis if needed after current range
  if (currentPage < totalPages - 2) {
    pages.push("ellipsis");
  }
  
  // Always show last page (if more than 1 page)
  if (totalPages > 1) {
    pages.push(totalPages);
  }
  
  // Remove duplicates and filter consecutive ellipsis
  const uniquePages: (number | "ellipsis")[] = [];
  let lastWasEllipsis = false;
  
  pages.forEach((page) => {
    if (page === "ellipsis") {
      if (!lastWasEllipsis) {
        uniquePages.push(page);
        lastWasEllipsis = true;
      }
    } else {
      if (!uniquePages.includes(page)) {
        uniquePages.push(page);
      }
      lastWasEllipsis = false;
    }
  });
  
  return uniquePages;
}

export default function IconsPage() {
  const [allIcons] = React.useState(() => getAllIcons());
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<IconCategory | "all">("all");
  const [selectedIcon, setSelectedIcon] = React.useState<IconItem | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);

  // Filter icons based on search and category
  // By default (no search, all categories), shows all icons
  const filteredIcons = React.useMemo(() => {
    // Start with all icons - they display by default
    let icons = allIcons;

    // Apply category filter
    if (selectedCategory !== "all") {
      icons = icons.filter((icon) => icon.category === selectedCategory);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      icons = icons.filter((icon) => {
        // Check direct name match
        if (icon.name.toLowerCase().includes(query)) return true;

        // Check category-based search
        return matchesSearch(icon.name, searchQuery, icon.category as IconCategory);
      });
    }

    return icons;
  }, [allIcons, searchQuery, selectedCategory]);

  // Paginate filtered icons
  const paginatedIcons = React.useMemo(() => {
    const startIndex = (currentPage - 1) * ICONS_PER_PAGE;
    const endIndex = startIndex + ICONS_PER_PAGE;
    return filteredIcons.slice(startIndex, endIndex);
  }, [filteredIcons, currentPage]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredIcons.length / ICONS_PER_PAGE);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);


  const handleIconClick = (icon: IconItem) => {
    setSelectedIcon(icon);
  };

  const handleModalOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedIcon(null);
    }
  };

  return (
    <article>
      <header className="mb-8 pb-6 border-b border-border">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">
          Icons
        </h1>
        <p className="text-lg text-muted-foreground">
          Browse and search all {allIcons.length} available Lucide React icons. Click any icon to view details and copy the import code.
        </p>
      </header>

      {/* Controls Section */}
      <div className="mb-8 space-y-4">
        {/* Search and Filters Row */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1">
            <WexInput
              placeholder="Search icons by name or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="h-4 w-4" />}
            />
          </div>

          {/* Category Filter */}
          <div className="w-full sm:w-[200px]">
            <WexSelect value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as IconCategory | "all")}>
              <WexSelect.Trigger>
                <WexSelect.Value placeholder="All Categories" />
              </WexSelect.Trigger>
              <WexSelect.Content>
                <WexSelect.Item value="all">All Categories</WexSelect.Item>
                {iconCategories.map((category) => (
                  <WexSelect.Item key={category.id} value={category.id}>
                    {category.label}
                  </WexSelect.Item>
                ))}
              </WexSelect.Content>
            </WexSelect>
          </div>
        </div>

        {/* Results Count and Pagination Info */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {paginatedIcons.length > 0 ? (currentPage - 1) * ICONS_PER_PAGE + 1 : 0}-
            {Math.min(currentPage * ICONS_PER_PAGE, filteredIcons.length)} of {filteredIcons.length} icons
            {selectedCategory !== "all" && ` in ${iconCategories.find((c) => c.id === selectedCategory)?.label || selectedCategory}`}
            {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
          </p>
        </div>
      </div>

      {/* Icon Detail Modal */}
      <IconDetailModal
        icon={selectedIcon}
        open={!!selectedIcon}
        onOpenChange={handleModalOpenChange}
      />

      {/* Icons Display - Icons show by default, no search required */}
      {filteredIcons.length === 0 ? (
        <WexCard className="p-12 text-center">
          <p className="text-muted-foreground">
            {searchQuery || selectedCategory !== "all" ? (
              <>
                No icons found matching "{searchQuery}"
                {selectedCategory !== "all" && ` in ${iconCategories.find((c) => c.id === selectedCategory)?.label || selectedCategory}`}
              </>
            ) : (
              <>Loading icons...</>
            )}
          </p>
        </WexCard>
      ) : (
        <IconGrid
          icons={paginatedIcons}
          selectedIcon={selectedIcon?.name || null}
          onIconClick={handleIconClick}
        />
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <WexPagination>
            <WexPagination.Content>
              <WexPagination.Item>
                <WexButton
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous</span>
                </WexButton>
              </WexPagination.Item>
              
              {generatePaginationPages(currentPage, totalPages).map((page, index) => {
                  if (page === "ellipsis") {
                    return (
                      <WexPagination.Item key={`ellipsis-${index}`}>
                        <WexPagination.Ellipsis />
                      </WexPagination.Item>
                    );
                  }
                  return (
                    <WexPagination.Item key={page}>
                      <WexButton
                        variant={page === currentPage ? "outline" : "ghost"}
                        size="icon"
                        onClick={() => setCurrentPage(page)}
                        className={cn(
                          page === currentPage && "bg-wex-pagination-active-bg text-wex-pagination-active-fg"
                        )}
                      >
                        {page}
                      </WexButton>
                    </WexPagination.Item>
                  );
                })}
              
              <WexPagination.Item>
                <WexButton
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="gap-1"
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </WexButton>
              </WexPagination.Item>
            </WexPagination.Content>
          </WexPagination>
        </div>
      )}

      {/* Usage Documentation */}
      <div className="mt-12 space-y-6">
        <div className="p-6 bg-muted/50 rounded-lg border border-border">
          <h2 className="text-lg font-semibold mb-3">Usage Example</h2>
          <CodeBlock
            language="tsx"
            code={`import { Search, Mail, User } from "lucide-react";

// Basic usage
<Search className="h-4 w-4" />
<Mail className="h-5 w-5" />
<User className="h-6 w-6" />

// With WEX components
<WexInput 
  leftIcon={<Search className="h-4 w-4" />} 
  placeholder="Search..." 
/>

<WexButton>
  <Mail className="h-4 w-4" />
  Send Email
</WexButton>`}
          />
        </div>

        <div className="p-6 bg-muted/50 rounded-lg border border-border">
          <h2 className="text-lg font-semibold mb-3">Size Guidelines</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li><strong>16px (h-4 w-4):</strong> Small inline icons, form inputs</li>
            <li><strong>24px (h-6 w-6):</strong> Default size for most UI elements</li>
            <li><strong>32px (h-8 w-8):</strong> Medium buttons, cards</li>
            <li><strong>48px (h-12 w-12):</strong> Large feature icons, hero sections</li>
          </ul>
        </div>
      </div>
    </article>
  );
}

