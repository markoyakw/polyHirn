
// CSS generation helpers
// Used by both layout.tsx (runtime) and there (build time)

import { baseTokens, darkTokens, lightTokens, type TokenValue } from "./variableTokens";

/** Converts a flat token map to CSS custom property declarations */
function tokensToCssVars(tokens: Record<string, TokenValue>): string {
    return Object.entries(tokens)
        .map(([key, value]) => `  --${key}: ${value};`)
        .join('\n');
}

/**
 * Generates the full CSS string for all themes.
 * :root gets base + dark tokens (dark-first approach).
 * html.light overrides with light tokens using next-themes
 */

export default function generateCssVariables(): string {
    const root = [
        tokensToCssVars(baseTokens),
        tokensToCssVars(darkTokens),
    ].join('\n');

    const light = tokensToCssVars(lightTokens);

    return [
        `:root {\n${root}\n}`,
        `html.light {\n${light}\n}`,
    ].join('\n\n');
}
