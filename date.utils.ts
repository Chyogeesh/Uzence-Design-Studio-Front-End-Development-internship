// date.utils.ts
import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameDay as dateFnsIsSameDay,
  isSameMonth as dateFnsIsSameMonth,
  format,
  getDay,
  subMonths,
  addMonths,
  addWeeks,
  subWeeks,
} from 'date-fns';

/**
 * Checks if two dates fall on the same day (ignores time)
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return dateFnsIsSameDay(date1, date2);
};

/**
 * Checks if two dates fall in the same month
 */
export const isSameMonth = (date1: Date, date2: Date): boolean => {
  return dateFnsIsSameMonth(date1, date2);
};

/**
 * Gets the calendar grid (42 cells for month view) for the given month.
 * The grid starts on the Sunday of the week that includes the 1st of the month.
 */
export const getMonthGrid = (date: Date): Date[] => {
  const firstDayOfMonth = startOfMonth(date);
  const lastDayOfMonth = endOfMonth(date);

  // Start the grid on the Sunday of the first week (startOfWeek uses default locale, typically Sunday=0)
  const startDate = startOfWeek(firstDayOfMonth);
  
  // End the grid on the Saturday of the sixth week
  const endDate = addWeeks(startDate, 5); // 6 weeks total = start + 5 more weeks

  return eachDayOfInterval({ start: startDate, end: endDate });
};

/**
 * Gets the 7 days for the week view centered around the given date.
 */
export const getWeekDays = (date: Date): Date[] => {
  const start = startOfWeek(date);
  const end = endOfWeek(date);
  return eachDayOfInterval({ start, end });
};

/**
 * Filters events that occur on the specified day (ignoring time).
 */
export const getEventsForDay = (events: CalendarEvent[], day: Date): CalendarEvent[] => {
  return events.filter(event => {
    // Check if the event overlaps with the day
    const eventStartDay = startOfDay(event.startDate);
    const eventEndDay = endOfDay(event.endDate);
    const targetDayStart = startOfDay(day);
    const targetDayEnd = endOfDay(day);

    // Simple check: event starts before or on the target day's end, AND
    // event ends after or on the target day's start.
    return (
        eventStartDay <= targetDayEnd && 
        eventEndDay >= targetDayStart
    );
  });
};

// Helper for start/end of day to simplify comparisons
const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
const endOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);

// Navigation Functions
export const goToNext = (date: Date, view: CalendarViewType): Date => {
    if (view === 'month') return addMonths(date, 1);
    return addWeeks(date, 1);
};

export const goToPrevious = (date: Date, view: CalendarViewType): Date => {
    if (view === 'month') return subMonths(date, 1);
    return subWeeks(date, 1);
};

export const formatHeaderDate = (date: Date, view: CalendarViewType): string => {
    if (view === 'month') {
        return format(date, 'MMMM yyyy');
    }
    // Week view shows the range of the week
    const weekStart = startOfWeek(date);
    const weekEnd = endOfWeek(date);
    const startMonth = format(weekStart, 'MMM');
    const endMonth = format(weekEnd, 'MMM');

    if (startMonth === endMonth) {
      return `${startMonth} ${format(weekStart, 'do')} - ${format(weekEnd, 'do')}, ${format(weekEnd, 'yyyy')}`;
    }
    return `${startMonth} ${format(weekStart, 'do')} - ${endMonth} ${format(weekEnd, 'do')}, ${format(weekEnd, 'yyyy')}`;
};

export const getDayNames = (locale: Locale | undefined = undefined): string[] => {
    const days = [0, 1, 2, 3, 4, 5, 6].map(dayIndex => 
        format(new Date(2023, 0, 1 + dayIndex), 'eee', { locale }) // Start from Jan 1, 2023 which is a Sunday
    );
    // Move Sunday to the end if you want week to start on Monday, otherwise it's fine.
    // Assuming week starts on Sunday for this challenge as is standard in many US locales.
    return days;
}
