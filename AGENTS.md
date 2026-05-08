# AGENTS.md

> README for AI coding agents working on **PolyHirn** — a Next.js knowledge testing app for creating, managing, and taking tests.

---

## Project Overview

**PolyHirn** is a full-stack knowledge-testing platform. Users can create quizzes right away, or build test banks and organize quizzes from them, share quizzes with links and QR-codes, manage when a quiz takes place and its duration. After it concludes, review results with analytics. Built with Next.js 16.2.6, React and TypeScript.

**Key capabilities:**
- Quiz/question creation with multiple question types (MCQ, true/false, short answer, connect pairs, essay)
- Quiz sessions with timer, progress tracking, and auto-submit
- Results dashboard with per-test/-question/-student analytics
- Role-based access: Admin, Test Creator, Student

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.6 (App Router, RSC-first) |
| Language | TypeScript (strict mode) |
| Styling | CSS Modules + BEM, standardised CSS variables in `./src/globalStyles/variables.css` |
| Database | MongoDB with Mongoose |
| Auth | NextAuth.js (Auth.js) |
| State | TanStack Query (server state + cache) |
| Forms | React Hook Form |

---

## Architecture & Conventions

### Server vs Client Components
Default to **React Server Components (RSC)**. Add `"use client"` only when you need:
- `useState`, `useEffect`, or other React hooks
- Browser APIs (`window`, `document`)
- Event handlers directly on interactive elements

When `"use client"` is needed, try to isolate it in a small child component rather than marking a large parent as client.

```tsx
// Good — server component fetches data directly
export default async function QuizPage({ params }: { params: { id: string } }) {
  const quiz = await getQuiz(params.id);
  return <QuizView quiz={quiz} />;
}

// Good — client component handles interactivity only
"use client";
export function QuizTimer({ durationSeconds }: { durationSeconds: number }) {
  const [remaining, setRemaining] = useState(durationSeconds);
  // ...
}
```

**Never add `"use client"` to layout files.**

---

### CSS and Styling

Always use **CSS Modules** for component-scoped styles. Never write global CSS for component styles.

**Always reference `./src/globalStyles/variables.css` before using any value for:**
- Colors
- Spacing / sizing
- Border radius
- Font sizes / weights
- Animation durations / easing
- Shadows or any other design token

If the value you need does not exist as a variable, **do not hardcode it**. Instead, create a new CSS variable in `variables.css` and use it. Notify the developer so they can review the addition.

```css
/* Good — uses existing variable */
.button {
  background: var(--color-primary);
  padding: var(--spacing-md);
}

/* Bad — hardcoded values */
.button {
  background: #5c6ac4;
  padding: 12px 16px;
}
```

---

#### BEM in CSS Modules

Use **BEM methodology** when any of the following is true:
- A block has multiple distinct internal parts (elements: `__part`)
- The same element can appear in different visual states or variants (modifiers: `--active`, `--disabled`, `--large`)
- Multiple elements share a parent block in the same CSS file

Keep class names **flat per component**. Never nest BEM to reflect DOM depth (`dropdown__menu__item__icon` is wrong). The CSS Module provides scoping — BEM only needs to encode *what the part is* and *what state it's in*.

```tsx
// Good
import styles from "./Dropdown.module.css";

<div className={styles.dropdown}>
  <button className={styles.button}>Open</button>
  <ul className={styles.list}>
    <li className={styles.item}>Option 1</li>
    <li className={clsx(styles.item, styles["item--active"])}>Option 2</li>
  </ul>
</div>
```

```css
/* Good — flat, BEM only where meaningful */
.dropdown { position: relative; }
.button { padding: var(--spacing-sm) var(--spacing-md); }
.list { list-style: none; margin: 0; padding: 0; }
.item { padding: var(--spacing-xs) var(--spacing-sm); }
.item--active { background: var(--color-surface-hover); }
```

```tsx
// Bad — over-BEM, reflects DOM hierarchy instead of state
<div className={styles["dropdown__container"]}>
  <ul className={styles["dropdown__menu__list"]}>
    <li className={styles["dropdown__menu__item--active"]}>...</li>
  </ul>
</div>
```

---

#### clsx

Use `clsx` whenever an element has:
- A **conditional** class (applied only when some state is true)
- A **dynamic** class (the class name itself varies at runtime, e.g. `styles[`item--${variant}`]`)
- **Two or more classes combined** on one element

```tsx
// Good
import clsx from "clsx";

<li className={clsx(styles.item, isActive && styles["item--active"])} />
<div className={clsx(styles.card, styles[`card--${size}`])} />

// Bad — ternary string concat instead of clsx
<li className={`${styles.item} ${isActive ? styles["item--active"] : ""}`} />
```

---

### Component Decomposition

#### One responsibility per component
Each component should do **one thing**: either render a piece of UI, manage a specific piece of state, or orchestrate children — not all at once. A good signal that a component needs splitting: you struggle to name it without using "and".

**Do not over-decompose.** If a sub-piece has no reuse potential, no independent state, and is only a few elements, keeping it inline is fine. Decompose when it makes the parent *meaningfully* simpler or when the child has standalone value.

#### Hook complexity threshold
If a component uses **more than 3 React hooks** (excluding `useRef` and context reads), extract the stateful logic into a dedicated custom hook. The component should receive values and callbacks from the hook, not manage the logic itself.

