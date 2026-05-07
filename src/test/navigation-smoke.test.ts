import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

/**
 * Smoke tests that verify all sidebar links resolve to defined routes
 * and that no Defect AI references remain after feature removal.
 */

const root = resolve(__dirname, "../..");
const appSource = readFileSync(resolve(root, "src/App.tsx"), "utf8");
const sidebarSource = readFileSync(
  resolve(root, "src/components/layout/AppSidebar.tsx"),
  "utf8"
);
const knowledgeSource = readFileSync(
  resolve(root, "src/pages/knowledge/Knowledge.tsx"),
  "utf8"
);

// Extract route path strings from App.tsx
function extractRoutes(source: string): string[] {
  return [...source.matchAll(/path="([^"]+)"/g)].map((m) => m[1]);
}

// Extract sidebar url strings from AppSidebar.tsx
function extractSidebarUrls(source: string): string[] {
  return [...source.matchAll(/url:\s*'([^']+)'/g)].map((m) => m[1]);
}

// Extract knowledge hub link strings from Knowledge.tsx
function extractKnowledgeLinks(source: string): string[] {
  return [...source.matchAll(/link:\s*'([^']+)'/g)].map((m) => m[1]);
}

// Check if a link matches any route (exact or parameterized parent)
function linkMatchesRoute(link: string, routes: string[]): boolean {
  return routes.some((route) => {
    // Exact match
    if (route === link) return true;
    // The route is a parameterized child of the link, e.g. /knowledge/docs/:id
    const routeBase = route.replace(/\/:[^/]+/g, "");
    if (routeBase === link) return true;
    return false;
  });
}

describe("Navigation integrity", () => {
  const routes = extractRoutes(appSource);
  const sidebarLinks = extractSidebarUrls(sidebarSource);
  const knowledgeLinks = extractKnowledgeLinks(knowledgeSource);

  describe("Sidebar links → defined routes", () => {
    it("should have at least one sidebar link", () => {
      expect(sidebarLinks.length).toBeGreaterThan(0);
    });

    sidebarLinks.forEach((link) => {
      it(`sidebar link "${link}" has a matching route`, () => {
        expect(linkMatchesRoute(link, routes)).toBe(true);
      });
    });
  });

  describe("Knowledge hub links → defined routes", () => {
    it("should have at least one knowledge link", () => {
      expect(knowledgeLinks.length).toBeGreaterThan(0);
    });

    knowledgeLinks.forEach((link) => {
      it(`knowledge link "${link}" has a matching route`, () => {
        expect(linkMatchesRoute(link, routes)).toBe(true);
      });
    });
  });

  describe("No Defect AI remnants", () => {
    const filesToCheck = [
      { name: "App.tsx", content: appSource },
      { name: "AppSidebar.tsx", content: sidebarSource },
      { name: "Knowledge.tsx", content: knowledgeSource },
    ];

    filesToCheck.forEach(({ name, content }) => {
      it(`${name} has no "defect-ai" references`, () => {
        expect(content.toLowerCase()).not.toContain("defect-ai");
        expect(content.toLowerCase()).not.toContain("defect ai");
        expect(content).not.toContain("DefectAI");
      });
    });
  });

  describe("Route completeness", () => {
    it("catch-all route exists", () => {
      expect(routes).toContain("*");
    });

    it("login route exists", () => {
      expect(routes).toContain("/login");
    });

    it("home route exists", () => {
      expect(routes).toContain("/");
    });
  });
});
