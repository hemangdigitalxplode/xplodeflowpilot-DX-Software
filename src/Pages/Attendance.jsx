import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import AttendanceMetrics from '../components/AttendanceMetrics'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Attendance = () => {
  const [date, setDate] = useState(new Date());
  const [attendanceDates, setAttendanceDates] = useState([]);

  // ✅ Example static data (replace with API data later)
  useEffect(() => {
    // Example of "present" days (YYYY-MM-DD)
    const presentDays = [
      '2025-11-01',
      '2025-11-05',
      '2025-11-08',
      '2025-11-13',
    ];
    setAttendanceDates(presentDays);
  }, []);


  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Header />
        <div className="p-4">
          <div className='d-flex align-items-center justify-content-between flex-wrap mb-4'>
            {/* Left Section */}
            <div>
              <h3>Attendance</h3>
              <p className='mb-0'>
                View and manage your attendance records here. Check in/out timings, leave status, and more.
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">
              {date.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h5>

            <input
              type="month"
              className="form-control form-control-sm"
              style={{ width: '200px' }}
              value={`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`}
              onChange={(e) => {
                const [year, month] = e.target.value.split('-');
                setDate(new Date(year, month - 1));
              }}
            />
          </div>


          <div className='row p-2'>
            <div className='col-md-8 col-12'>
              <div className="border rounded p-3 bg-white">
                <Calendar
                  onChange={setDate}
                  value={date}
                  view="month"
                  className="w-100 border-0"
                  tileClassName={({ date, view }) => {
                    if (view === 'month') {
                      const formatted = formatDate(date);
                      // 🔹 Highlight green if in attendance list
                      if (attendanceDates.includes(formatted)) {
                        return 'present-day';
                      }
                    }
                    return null;
                  }}
                />
              </div>
            </div>
            <div className='col-md-4 col-12'>
              <AttendanceMetrics
                totalWorkingDays={22}
                totalPresent={18}
                totalAbsents={4}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Attendance