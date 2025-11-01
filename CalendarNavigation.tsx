// CalendarNavigation.tsx
import React from 'react';
import { formatHeaderDate } from '../../utils/date.utils';
import { CalendarViewType } from './CalendarView.types';
import clsx from 'clsx'; // Allowed utility

interface CalendarNavigationProps {
    currentDate: Date;
    view: CalendarViewType;
    setView: (view: CalendarViewType) => void;
    goToPreviousPeriod: () => void;
    goToNextPeriod: () => void;
    goToToday: () => void;
}

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => (
    <button
        className={clsx(
            "px-3 py-1 text-sm rounded-md border transition-colors",
            "bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-100",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
            className
        )}
        {...props}
    >
        {children}
    </button>
);

export const CalendarNavigation: React.FC<CalendarNavigationProps> = ({
    currentDate,
    view,
    setView,
    goToPreviousPeriod,
    goToNextPeriod,
    goToToday,
}) => {
    const headerTitle = formatHeaderDate(currentDate, view);

    return (
        <div className="flex justify-between items-center p-4 border-b border-neutral-200">
            {/* Left Controls */}
            <div className="flex space-x-2">
                <Button onClick={goToToday}>Today</Button>
                <div className="flex border border-neutral-300 rounded-md divide-x divide-neutral-300">
                    <Button onClick={goToPreviousPeriod} className="border-0 rounded-r-none">
                        &larr;
                    </Button>
                    <Button onClick={goToNextPeriod} className="border-0 rounded-l-none">
                        &rarr;
                    </Button>
                </div>
            </div>

            {/* Center Title */}
            <h1 className="text-xl font-semibold text-neutral-900">
                {headerTitle}
            </h1>

            {/* Right Controls (View Toggle) */}
            <div className="flex space-x-2">
                {/* View Toggle */}
                <div className="flex border border-neutral-300 rounded-md divide-x divide-neutral-300">
                    <Button
                        onClick={() => setView('month')}
                        className={clsx(
                            "border-0 rounded-r-none",
                            view === 'month' && "bg-primary-500 text-white hover:bg-primary-600"
                        )}
                    >
                        Month
                    </Button>
                    <Button
                        onClick={() => setView('week')}
                        className={clsx(
                            "border-0 rounded-l-none",
                            view === 'week' && "bg-primary-500 text-white hover:bg-primary-600"
                        )}
                    >
                        Week
                    </Button>
                </div>
                {/* Year/Month Picker (Bonus: Implement as a Select component) */}
            </div>
        </div>
    );
};
