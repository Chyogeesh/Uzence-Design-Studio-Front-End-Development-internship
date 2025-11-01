// CalendarView.types.ts

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  color?: string; // Tailwind color class or hex string (e.g., 'bg-blue-500' or '#3b82f6')
  category?: string;
}

export type CalendarViewType = 'month' | 'week';

export interface CalendarViewProps {
  events: CalendarEvent[];
  onEventAdd: (event: Omit<CalendarEvent, 'id'>) => void;
  onEventUpdate: (id: string, updates: Partial<CalendarEvent>) => void;
  onEventDelete: (id: string) => void;
  initialView?: CalendarViewType;
  initialDate?: Date;
}

export interface CalendarCellProps {
  date: Date;
  events: CalendarEvent[];
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  onClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}
