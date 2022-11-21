/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Paper, Button, Tooltip, Snackbar, Alert } from '@mui/material'
import { handleEmployeeActivate, handleEmployeeDeactivate, handleEmployeeList } from '../../../../common/services';
import './EmployeeList.css';
import EmployeeInfo from './EmployeeInfo';

const EmployeeList = ({ adminData }) => {
  const [rows, setRows] = useState([]);
  const [isViewEmployee, setIsViewEmployee] = useState(false);
    const [ActivationStatus, setActivationStatus] = useState(false);
    const [employeedId, setEmployeedId] = useState('');


  useEffect(() => {
    getEmployeeList()
  }, [])

  const getEmployeeList = async () => {
    const empListRes = await handleEmployeeList(adminData.token)
    if (empListRes.length) {
      const rows = empListRes.map((value, i) => createData(`${i + 1}`, value?.email, value.deActivate, value._id))
      setRows([...rows])
    }
  }

  const handleDeactive = async (activate, id) => {
    if (!activate) {
      const deactiveResp = await handleEmployeeDeactivate(adminData.token, id);
      if (deactiveResp) {
        getEmployeeList()
        setActivationStatus(true)
      }
    } else {
      const activeResp = await handleEmployeeActivate(adminData.token, id);
      if (activeResp) {
        getEmployeeList()
        setActivationStatus(true)
      }
    }
  }

  const createData = (no, email, deActivate, empId) => {
    return { no, email, deActivate, empId };
  }

  return (
    isViewEmployee ? <EmployeeInfo employeedId={employeedId} token={adminData.token} setIsViewEmployee={setIsViewEmployee} /> :
      <div className='emp-container'>
        <div className='EmpList-header'>
          <h2>Employee List</h2>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead className='table-header'>
              <TableRow className='table-header-row'>
                <TableCell align='center'>S.No</TableCell >
                <TableCell align='center'>Email</TableCell >
                <TableCell align='center'>Status</TableCell >
                <TableCell align='center'>Action</TableCell >
              </TableRow>
            </TableHead>
            <TableBody className='emp-table-body'>
              {rows.map((row) => (
                <TableRow key={row.name} className='emp-table-row'>
                  <TableCell align='center'>{row.no}</TableCell >
                  <TableCell align='center'>{row.email}</TableCell >
                  <TableCell align='center'><Tooltip title={`click to ${row.deActivate ? 'Activate' : 'Deactivate'} Employee`}><Button variant="text" className={row.deActivate ? 'Deactivate' : 'Activate'} onClick={() => handleDeactive(row.deActivate, row.empId)}>{row.deActivate ? 'Inactive' : 'Active'}</Button></Tooltip></TableCell >
                  <TableCell align='center'><Tooltip title="click to view employee info"><Button variant="text" onClick={() => {
                    setIsViewEmployee(true);
                    setEmployeedId(row.empId)
                  }}>View Employee Info</Button></Tooltip></TableCell >
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {ActivationStatus && (
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={ActivationStatus}
            autoHideDuration={4000}
            onClose={() => setActivationStatus(false)}>
            <Alert onClose={() => setActivationStatus(false)} severity="success" sx={{ width: '100%' }}>
              Employee status Updated successfully
            </Alert>
          </Snackbar>
        )}
      </div>
  )
}

export default EmployeeList