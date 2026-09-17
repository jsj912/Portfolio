import { expect, test, type ConsoleMessage, type Page } from "@playwright/test";

const SECTION_IDS = ["home", "about", "projects", "research", "experience", "contact"];

/** Collect console errors for the lifetime of a page. */
function watchConsole(page: Page): string[] {
  const errors: string[] = [];
  page.on("console", (message: ConsoleMessage) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  return errors;
}

test("home responds 200 and shows the name as the only H1", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);

  const h1 = page.locator("h1");
  await expect(h1).toHaveCount(1);
  await expect(h1).toContainText("Joan Sara Joe");
});

test("all six sections exist and every nav link reaches its own", async ({ page }) => {
  await page.goto("/");

  for (const id of SECTION_IDS) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }

  const nav = page.getByRole("navigation", { name: "Primary" });

  // Home is reached via the name on the left, not a nav link.
  for (const id of SECTION_IDS.slice(1)) {
    await nav.locator(`a[href="#${id}"]`).click();

    // Smooth scrolling, so wait for the section to actually be in view.
    await expect
      .poll(
        async () =>
          page.evaluate((target) => {
            const node = document.getElementById(target);
            if (!node) return false;
            const box = node.getBoundingClientRect();
            return box.top <= window.innerHeight * 0.5 && box.bottom > 0;
          }, id),
        { timeout: 10_000 },
      )
      .toBe(true);
  }
});

test("a match card opens a dialog; Escape closes it and returns focus", async ({ page }) => {
  await page.goto("/");

  const trigger = page.getByRole("button", { name: "Match Recap" }).first();
  await trigger.scrollIntoViewIfNeeded();
  await trigger.click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAttribute("aria-modal", "true");

  // Focus moved into the dialog rather than staying behind on the page.
  await expect
    .poll(() => page.evaluate(() => document.activeElement?.closest("[role=dialog]") !== null))
    .toBe(true);

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("a recap is deep-linkable by its hash", async ({ page }) => {
  await page.goto("/#match-ringshield");

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("RingShield");
});

test("an unknown route shows BALL OUT.", async ({ page }) => {
  const response = await page.goto("/no-such-page");
  expect(response?.status()).toBe(404);
  await expect(page.locator("h1")).toContainText("BALL OUT.");
});

test("no console errors on load", async ({ page }) => {
  const errors = watchConsole(page);

  await page.goto("/", { waitUntil: "networkidle" });
  // Give the deferred hero effects (the bird fires at ~4s) a chance to run.
  await page.waitForTimeout(5000);

  expect(errors).toEqual([]);
});

test("no horizontal scroll at 375px", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");

  const overflows = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(overflows).toBe(false);
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("the loading overlay never appears", async ({ page }) => {
    await page.goto("/");

    const overlay = page.locator(".loading-overlay");
    await expect(overlay).toBeHidden();

    // And it must not appear a moment later either.
    await page.waitForTimeout(1500);
    await expect(overlay).toBeHidden();
  });
});

test("full-page screenshots at three widths", async ({ page }) => {
  // Mark the session as already served, before any page script runs. Waiting
  // for the overlay to hide is a race — it starts hidden, so the assertion
  // passes before the overlay has even mounted, and the shot then catches it
  // mid-fade over the hero.
  await page.addInitScript(() => {
    try {
      window.sessionStorage.setItem("portfolio:served", "1");
    } catch {
      // Storage blocked; the overlay treats that as already seen anyway.
    }
  });

  for (const width of [375, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");

    await expect(page.locator(".loading-overlay")).toBeHidden();

    // Force every reveal so nothing is captured part-way through a transition.
    await page.evaluate(() => {
      for (const node of document.querySelectorAll(".reveal")) {
        node.setAttribute("data-shown", "true");
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(700);

    await page.screenshot({
      path: `test-results/screens/home-${width}.png`,
      fullPage: true,
    });
  }
});

/* ------------------------------------------------------------------------- *
 * The brief's manual review list, automated so it is repeatable.
 * ------------------------------------------------------------------------- */

test("every stat renders character-for-character as the content says", async ({ page }) => {
  await page.goto("/");

  // These are the exact strings from the content layer.
  const expected = ["0.932", "96%", "0.788", "#1 / 350+", "9.28", "3"];

  const rendered = await page.evaluate(() =>
    Array.from(document.querySelectorAll("dl dd")).map((node) =>
      (node.textContent ?? "").trim(),
    ),
  );

  for (const value of expected) {
    expect(rendered, `stat ${JSON.stringify(value)} should render exactly`).toContain(value);
  }
});

test("focused elements get a visible focus ring", async ({ page }) => {
  await page.goto("/");

  const rings: string[] = [];

  for (let i = 0; i < 12; i += 1) {
    await page.keyboard.press("Tab");

    const outline = await page.evaluate(() => {
      const active = document.activeElement;
      if (!active || active === document.body) return null;
      const style = getComputedStyle(active);
      return `${style.outlineStyle}|${style.outlineWidth}|${style.outlineColor}`;
    });

    if (outline) rings.push(outline);
  }

  expect(rings.length).toBeGreaterThan(0);

  // Every focused element must draw an actual outline, not outline: none.
  for (const ring of rings) {
    expect(ring).not.toContain("none|");
    expect(ring).not.toContain("|0px|");
  }
});

test("the Court Mode rail never sits on top of content at 375px", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");

  const overlap = await page.evaluate(() => {
    const rail = document.querySelector('nav[aria-label="Section progress"]');
    if (!rail) return "rail missing";

    const railBox = rail.getBoundingClientRect();
    // .shell spans the full width and holds content clear of the rail with
    // padding, so the content edge is what matters, not the border box.
    const shell = document.querySelector(".shell");
    if (!shell) return "shell missing";

    const shellBox = shell.getBoundingClientRect();
    const paddingLeft = parseFloat(getComputedStyle(shell).paddingLeft);
    const contentLeft = shellBox.left + paddingLeft;

    return contentLeft < railBox.right
      ? `content starts at ${contentLeft}px, rail ends at ${railBox.right}px`
      : null;
  });

  expect(overlap).toBeNull();
});
