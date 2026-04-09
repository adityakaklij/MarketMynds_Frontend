/**
 * Strips Meta / GTM "fbclid → _fbc" custom HTML that was pasted without a proper
 * script context and ends up as visible text (often only on WebKit / mobile / embedded browsers).
 * Does not touch real <script> contents.
 */

const MARKERS = ["getFbclid", "getParameterByName", "document.cookie"] as const;

function isLeakedSnippetText(raw: string): boolean {
  const t = raw.trim();
  if (t.length < 80) return false;
  return MARKERS.every((m) => t.includes(m));
}

function shouldIgnoreTextParent(parent: Element | null): boolean {
  if (!parent) return true;
  const tag = parent.tagName;
  if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT") return true;
  return parent.closest("script, style, noscript") != null;
}

export function removeLeakedFacebookSnippetNodes(root: ParentNode): void {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (shouldIgnoreTextParent((node as Text).parentElement)) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const textHits: Text[] = [];
  let n: Node | null;
  while ((n = walker.nextNode())) {
    if (isLeakedSnippetText(n.textContent ?? "")) textHits.push(n as Text);
  }
  textHits.forEach((t) => t.remove());

  let changed = true;
  while (changed) {
    changed = false;
    for (const el of root.querySelectorAll("*")) {
      if (el.tagName === "SCRIPT" || el.tagName === "STYLE") continue;
      if (el.closest("script, style, noscript")) continue;
      if (el.children.length > 0) continue;
      if (!isLeakedSnippetText(el.textContent ?? "")) continue;
      el.remove();
      changed = true;
      break;
    }
  }
}

/**
 * Runs cleanup immediately, on several delays (late GTM), and on subtree mutations.
 * Returns a disposer (mainly for tests).
 */
export function installLeakedFacebookSnippetCleanup(): () => void {
  const run = () => {
    const root = document.documentElement;
    if (root) removeLeakedFacebookSnippetNodes(root);
  };

  run();

  const timeouts = [50, 150, 400, 1000, 2500, 6000].map((ms) =>
    window.setTimeout(run, ms),
  );

  let raf = 0;
  const scheduleRaf = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(run);
  };
  scheduleRaf();

  const obs = new MutationObserver((records) => {
    const added = records.some((r) => r.addedNodes.length > 0);
    if (!added) return;
    scheduleRaf();
  });
  obs.observe(document.documentElement, { childList: true, subtree: true });

  return () => {
    timeouts.forEach((id) => window.clearTimeout(id));
    cancelAnimationFrame(raf);
    obs.disconnect();
  };
}
