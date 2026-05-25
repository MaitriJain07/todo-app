## 1. UI — Filter controls

- [x] 1.1 Add a `.filters` button group in `index.html` with All, Pending, and Completed buttons (`data-filter` values: `all`, `pending`, `completed`)
- [x] 1.2 Style filter buttons and active state in `style.css`
- [x] 1.3 Add `.hidden-by-filter` rule with `display: none !important` so filtered-out tasks stay hidden despite `.task-item { display: flex }`

## 2. JavaScript — Filter logic

- [x] 2.1 Add `currentFilter` state and event delegation on `.filters` to update the active filter and button styles
- [x] 2.2 Implement `isTaskCompleted()` using the task checkbox `checked` property
- [x] 2.3 Implement `shouldShowTask()` for `all`, `pending`, and `completed` cases
- [x] 2.4 Implement `applyFilter()` to toggle `hidden-by-filter` on each `.task-item`
- [x] 2.5 Call `applyFilter()` after add, delete, and checkbox change events

## 3. Empty states and verification

- [x] 3.1 Update `updateEmptyMessage()` for global empty, no pending, and no completed cases
- [x] 3.2 Manually verify: All shows every task; Pending shows only unchecked; Completed shows only checked; switching is instant with no reload
