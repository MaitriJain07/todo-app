## Context

The todo app is a vanilla HTML/CSS/JavaScript project with no framework. Tasks are rendered as `<li class="task-item">` elements with a checkbox, text label, and delete button. Completion is tracked via the checkbox `checked` state and a `completed` CSS class for styling. The root `SPEC.md` defines filter requirements: All, Pending, and Completed views with instant updates and no page reload.

## Goals / Non-Goals

**Goals:**

- Add three filter buttons (All, Pending, Completed) above the task list
- Show or hide tasks client-side based on checkbox completion state
- Re-apply the active filter when tasks are added, completed, or deleted
- Display filter-specific empty messages when no tasks match
- Highlight the active filter button

**Non-Goals:**

- Persisting the selected filter in `localStorage`
- URL query parameters or browser history for filter state
- Server-side filtering or pagination
- Editing or deleting tasks only within the active filter (all tasks remain in the DOM)

## Decisions

1. **Filter state in a `currentFilter` variable (`"all" | "pending" | "completed"`)**
   - Rationale: Simple to read and matches the three buttons; no need for a state machine.
   - Alternative: Derive filter from DOM `aria-pressed` only — rejected because JS still needs a single source of truth for empty messages.

2. **Use checkbox `checked` as completion source of truth**
   - Rationale: Matches user-visible state; avoids bugs when the `completed` class and checkbox drift apart.
   - Alternative: `classList.contains("completed")` only — rejected after bugs where styling class did not reflect filter logic.

3. **Hide non-matching tasks with a CSS class (`hidden-by-filter` + `display: none !important`)**
   - Rationale: `.task-item { display: flex }` overrides the HTML `hidden` attribute, which caused all tasks to remain visible.
   - Alternative: Remove nodes from the DOM — rejected because re-rendering would complicate event listeners and lose scroll position.

4. **Event delegation on `.filters` for button clicks**
   - Rationale: One listener, reliable `data-filter` reads via `getAttribute`, easy to extend.
   - Alternative: Per-button listeners at load time — acceptable but slightly more boilerplate.

5. **Empty messages scoped to the active filter**
   - Rationale: "No pending tasks" is clearer than a generic empty list when other tasks exist but are hidden.

## Risks / Trade-offs

- **[Risk] CSS `display: flex` hides `hidden` attribute** → Mitigation: use `.hidden-by-filter` with `!important`
- **[Risk] Filter feels broken if completion state is wrong** → Mitigation: read `checkbox.checked` in `applyFilter()`
- **[Trade-off] Hidden tasks stay in the DOM** → Acceptable for a small client-side list; keeps implementation beginner-friendly
