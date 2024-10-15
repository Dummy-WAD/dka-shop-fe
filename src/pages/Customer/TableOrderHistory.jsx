import { Grid2, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import React from 'react'
import StatusChip from '../../components/StatusChip/StatusChip'
import IconButton from '../../components/IconButton/IconButton'
import { Visibility } from '@mui/icons-material'

function TableOrderHistory({rowsPerPage, onSetPage, orderHistory}) {
    const handleChangePage = (e, newPage) => {
        onSetPage(newPage)
    }

    const handleViewDetail = () => {
    }
  return (
    <div>
        <TableContainer component={Paper} sx={{marginTop: 2, borderRadius: "5px", border: '1px solid rgb(31 41 55 / 1)'}}>
            <Table>
                <TableHead sx={{backgroundColor: 'rgb(31 41 55 / 1)'}}>
                    <TableRow>
                        <TableCell sx={{color: 'white'}}>ID</TableCell>
                        <TableCell sx={{color: 'white'}}>Order Date</TableCell>
                        <TableCell sx={{color: 'white'}}>Update Date</TableCell>
                        <TableCell sx={{color: 'white'}}>Current Status</TableCell>
                        <TableCell sx={{color: 'white'}}>Total Value</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>10/10/2024</TableCell>
                        <TableCell>10/12/2024</TableCell>
                        <TableCell><StatusChip label="Completed" style={{backgroundColor: 'green', color: 'white'}}/></TableCell>
                        <TableCell>100000</TableCell>
                        <TableCell><IconButton onClick={()=> handleViewDetail()}>
                                        <Visibility sx={{color: 'blue'}}/>
                                    </IconButton></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        <Grid2 sx={{display: 'flex', alignItems: "center", justifyContent: "space-between"}}>
                <Typography>Rows of per page: {rowsPerPage}</Typography>
                
                <TablePagination 
                    rowsPerPageOptions={[]}
                    component="div"
                    rowsPerPage={rowsPerPage}
                    count={1}
                    page={0}
                    onPageChange={handleChangePage}
                />
            </Grid2>
    </div>
  )
}

export default TableOrderHistory