# ADR 0001: Use Zustand for Test Constructor State

## Status

Accepted

## Context

The Test Constructor has local editor state that is shared across several nested UI components. Passing this state and update handlers through every level would create prop drilling and make the constructor harder to read.

This state is currently local to the constructor experience. It does not need a heavier or more ambiguous state architecture.

## Decision

Use Zustand for Test Constructor state.

I chose Zustand because it keeps the constructor state readable with very little boilerplate. For this small use case, the main goal is to avoid prop drilling while keeping the code as straightforward as possible.

The constructor should stay easy to follow: minimal setup, clear update actions, and as little code as possible.

## Consequences

- Components can read and update constructor state without long prop chains.
- State logic stays centralized without introducing a larger architecture.
- The implementation remains small and readable.
- If constructor state becomes server-driven or much more complex later, this decision can be revisited.
