# ADR 0002: Build FillGapsQuestion From Scratch

## Status

Accepted

## Context

The `FillGapsQuestion` component requires users to type answers directly into gaps embedded within a sentence or paragraph. This needs editable regions inline with static text.

Three approaches were evaluated.

## Options Considered

### Rejected: `contenteditable` div

Cross-browser behavior is inconsistent and poorly specified. Browsers differ in how they handle paste, cursor position, and DOM mutations.

Additionally, `contenteditable` gives the browser control over the DOM, which creates unpredictable and potentially unsafe JavaScript interactions that are hard to sanitize.

### Rejected: Third-party library

No library maps cleanly to this specific interaction pattern without bringing significant overhead.

Adding an external dependency for a single, well-scoped component is hard to justify, especially when it would reduce flexibility and control over the exact behavior needed.

### Chosen: Custom implementation from scratch

Build the component ourselves for full control over behavior, styling, and validation logic.

This avoids an external dependency and is a good learning exercise for this kind of inline-editing interaction. The component scope is small enough that the cost of building it is low.

## Decision

Build `FillGapsQuestion` as a custom component using standard `<input>` elements positioned inline within rendered text.

This avoids `contenteditable` entirely and requires no third-party dependency.