```tsx
// Good — logic lives in a hook
export function QuizTimer({ durationSeconds }: TQuizTimerProps) {
  const { remaining, isExpired, pause } = useQuizTimer(durationSeconds);
  return <TimerDisplay remaining={remaining} onPause={pause} />;
}

// Bad — component owns too much logic
export function QuizTimer({ durationSeconds }: TQuizTimerProps) {
  const [remaining, setRemaining] = useState(durationSeconds);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();
  useEffect(() => { /* ... */ }, [remaining, isPaused]);
  const handlePause = useCallback(() => { /* ... */ }, []);
  const handleResume = useCallback(() => { /* ... */ }, []);
  // ... rendering
}
```

#### Where code lives

| Type | Location |
|---|---|
| Reusable UI component (used in 2+ places) | `src/components/` |
| Feature-specific component (used in 1 place) | `src/features/<feature>/components/` |
| Reusable hook (`useIsMobile`, `useDebounce`) | `src/hooks/` |
| Feature-specific hook | `src/features/<feature>/hooks/` |
| UI logic / calculation used only by one component | File co-located next to that component |
| Reusable utility / pure function | `src/lib/` or `src/utils/` |
| Store setter helper / model util | `src/features/<feature>/models/utils/` |

**Before writing any new function, hook, or UI component — search the corresponding folder for an existing one.** Do not duplicate existing logic. If you find something close but not quite right, ask before modifying it.

---

### Data Fetching
- **Server components**: call service functions directly (no fetch wrapper needed)
- **Client components**: use TanStack Query; extract into a custom `use*` hook if the query is used in more than one place

---

### Routing & Layouts

Use route groups `(group)` to share layouts without affecting the URL:

```
app/
  (auth)/
  (app)/
    dashboard/
    quizzes/
      [quizId]/
        page.tsx
        edit/
          page.tsx
    tests/
      [testId]/
```

Keep `page.tsx` and `layout.tsx` files thin — they should import and compose components, not contain logic or JSX beyond a top-level wrapper. Every route segment that fetches data must have a `loading.tsx` and an `error.tsx` (both are client components).

---

### Error Handling
- `error.tsx` must be a client component; it receives the error and a reset function
- `loading.tsx` wraps the segment in a Suspense boundary automatically
- Throw typed errors from services; catch them at the route boundary
- Use `notFound()` from `next/navigation` for missing resources
- Write a custom `not-found.tsx` only when the segment needs a unique 404 page

---

## Code Style

### Naming

| Thing | Convention | Example |
|---|---|---|
| Components | `PascalCase` | `QuizCard.tsx` |
| Hooks | `camelCase` prefixed `use` | `useQuizSession.ts` |
| **Types / type aliases** | **`PascalCase` prefixed `T`** | `TQuizz`, `TTrueFalseQuestion` |
| Immutable app-level constants | `SCREAMING_SNAKE_CASE` | `MAX_QUIZ_DURATION` |

**The `T` prefix is required on every type alias and interface, with no exceptions.** This applies whether the type is local to a component, lives in a feature folder, or is a global shared type.

```ts
// Good
type TQuizStatus = "draft" | "active" | "closed";
type TQuizCardProps = { quiz: TQuizz; onSelect: (id: string) => void };

// Bad — missing T prefix
type QuizStatus = "draft" | "active" | "closed";
interface QuizCardProps { ... }
```

`SCREAMING_SNAKE_CASE` is only for values that are immutable, app-level, and exist to avoid magic strings/numbers. Do not use it for every `const`.

---

### Component Structure (order within file)

1. Imports
2. Types / interfaces
3. Small local constants (if any)
4. Component function
5. Helper functions used only by this component
6. Named export at the bottom (no default exports except `page.tsx` / `layout.tsx` files)

```tsx
import { type FC } from "react";
import { type TQuestion } from "@/types";
import styles from "./QuestionCard.module.css";

type TQuestionCardProps = {
  question: TQuestion;
  index: number;
  onSelect?: (id: string) => void;
};

export const QuestionCard: FC<TQuestionCardProps> = ({ question, index, onSelect }) => {
  return (
    <div className={styles.card}>
      <span className={styles.index}>Q{index + 1}</span>
      <p className={styles.text}>{question.text}</p>
    </div>
  );
};
```

---

### TypeScript
- Strict mode is enabled — no `any`, no type assertions without an explanatory comment
- Prefer `type` imports: `import { type TFoo } from "..."`
- Co-locate feature-specific types with the feature; global shared types go in `src/types/`
- Use discriminated unions for question types

---

## Safety & Permissions

### Do without asking
- Read files, list directories
- Create new components, hooks, services, schemas
- Add new CSS variables to `variables.css` (but notify the developer)
- Update `AGENTS.md` with new learnings

### Ask before doing
- Installing or removing packages (`npm add` / `npm remove`)
- Modifying `next.config.ts` or auth configuration
- Rewriting, deleting, or significantly restructuring a component or file that was not part of the current task
- Running `git push` or creating pull requests

### Unsolicited changes
Do **not** rewrite components, rename files, delete code, or add features that were not asked for. If during your work you find a bug, a problematic pattern, or something that looks incorrect, **stop and report it** with a clear description and suggested fix, then wait for approval before touching it.