import React, { useState, useMemo, useCallback } from 'react';
import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameDay,
    addMonths,
    subMonths,
    getDay,
    isToday as isTodayFn,
    getYear,
    getMonth,
    setYear,
    setMonth,
    parseISO,
} from 'date-fns';
import { enGB } from 'date-fns/locale'; // For English Great Britain locale (Mon-Sun week)

// Type definition for a simple event/note
interface CalendarEvent {
    date: string; 
    notes: string[];
}

const Calendar: React.FC = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date()); // Start with today selected
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [showEventInput, setShowEventInput] = useState(false);
    const [newEventText, setNewEventText] = useState('');
    const [activeDateForEvent, setActiveDateForEvent] = useState<Date | null>(null);

    // Memoize month and year for efficiency
    const month = getMonth(currentMonth);
    const year = getYear(currentMonth);

    // --- Calendar Day Generation ---
    const daysInMonth = useMemo(() => {
        const startDate = startOfMonth(currentMonth);
        const endDate = endOfMonth(currentMonth);
        return eachDayOfInterval({ start: startDate, end: endDate });
    }, [currentMonth]);

    const startingDayOfWeek = useMemo(() => {
        return getDay(startOfMonth(currentMonth)); // 0 for Sunday, 1 for Monday, etc.
    }, [currentMonth]);

    const renderCalendarDays = useCallback(() => {
        const days = [];
        // Add empty divs for preceding days of the week
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-day-xp empty"></div>);
        }

        // Add actual days of the month
        daysInMonth.forEach((day, index) => {
            const isCurrentDay = isSameDay(day, new Date());
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const hasEvent = events.some(event => isSameDay(parseISO(event.date), day));

            days.push(
                <button
                    key={index}
                    className={`calendar-day-xp ${isCurrentDay ? 'today' : ''} ${isSelected ? 'selected' : ''} ${hasEvent ? 'has-event' : ''}`}
                    onClick={() => handleDayClick(day)}
                >
                    {format(day, 'd')}
                </button>
            );
        });
        return days;
    }, [daysInMonth, startingDayOfWeek, selectedDate, events]);

    // --- Navigation Handlers ---
    const goToPreviousMonth = () => {
        setCurrentMonth((prev) => subMonths(prev, 1));
        setSelectedDate(null); // Deselect date when changing month
    };

    const goToNextMonth = () => {
        setCurrentMonth((prev) => addMonths(prev, 1));
        setSelectedDate(null); // Deselect date when changing month
    };

    const goToToday = () => {
        const today = new Date();
        setCurrentMonth(today);
        setSelectedDate(today);
    };

    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newMonth = parseInt(event.target.value, 10);
        setCurrentMonth(prev => setMonth(prev, newMonth));
        setSelectedDate(null);
    };

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newYear = parseInt(event.target.value, 10);
        setCurrentMonth(prev => setYear(prev, newYear));
        setSelectedDate(null);
    };

    // --- Day Click and Event Handling ---
    const handleDayClick = (date: Date) => {
        setSelectedDate(date);
        setActiveDateForEvent(date);
        setShowEventInput(true); // Show event input when a day is clicked
        const existingEvent = events.find(event => isSameDay(parseISO(event.date), date));
        setNewEventText(existingEvent ? existingEvent.notes.join('\n') : '');
    };

    const handleAddEvent = () => {
        if (!activeDateForEvent || !newEventText.trim()) return;

        const dateISO = format(activeDateForEvent, 'yyyy-MM-dd');
        const notes = newEventText.split('\n').map(note => note.trim()).filter(note => note.length > 0);

        setEvents(prevEvents => {
            const existingIndex = prevEvents.findIndex(event => event.date === dateISO);
            if (notes.length === 0) { // If notes are empty, remove the event
                return prevEvents.filter(event => event.date !== dateISO);
            } else if (existingIndex > -1) {
                // Update existing event
                const updatedEvents = [...prevEvents];
                updatedEvents[existingIndex] = { date: dateISO, notes };
                return updatedEvents;
            } else {
                // Add new event
                return [...prevEvents, { date: dateISO, notes }];
            }
        });
        setShowEventInput(false); // Hide input after saving/deleting
        setNewEventText('');
        setActiveDateForEvent(null);
    };

    const handleDeleteEvent = () => {
        if (!activeDateForEvent) return;
        const dateISO = format(activeDateForEvent, 'yyyy-MM-dd');
        setEvents(prevEvents => prevEvents.filter(event => event.date !== dateISO));
        setShowEventInput(false);
        setNewEventText('');
        setActiveDateForEvent(null);
    }

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    // date-fns' getDay returns 0 for Sunday. Adjust for Monday start if desired, but XP starts Sunday.
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Generate years for the dropdown
    const years = Array.from({ length: 201 }, (_, i) => 1950 + i); // 1950 to 2150

    const selectedDayEvents = activeDateForEvent 
        ? events.find(event => isSameDay(parseISO(event.date), activeDateForEvent)) 
        : null;

    return (
        <div className="w-[300px] h-fit p-2 bg-[#EFEFEF] border border-[#7B8BBA] shadow-md rounded-sm font-xp text-sm select-none flex flex-col">
            {/* Header: Month/Year Navigation */}
            <div className="flex justify-between items-center bg-[#D4D0C8] border border-[#808080] p-1 mb-2">
                <button
                    onClick={goToPreviousMonth}
                    className="btn-calendar-nav"
                >
                    &lt;
                </button>
                <div className="flex items-center space-x-1">
                    {/* Month Dropdown */}
                    <select
                        value={month}
                        onChange={handleMonthChange}
                        className="calendar-dropdown"
                    >
                        {monthNames.map((name, index) => (
                            <option key={name} value={index}>{name}</option>
                        ))}
                    </select>
                    {/* Year Dropdown */}
                    <select
                        value={year}
                        onChange={handleYearChange}
                        className="calendar-dropdown"
                    >
                        {years.map((y) => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                </div>
                <button
                    onClick={goToNextMonth}
                    className="btn-calendar-nav"
                >
                    &gt;
                </button>
            </div>

            {/* Days of Week */}
            <div className="grid grid-cols-7 text-center font-bold text-xs mb-1 px-[2px]">
                {dayNames.map((day, index) => (
                    <div key={day} className={`text-gray-700 ${index === 0 || index === 6 ? 'text-blue-700' : ''}`}> {/* Weekends in blue */}
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7 gap-[2px] text-center text-sm flex-grow">
                {renderCalendarDays()}
            </div>

            {/* Today Button */}
            <div className="flex justify-center mt-2">
                <button
                    onClick={goToToday}
                    className="btn-calendar-today"
                >
                    Today: {format(new Date(), 'MM/dd/yyyy')}
                </button>
            </div>

            {/* Event Input Section */}
            {showEventInput && activeDateForEvent && (
                <div className="mt-4 p-2 border border-[#808080] bg-[#D4D0C8] flex flex-col gap-2">
                    <h4 className="text-sm font-bold text-gray-800">
                        Notes for {format(activeDateForEvent, 'PPPP', { locale: enGB })}
                    </h4>
                    <textarea
                        className="w-full h-20 p-1 border border-gray-400 focus:outline-none focus:border-blue-500 text-gray-800 bg-white resize-none"
                        value={newEventText}
                        onChange={(e) => setNewEventText(e.target.value)}
                        placeholder="Add your notes here (each line is a new note)..."
                    />
                    <div className="flex justify-end gap-2">
                        <button className="btn-calendar-action" onClick={handleAddEvent}>
                            {selectedDayEvents ? 'Update Notes' : 'Add Notes'}
                        </button>
                        {selectedDayEvents && (
                            <button className="btn-calendar-action delete" onClick={handleDeleteEvent}>
                                Delete Notes
                            </button>
                        )}
                        <button className="btn-calendar-action" onClick={() => setShowEventInput(false)}>
                            Cancel
                        </button>
                    </div>
                    {selectedDayEvents && selectedDayEvents.notes.length > 0 && (
                        <div className="mt-2 text-xs text-gray-700">
                            <strong>Current Notes:</strong>
                            <ul className="list-disc pl-4 mt-1">
                                {selectedDayEvents.notes.map((note, idx) => (
                                    <li key={idx}>{note}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Calendar;