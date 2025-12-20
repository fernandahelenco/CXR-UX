/**
 * WexToast Component Tests
 */

import { describe, it, expect } from "vitest";
import { wexToast } from "@/components/wex";

describe("wexToast", () => {
  it("is a function", () => {
    expect(typeof wexToast).toBe("function");
  });

  it("has success method", () => {
    expect(typeof wexToast.success).toBe("function");
  });

  it("has error method", () => {
    expect(typeof wexToast.error).toBe("function");
  });

  it("has warning method", () => {
    expect(typeof wexToast.warning).toBe("function");
  });

  it("has info method", () => {
    expect(typeof wexToast.info).toBe("function");
  });
});

