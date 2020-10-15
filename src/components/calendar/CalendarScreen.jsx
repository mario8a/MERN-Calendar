import React, {useState} from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendar-messages.es';
import 'moment/locale/es';
//components
import { Navbar } from '../ui/Navbar';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
//actions
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';
//idioma de moment
moment.locale('es');

const localizer = momentLocalizer(moment); // or globalizeLocalizer

export const CalendarScreen = () => {
   
   const dispatch = useDispatch();
   //Leer los eventos del store
   const {events, activeEvent} = useSelector(state => state.calendar)
   // console.log(activeEvent)

   const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

   const onDoubleClick = (e) => {
      // console.log(e);
      dispatch(uiOpenModal())
   }

   const onSelectEvent = (e) => {
      // console.log(e);
      // console.log('Click');
      //Hacer dispatch
      dispatch(eventSetActive(e))
   }

   const onViewChange = (e) => {
      setLastView(e);
      localStorage.setItem('lastView', e);
   }

   const onSelectSlot = (e) => {
      //Implementar cuando se de docble click abrir el modal
      // console.log(e); Muestra el lugar donde se da click (fecha del calendario)
      dispatch(eventClearActiveEvent())
   }

   const eventStyleGetter = (event, start, end, isSelected) => {
      const style = {
         backgroundColor: '#367CF7',
         borderRadius: '0px',
         opacity: 0.8,
         display: 'block',
         color: 'white'
      }
      return {
         style
      }
   }

   return (
      <div className="calendar-screen">
         <Navbar/>

         <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            messages={messages}
            eventPropGetter={eventStyleGetter}
            onDoubleClickEvent={onDoubleClick}
            onSelectEvent={onSelectEvent}
            onView={onViewChange}
            onSelectSlot={onSelectSlot}
            selectable={true}
            view={lastView}
            components={{
               event: CalendarEvent
            }}
         />

         <AddNewFab/>
         
         {
            (activeEvent) && <DeleteEventFab/>
         }
         

         <CalendarModal/>


      </div>
   )
}