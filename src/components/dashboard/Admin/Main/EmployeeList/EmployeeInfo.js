/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Paper, Select, MenuItem, Button } from '@mui/material';
import { handleViewEmployeeInfo } from '../../../../common/services';
import './EmployeeInfo.css';

const EmployeeInfo = ({ employeedId, token, setIsViewEmployee }) => {
  const [rows, setRows] = useState([]);
  const [employeeInfo, setEmployeeInfo] = useState('');
  const [employeeTimeSheetList, setEmployeeTimeSheetList] = useState([]);
  const [filterEmployeeSheet, setFilterEmployeeSheet] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const createData = (no, date, checkInTime, checkoutTime, totalWorkingHours) => {
    return { no, date, checkInTime, checkoutTime, totalWorkingHours };
  }

  useEffect(() => {
    getEmplyeeTimeSheet()
  }, [])

  useEffect(() => {
    if (employeeTimeSheetList.length || filterEmployeeSheet.length) {
      const empData = (selectedDate || selectedMonth) ? filterEmployeeSheet : employeeTimeSheetList
      const rows = empData.map((value, i) => createData(`${i + 1}`, value?.date, value.checkIn, value.checkOut, value?.workingHours))
      setRows([...rows])
    }
  }, [employeeTimeSheetList, filterEmployeeSheet])

  useEffect(() => {
    if (employeeTimeSheetList.length && (selectedDate && selectedMonth)) {
      const filteredRows = employeeTimeSheetList.filter(value => value?.date === selectedDate && moment(value?.date).utc().format('MMMM') === selectedMonth)
      setFilterEmployeeSheet([...filteredRows])
    } else if (employeeTimeSheetList.length && selectedMonth) {
      const filteredRows = employeeTimeSheetList.filter(value => moment(value?.date).utc().format('MMMM') === selectedMonth)
      setFilterEmployeeSheet([...filteredRows])
    } else if (employeeTimeSheetList.length && selectedDate) {
      const filteredRows = employeeTimeSheetList.filter(value => {
        return value?.date === selectedDate
      })
      setFilterEmployeeSheet([...filteredRows])
    } else if (!selectedDate && !selectedMonth) {
      setEmployeeTimeSheetList([...employeeTimeSheetList])
    }
  }, [selectedDate, selectedMonth])

  const getEmplyeeTimeSheet = async () => {
    const timeSheetResp = await handleViewEmployeeInfo(employeedId, token);
    if (timeSheetResp.employee) {
      setEmployeeTimeSheetList([...timeSheetResp?.employee?.timesheets])
      setEmployeeInfo({
        joiningDate: timeSheetResp.joiningdate,
        email: timeSheetResp?.employee?.email,
        deactive: timeSheetResp?.employee?.deActivate,
        id: timeSheetResp?.employee?._id
      })
    }
  }

  const getDatesFromList = () => {
    const dateList = [];
    if (employeeTimeSheetList.length) {
      employeeTimeSheetList.forEach(emp => {
        if (!dateList.includes(emp?.date)) {
          dateList.push(emp?.date)
        }
      })
    }
    return dateList;
  }

  return (
    <div className='Emp-timesheet-container'>
      <div className='Emp-timeSheet-header'>
        <Button className='back-btn' onClick={() => setIsViewEmployee(false)}>Back</Button>
        <h2>{`Employee Time Sheet - (${employeeInfo.email})`}</h2>
      </div>
      <div className='Emp-table-filters'>
        <div className='status'>
          <p className={employeeInfo.deactive ? 'Inactive' : 'Active'}>{employeeInfo.deactive ? 'Inactive' : 'Active'}</p>
          <p className='date'><span>Joining Date&nbsp;:</span>{moment(employeeInfo.joiningDate).utc().format('MMMM Do YYYY')}</p>
        </div>
        <div className='filters'>
          <div className='month-filter'>
            <label>Filter With Date</label>
            <Select
              id="date-select-filter"
              value={selectedDate}
              onChange={(event) => setSelectedDate(event.target.value)}
            >
              {getDatesFromList().map(dateVal => <MenuItem value={dateVal}>{dateVal}</MenuItem>)}
            </Select>
          </div>
          <div className='month-filter'>
            <label>Filter With Month</label>
            <Select
              id="month-select-filter"
              value={selectedMonth}
              onChange={(event) => event.target.value === selectedMonth ? setSelectedMonth('') : setSelectedMonth(event.target.value)}
            >
              {moment.months().map(month => <MenuItem value={month}>{month}</MenuItem>)}
            </Select>
          </div>
          <div className='month-filter'>
            <Button className='clear-btn' onClick={() => {
              setSelectedDate('');
              setSelectedMonth('');
            }}>Clear Filters</Button>
          </div>
        </div>
      </div>
      <div className='Emp-timesheet-table'>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead className='Emp-timesheet-table'>
              <TableRow className='Emp-timesheet-table-row'>
                <TableCell align='center'>S.No</TableCell >
                <TableCell align='center'>Date</TableCell >
                <TableCell align='center'>Checkin</TableCell >
                <TableCell align='center'>Checkout</TableCell >
                <TableCell align='center'>Total Working Hours</TableCell >
              </TableRow>
            </TableHead>
            <TableBody className='emp-table-body'>
              {rows.map((row) => (
                <TableRow key={row.no} className='emp-table-row'>
                  <TableCell align='center'>{row.no}</TableCell >
                  <TableCell align='center'>{row.date ? moment(row.date).format('MMMM Do YYYY') : ''}</TableCell >
                  <TableCell align='center'>{moment(row.checkInTime).utc().format('MMMM Do YYYY, h:mm a')}</TableCell >
                  <TableCell align='center'>{row.checkoutTime ? moment(row.checkoutTime).utc().format('MMMM Do YYYY, h:mm a') : ''}</TableCell >
                  <TableCell align='center'>{row.totalWorkingHours}</TableCell >
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default EmployeeInfo