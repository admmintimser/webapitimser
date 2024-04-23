import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';

const DateInput = ({ dispatch, selectedDate, setSelectedDate }) => {
    // Función para manejar el cambio de fecha
    const handleChange = (newDate) => {
        setSelectedDate(newDate);
        if (dispatch) {
            dispatch(newDate);
        }
    };

    return (
        <DatePicker
            selected={selectedDate}
            onChange={handleChange}
            className="date-picker"
            dateFormat="dd/MM/yyyy"
            isClearable={true}
            placeholderText="Selecciona una fecha"
            locale={es}
            showYearDropdown={true}
            showMonthDropdown={true}
            dropdownMode="select"
        />
    );
};

export default DateInput;
