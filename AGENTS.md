<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS.md

> README for AI coding agents working on **PolyHirn** — a Next.js knowledge testing app for creating, managing, and taking tests.

---

## Project Overview 

**PolyHirn** is a full-stack knowledge-testing platform. Users can create quizzes right away, or build test banks and organize quizzes from them, share quizzes with links and qr-codes, manage when quizz takes time and it's duration. And after it took place, review results with analytics. Built with NextJs 16, React and Typescript. Current versions and all the tools can be checked in ./package.json. 

**Key capabilities:**
- Quizz/questions creating with multiple question types (MCQ, true/false, short answer, connect pairs, essay)
- Quiz sessions with timer, progress tracking, and auto-submit
- Results dashboard with per-test/-question/-student analytics
- Role-based access: Admin, Test creator, student

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, RSC-first) |
| Language | TypeScript (strict mode) |
| Styling | React modules, standartised CSS variables in folder ./src/globalStyles/variables.css |
| Database | MongoDB with mongoose |
| Auth | NextAuth.js (Auth.js) |
| State | TanStack Query (server state + cache) |
| Forms | React Hook Form |

---

## Architecture & Conventions

### Server vs Client Components
Default to **React Server Components (RSC)**. Add `"use client"` only when you need:
- `useState`, `useEffect`, or other React hooks
- Browser APIs (window, document)
- Event handlers directly on interactive elements

if it's still needed, try to divide the client functional in separate components if it makes sense.

```tsx
// Good - server component fetches data directly
export default async function QuizPage({ params }: { params: { id: string } }) {
  const quiz = await getQuiz(params.id); // direct DB/service call
  return <QuizView quiz={quiz} />;
}

// Good - client component handles interactivity only
"use client";
export function QuizTimer({ durationSeconds }: { durationSeconds: number }) {
  const [remaining, setRemaining] = useState(durationSeconds);
  // ...
}
```

## Data Fetching
- **Server components**: call service functions directly (no fetch wrapper needed)
- **Client components**: use TanStack Query and create custom reusable hooks when needed`

### Routing & Layouts
Use route groups `(group)` to share layouts without affecting the URL:

```
app/
  (auth)/               # Auth layout (login, register)
  (app)/                # Authenticated app layout
    dashboard/
    quizzes/
      [quizId]/
        page.tsx        # Quiz detail
        edit/
          page.tsx      # Edit quiz
    tests/
      [testId]/
```

But try to write as less code in page.tsx and layout.tsx as possible.
Move most of the code in components or features folders.

---

### Error Handling
- Route segments must have `error.tsx` (client component) and `loading.tsx`
- Throw typed errors from services; catch them at the route boundary
- Use `notFound()` from `next/navigation` for missing resources and write your own not-found.tsx
but only if unique one is needed.

---

## Code Style

### Naming
- Components: `PascalCase` — `QuizCard.tsx`
- Hooks: `camelCase` prefixed with `use` — `useQuizSession.ts`
- Types/interfaces: `PascalCase` prefixed with `T` at start, types preferred over interfaces. Use interfaces only when it's absolutely needed.
- Constellations that are not supposed to be changed and used to avoid "magic numbers/strings": `SCREAMING_SNAKE_CASE`. Don't name every const like that. Only ones that i've described.

// Good — good naming
TQuizz, TTrueFalseQuestion

// Bad - not my convention
QuizzType, TrueOrFalseQuestion

---

### Component structure (order within file)
1. Imports
2. Types / interfaces
3. Constants (if small)
4. Component function
5. Helper functions used only by this component
6. Named export at bottom (no default exports except page/layout files)

```tsx
// ✅ Good component structure
import { type FC } from "react";
import { Badge } from "@/components/ui/badge";
import { type Question } from "@/types";

interface QuestionCardProps {
  question: Question;
  index: number;
  onSelect?: (id: string) => void;
}

export const QuestionCard: FC<QuestionCardProps> = ({ question, index, onSelect }) => {
  return (
    <div className="rounded-lg border p-4">
      <span className="text-sm text-muted-foreground">Q{index + 1}</span>
      <p className="mt-1 font-medium">{question.text}</p>
      <Badge variant="secondary">{question.type}</Badge>
    </div>
  );
};
```

### TypeScript
- Strict mode is enabled — no `any`, no type assertions without a comment explaining why
- Prefer `type` imports: `import { type Foo } from "..."`
- Co-locate feature-specific types with the feature; global shared types go in `src/types/`
- Use discriminated unions for question types.

---

## Do / Don't

### Do
- Default to RSC; add `"use client"` as late as possible
- Keep page files thin — extract logic to services and components
- Use `loading.tsx` and `error.tsx` for every route segment that fetches data
- Use `notFound()` for 404 cases — never return `null` from a page silently

### Don't
- Don't add `"use client"` to layout files
- Don't use `useEffect` for data fetching — use TanStack Query
- Don't hard-code colours, borders, spacings etc. - first check ./src/globalStyles/variables.css
- Don't install new heavy dependencies without asking first
- Don't commit `.env` files or secrets

---

## Safety & Permissions

**Do without asking:**
- Read files, list directories
- Create new components, hooks, services, schemas
- Update `AGENTS.md` with new learnings

**Ask before:**
- Installing or removing packages (`npm add` / `npm remove`)
- Modifying `next.config.ts`, or auth configuration
- Running `git push` or creating pull requests
- Making anything that can change the project drastically or can need human responsibility or desicions.

---