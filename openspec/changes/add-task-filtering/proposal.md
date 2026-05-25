## Why

As users accumulate tasks, they need a quick way to focus on what is left to do versus what is already done. Filtering reduces visual clutter and makes the todo list easier to scan without deleting or hiding tasks permanently.

## What Changes

- Add a filter control with three options: All, Pending, and Completed
- Show or hide tasks in the list based on the active filter
- Update the visible list instantly when the user switches filters or toggles task completion
- Show contextual empty-state messages when a filter has no matching tasks
- Style filter buttons with a clear active state

## Capabilities

### New Capabilities

- `task-filtering`: Let users view all tasks, only incomplete (pending) tasks, or only completed tasks with instant client-side updates

### Modified Capabilities

<!-- None — no existing openspec specs -->

## Impact

- `index.html` — filter button group in the app UI
- `style.css` — filter bar and hidden-task styles
- `script.js` — filter state, apply-filter logic, and empty-message updates
- `SPEC.md` — aligns with the product requirements for this feature
