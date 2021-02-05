import React from 'react'
import { Table, TableBody, TableContainer,
  TableHead, TableRow }
  from '@material-ui/core'
import { formatMoney } from '../utils/formatFunctions'
import { StyledTableCell } from '../utils/tableComponents'

// component for showing started projects
const StartedProjectsList = ({ projects }) => {
  return (
    <div>
      <h4>Toteutetut projektit</h4>
      <TableContainer style={{ maxHeight: '55vh' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Nimi</StyledTableCell>
              <StyledTableCell align='right'>Käytetty</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.filter(project => project.started).map((project) => (
              <TableRow key={project.id}>
                <StyledTableCell component="th" scope="row">
                  {project.name}
                </StyledTableCell>
                <StyledTableCell align="right">{formatMoney(project.funds)}</StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {projects.filter(project => project.started).length === 0 ? <p style={{ textAlign: 'center' }}>(ei vielä yhtään toteutettua projektia)</p> : null}
    </div>
  )
}

export default StartedProjectsList