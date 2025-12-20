/**
 * Tests for theme utilities
 * 
 * Tests dark mode toggle, localStorage persistence, and system preference detection
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  getStoredTheme,
  getSystemTheme,
  getInitialTheme,
  setTheme,
  toggleTheme,
} from "@/docs/utils/theme";

describe("theme utilities", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Reset document class
    document.documentElement.classList.remove("dark");
  });

  describe("getStoredTheme", () => {
    it("returns null when no theme is stored", () => {
      expect(getStoredTheme()).toBeNull();
    });

    it("returns 'light' when light is stored", () => {
      localStorage.setItem("wex-theme", "light");
      expect(getStoredTheme()).toBe("light");
    });

    it("returns 'dark' when dark is stored", () => {
      localStorage.setItem("wex-theme", "dark");
      expect(getStoredTheme()).toBe("dark");
    });

    it("returns null for invalid stored value", () => {
      localStorage.setItem("wex-theme", "invalid");
      expect(getStoredTheme()).toBeNull();
    });
  });

  describe("getSystemTheme", () => {
    it("returns 'light' by default (matchMedia mocked to false)", () => {
      // Our setup.ts mocks matchMedia to return matches: false
      expect(getSystemTheme()).toBe("light");
    });
  });

  describe("getInitialTheme", () => {
    it("returns stored theme if available", () => {
      localStorage.setItem("wex-theme", "dark");
      expect(getInitialTheme()).toBe("dark");
    });

    it("falls back to system theme if no stored theme", () => {
      // No stored theme, matchMedia returns false (light)
      expect(getInitialTheme()).toBe("light");
    });
  });

  describe("setTheme", () => {
    it("sets theme to dark and adds class", () => {
      setTheme("dark");
      
      expect(localStorage.getItem("wex-theme")).toBe("dark");
      expect(document.documentElement.classList.contains("dark")).toBe(true);
    });

    it("sets theme to light and removes class", () => {
      // First set to dark
      document.documentElement.classList.add("dark");
      
      setTheme("light");
      
      expect(localStorage.getItem("wex-theme")).toBe("light");
      expect(document.documentElement.classList.contains("dark")).toBe(false);
    });
  });

  describe("toggleTheme", () => {
    it("toggles from light to dark", () => {
      // Start with light (no dark class)
      document.documentElement.classList.remove("dark");
      
      const result = toggleTheme();
      
      expect(result).toBe("dark");
      expect(document.documentElement.classList.contains("dark")).toBe(true);
    });

    it("toggles from dark to light", () => {
      // Start with dark
      document.documentElement.classList.add("dark");
      
      const result = toggleTheme();
      
      expect(result).toBe("light");
      expect(document.documentElement.classList.contains("dark")).toBe(false);
    });

    it("persists the toggled theme", () => {
      document.documentElement.classList.remove("dark");
      
      toggleTheme();
      
      expect(localStorage.getItem("wex-theme")).toBe("dark");
    });
  });
});

