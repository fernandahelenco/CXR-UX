/**
 * Icon Categories for Lucide React Icons
 * 
 * Semantic categorization of icons for better discoverability.
 * Icons are mapped to categories based on their naming patterns and semantic meaning.
 */

export type IconCategory =
  | "User"
  | "Media"
  | "Navigation"
  | "Actions"
  | "Communication"
  | "Files"
  | "Interface"
  | "Status"
  | "Shapes"
  | "Time"
  | "Location"
  | "Finance"
  | "Shopping"
  | "Uncategorized";

export interface CategoryDefinition {
  id: IconCategory;
  label: string;
  description: string;
  keywords: string[];
}

export const iconCategories: CategoryDefinition[] = [
  {
    id: "User",
    label: "User",
    description: "User-related icons",
    keywords: ["user", "person", "people", "profile", "account", "avatar"],
  },
  {
    id: "Media",
    label: "Media",
    description: "Media playback and content",
    keywords: ["play", "pause", "stop", "volume", "music", "video", "image", "photo", "camera", "film"],
  },
  {
    id: "Navigation",
    label: "Navigation",
    description: "Navigation and direction",
    keywords: ["arrow", "chevron", "navigation", "direction", "move", "route", "path"],
  },
  {
    id: "Actions",
    label: "Actions",
    description: "Common actions and operations",
    keywords: ["edit", "delete", "trash", "save", "download", "upload", "copy", "cut", "paste", "add", "remove", "create"],
  },
  {
    id: "Communication",
    label: "Communication",
    description: "Communication and messaging",
    keywords: ["mail", "email", "message", "chat", "phone", "call", "notification", "bell", "send"],
  },
  {
    id: "Files",
    label: "Files",
    description: "File and folder management",
    keywords: ["file", "folder", "document", "text", "pdf", "archive", "zip"],
  },
  {
    id: "Interface",
    label: "Interface",
    description: "UI elements and controls",
    keywords: ["settings", "menu", "search", "filter", "sort", "grid", "list", "layout", "sidebar"],
  },
  {
    id: "Status",
    label: "Status",
    description: "Status indicators and feedback",
    keywords: ["check", "x", "alert", "warning", "info", "error", "success", "loading", "spinner"],
  },
  {
    id: "Shapes",
    label: "Shapes",
    description: "Geometric shapes",
    keywords: ["circle", "square", "triangle", "diamond", "hexagon", "shape"],
  },
  {
    id: "Time",
    label: "Time",
    description: "Time and calendar",
    keywords: ["calendar", "clock", "time", "date", "schedule", "event"],
  },
  {
    id: "Location",
    label: "Location",
    description: "Location and geography",
    keywords: ["map", "pin", "location", "marker", "globe", "world", "earth"],
  },
  {
    id: "Finance",
    label: "Finance",
    description: "Financial and payment",
    keywords: ["credit", "card", "payment", "money", "dollar", "currency", "bank", "wallet"],
  },
  {
    id: "Shopping",
    label: "Shopping",
    description: "Shopping and commerce",
    keywords: ["cart", "shopping", "bag", "store", "purchase", "buy"],
  },
  {
    id: "Uncategorized",
    label: "Uncategorized",
    description: "Icons that don't fit other categories",
    keywords: [],
  },
];

/**
 * Maps icon names to categories based on naming patterns
 */
