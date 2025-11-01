CalendarView.tsx: Use useCalendar to manage state and render CalendarNavigation. Conditionally render MonthView or WeekView based on the view state.

MonthView.tsx: Use getMonthGrid utility to render the 42 cells. Map over the grid, calculate isCurrentMonth, isToday, and pass the required props to CalendarCell.

CalendarCell.tsx: Implement the visual requirements (gray out adjacent month days, highlight today, event count badge) and the required ARIA and keyboard navigation logic.

EventModal.tsx: Build the accessible modal component and forms for event creation/editing with validation.
