// useCalendar.ts
import { useState, useCallback, useMemo } from 'react';
import { isSameDay, goToNext, goToPrevious } from '../utils/date.utils';
import { CalendarViewType } from '../components/Calendar/CalendarView.types';

interface CalendarState {
  currentDate: Date; // The date determining the current month/week
  view: CalendarViewType;
  selectedDate: Date | null;
}

export const useCalendar = (initialDate: Date = new Date(), initialView: CalendarViewType = 'month') => {
  const [state, setState] = useState<CalendarState>({
    currentDate: initialDate,
    view: initialView,
    selectedDate: null,
  });

  const goToNextPeriod = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentDate: goToNext(prev.currentDate, prev.view),
    }));
  }, []);

  const goToPreviousPeriod = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentDate: goToPrevious(prev.currentDate, prev.view),
    }));
  }, []);

  const goToToday = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentDate: new Date(),
    }));
  }, []);

  const setView = useCallback((newView: CalendarViewType) => {
    setState(prev => ({
      ...prev,
      view: newView,
    }));
  }, []);

  const setSelectedDate = useCallback((date: Date) => {
    setState(prev => ({
        ...prev,
        selectedDate: isSameDay(date, prev.selectedDate || new Date(0)) ? null : date,
    }));
  }, []);

  // Use useMemo to ensure stability if passed to children
  const calendarState = useMemo(() => ({
    ...state,
    goToNextPeriod,
    goToPreviousPeriod,
    goToToday,
    setView,
    setSelectedDate,
  }), [state, goToNextPeriod, goToPreviousPeriod, goToToday, setView, setSelectedDate]);

  return calendarState;
};