export function getIconCategory(iconName: string): IconCategory {
  const name = iconName.toLowerCase();

  // User category
  if (name.startsWith("user") || name.includes("person") || name.includes("people") || name === "avatar") {
    return "User";
  }

  // Media category
  if (
    name.includes("play") ||
    name.includes("pause") ||
    name.includes("stop") ||
    name.includes("volume") ||
    name.includes("music") ||
    name.includes("video") ||
    name.includes("image") ||
    name.includes("photo") ||
    name.includes("camera") ||
    name.includes("film") ||
    name.includes("mic") ||
    name.includes("speaker")
  ) {
    return "Media";
  }

  // Navigation category
  if (
    name.startsWith("arrow") ||
    name.startsWith("chevron") ||
    name.includes("navigation") ||
    name.includes("move") ||
    name.includes("direction") ||
    name === "compass"
  ) {
    return "Navigation";
  }

  // Actions category
  if (
    name.includes("edit") ||
    name.includes("trash") ||
    name.includes("delete") ||
    name.includes("save") ||
    name.includes("download") ||
    name.includes("upload") ||
    name.includes("copy") ||
    name.includes("cut") ||
    name.includes("paste") ||
    name === "plus" ||
    name === "minus" ||
    name === "x" ||
    name.includes("add") ||
    name.includes("remove") ||
    name.includes("create") ||
    name.includes("refresh") ||
    name.includes("rotate")
  ) {
    return "Actions";
  }

  // Communication category
  if (
    name.includes("mail") ||
    name.includes("email") ||
    name.includes("message") ||
    name.includes("chat") ||
    name.includes("phone") ||
    name.includes("call") ||
    name.includes("notification") ||
    name.includes("bell") ||
    name.includes("send") ||
    name.includes("reply")
  ) {
    return "Communication";
  }

  // Files category
  if (
    name.startsWith("file") ||
    name.startsWith("folder") ||
    name.includes("document") ||
    name.includes("text") ||
    name.includes("pdf") ||
    name.includes("archive") ||
    name.includes("zip")
  ) {
    return "Files";
  }

  // Interface category
  if (
    name.includes("settings") ||
    name.includes("menu") ||
    name.includes("search") ||
    name.includes("filter") ||
    name.includes("sort") ||
    name.includes("grid") ||
    name.includes("list") ||
    name.includes("layout") ||
    name.includes("sidebar") ||
    name.includes("panel") ||
    name === "more" ||
    name.includes("dots")
  ) {
    return "Interface";
  }

  // Status category
  if (
    name.includes("check") ||
    name.includes("alert") ||
    name.includes("warning") ||
    name.includes("info") ||
    name.includes("error") ||
    name.includes("success") ||
    name.includes("loading") ||
    name.includes("spinner") ||
    name === "x" ||
    name === "circle" ||
    name.includes("badge")
  ) {
    return "Status";
  }

  // Shapes category
  if (
    name === "circle" ||
    name === "square" ||
    name === "triangle" ||
    name === "diamond" ||
    name === "hexagon" ||
    name.includes("shape")
  ) {
    return "Shapes";
  }

  // Time category
  if (
    name.includes("calendar") ||
    name.includes("clock") ||
    name.includes("time") ||
    name.includes("date") ||
    name.includes("schedule") ||
    name.includes("event") ||
    name.includes("timer")
  ) {
    return "Time";
  }

  // Location category
  if (
    name.includes("map") ||
    name.includes("pin") ||
    name.includes("location") ||
    name.includes("marker") ||
    name.includes("globe") ||
    name.includes("world") ||
    name.includes("earth")
  ) {
    return "Location";
  }

  // Finance category
  if (
    name.includes("credit") ||
    name.includes("card") ||
    name.includes("payment") ||
    name.includes("money") ||
    name.includes("dollar") ||
    name.includes("currency") ||
    name.includes("bank") ||
    name.includes("wallet")
  ) {
    return "Finance";
  }

  // Shopping category
  if (
    name.includes("cart") ||
    name.includes("shopping") ||
    name.includes("bag") ||
    name.includes("store") ||
    name.includes("purchase") ||
    name.includes("buy")
  ) {
    return "Shopping";
  }

  // Default to uncategorized
  return "Uncategorized";
}

/**
 * Get all keywords for a category (for enhanced search)
 */
export function getCategoryKeywords(category: IconCategory): string[] {
  const categoryDef = iconCategories.find((c) => c.id === category);
  return categoryDef?.keywords || [];
}

/**
 * Check if an icon name matches search query (including category keywords)
 */
export function matchesSearch(iconName: string, searchQuery: string, category?: IconCategory): boolean {
  if (!searchQuery.trim()) return true;

  const query = searchQuery.toLowerCase();
  const name = iconName.toLowerCase();

  // Direct name match
  if (name.includes(query)) return true;

  // Category match
  if (category) {
    const categoryDef = iconCategories.find((c) => c.id === category);
    if (categoryDef) {
      // Check category label
      if (categoryDef.label.toLowerCase().includes(query)) return true;
      // Check category keywords
      if (categoryDef.keywords.some((keyword) => keyword.includes(query))) return true;
    }
  }

  // Check icon's category keywords
  const iconCategory = getIconCategory(iconName);
  const keywords = getCategoryKeywords(iconCategory);
  if (keywords.some((keyword) => keyword.includes(query))) return true;

  return false;
}

