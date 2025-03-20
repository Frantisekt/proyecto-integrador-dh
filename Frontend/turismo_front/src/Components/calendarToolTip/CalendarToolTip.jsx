import { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./CalendarToolTip.module.css";
import { parseISO, isWithinInterval, isSameDay, addDays, differenceInMonths } from "date-fns";

const CalendarTooltip = ({ startDate, endDate, children }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const modalRef = useRef(null);

  const start = parseISO(startDate);
  const end = parseISO(endDate);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar]);

  const tileClassName = ({ date }) => {
    if (isSameDay(date, start) || isSameDay(date, end)) {
      return styles.highlightedStartEnd;
    }
    if (isWithinInterval(date, { start: addDays(start, 1), end: addDays(end, -1) })) {
      return styles.highlightedRange;
    }
    return "";
  };

  return (
    <div className="position-relative d-inline-block">
      <div onClick={() => setShowCalendar(true)}>{children}</div>
      {showCalendar && (
        <div ref={modalRef} className={`${styles.calendarPopup} p-3 shadow-lg rounded bg-white text-dark`}>
          <div className="d-flex gap-3 justify-content-center">
            <Calendar tileClassName={tileClassName} value={start} className="p-2 border-0" />
            {differenceInMonths(end, start) > 0 && (
              <Calendar tileClassName={tileClassName} value={end} className="p-2 border-0" />
            )}
          </div>
          <div className="d-flex justify-content-center mt-3">
            <button className="btn btn-danger fw-bold" onClick={() => setShowCalendar(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarTooltip;