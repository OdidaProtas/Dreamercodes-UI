import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useMemo } from "react";

const localizer = momentLocalizer(moment);
const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: "lightblue",
    },
  });
const events = [
  {
    id: 0,
    title: "Board meeting",
    start: new Date(2018, 0, 29, 9, 0, 0),
    end: new Date(2018, 0, 29, 13, 0, 0),
    resourceId: 1,
  },
  {
    id: 1,
    title: "MS training",
    allDay: true,
    start: new Date(2018, 0, 29, 14, 0, 0),
    end: new Date(2018, 0, 29, 16, 30, 0),
    resourceId: 2,
  },
  {
    id: 2,
    title: "Team lead meeting",
    start: new Date(2018, 0, 29, 8, 30, 0),
    end: new Date(2018, 0, 29, 12, 30, 0),
    resourceId: 3,
  },
  {
    id: 11,
    title: "Birthday Party",
    start: new Date(2018, 0, 30, 7, 0, 0),
    end: new Date(2018, 0, 30, 10, 30, 0),
    resourceId: 4,
  },
];

const resourceMap = [
  { resourceId: 1, resourceTitle: "Board room" },
  { resourceId: 2, resourceTitle: "Training room" },
  { resourceId: 3, resourceTitle: "Meeting room 1" },
  { resourceId: 4, resourceTitle: "Meeting room 2" },
];

export const MyCalendar = (props) => {
  const { components, defaultDate } = useMemo(
    () => ({
      components: {
        timeSlotWrapper: ColoredDateCellWrapper,
      },
      defaultDate: new Date(2018, 1, 30),
    }),
    []
  );
  return (
    <div>
      <Calendar
        components={components}
        defaultDate={defaultDate}
        events={events}
        localizer={localizer}
        showMultiDayTimes
        step={60}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};
