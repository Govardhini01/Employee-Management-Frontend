/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Paper, Select, MenuItem, Button } from '@mui/material';
import './EmployeeInfo.css';
import moment from 'moment';
import { handleEmployeeTimeSheet } from '../../../../common/services';

const EmployeeInfo = ({ userData, checkIn }) => {
  const [rows, setRows] = useState([]);
  const [employeeTimeSheetList, setEmployeeTimeSheetList] = useState([]);
  const [filterEmployeeSheet, setFilterEmployeeSheet] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const createData = (no, date, checkInTime, checkoutTime, totalWorkingHours) => {
    return { no, date, checkInTime, checkoutTime, totalWorkingHours };
  }

  useEffect(() => {
    getEmplyeeTimeSheet()
  }, [checkIn])

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
    const timeSheetResp = await handleEmployeeTimeSheet(userData.token);
    if (timeSheetResp.length) {
      setEmployeeTimeSheetList([...timeSheetResp])
    }
  }

  const getDatesFromList = () => {
    const dateList = [];
    if (employeeTimeSheetList.length) {
      employeeTimeSheetList.forEach(emp => {
        if(!dateList.includes(emp?.date)){
          dateList.push(emp?.date)
        }
      })
    }
    return dateList;
  }

  return (
    <div className='timesheet-container'>
      <div className='timeSheet-header'>
        <h2>Time Sheet</h2>
      </div>
      <div className='table-filters'>
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
      <div className='timesheet-table'>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead className='table-header'>
              <TableRow className='table-header-row'>
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
                  <TableCell align='center'>{row.date? moment(row.date).format('MMMM Do YYYY') : ''}</TableCell >
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