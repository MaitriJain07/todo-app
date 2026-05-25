## ADDED Requirements

### Requirement: User can view all tasks

The system SHALL display every task in the list when the All filter is active.

#### Scenario: All filter shows every task

- **WHEN** the user selects the All filter
- **THEN** every task in the list is visible regardless of completion status

### Requirement: User can view pending tasks only

The system SHALL display only incomplete tasks when the Pending filter is active.

#### Scenario: Pending filter hides completed tasks

- **WHEN** the user selects the Pending filter
- **THEN** only tasks with an unchecked checkbox are visible

#### Scenario: Pending filter shows incomplete tasks

- **WHEN** the user selects the Pending filter and at least one task is incomplete
- **THEN** each incomplete task remains visible

### Requirement: User can view completed tasks only

The system SHALL display only completed tasks when the Completed filter is active.

#### Scenario: Completed filter hides pending tasks

- **WHEN** the user selects the Completed filter
- **THEN** only tasks with a checked checkbox are visible

#### Scenario: Completed tasks remain marked

- **WHEN** the user selects the Completed filter
- **THEN** visible completed tasks SHALL still show as completed (checked checkbox and completed styling)

### Requirement: Filters update instantly without reload

The system SHALL update the visible task list immediately when the filter changes or a task's completion state changes, without reloading the page.

#### Scenario: Instant filter switch

- **WHEN** the user clicks a different filter button
- **THEN** the visible tasks update immediately with no page reload

#### Scenario: Filter updates on completion toggle

- **WHEN** the user toggles a task's checkbox while a Pending or Completed filter is active
- **THEN** the task is shown or hidden immediately according to the active filter

### Requirement: Active filter is visually indicated

The system SHALL highlight the currently selected filter button.

#### Scenario: Active filter button state

- **WHEN** the user selects a filter
- **THEN** that filter's button SHALL have an active visual state distinct from the other filter buttons

### Requirement: Empty state reflects active filter

The system SHALL show a helpful message when no tasks match the active filter.

#### Scenario: No tasks at all

- **WHEN** there are no tasks in the app
- **THEN** the system displays a message indicating no tasks exist yet

#### Scenario: No tasks match pending filter

- **WHEN** the Pending filter is active and every task is completed
- **THEN** the system displays a message indicating there are no pending tasks

#### Scenario: No tasks match completed filter

- **WHEN** the Completed filter is active and no task is completed
- **THEN** the system displays a message indicating there are no completed tasks
