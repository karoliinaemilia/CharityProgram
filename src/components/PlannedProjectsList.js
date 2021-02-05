import React from 'react'
import { Table, TableBody, TableContainer,
  TableHead, TableRow, Button }
  from '@material-ui/core'
import { formatMoney } from '../utils/formatFunctions'
import { StyledTableCell } from '../utils/tableComponents'

// component for showing planned projects
const PlannedProjectsList = ({ projects, setProjects, availableFunds, setAvailableFunds }) => {

  // sets a project as started
  const startProject = (id) => {
    const changedProject = projects.find(project => project.id === id)
    changedProject.started = true
    setProjects(projects.map(project => project.id === id ? changedProject : project))
  }

  // returns funds that have been assigned to a project
  const returnFunds = (id) => {
    const changedProject = projects.find(project => project.id === id)
    setAvailableFunds(availableFunds + changedProject.assignedFunds)
    changedProject.funds -= changedProject.assignedFunds
    changedProject.assignedFunds = 0
    setProjects(projects.map(project => project.id === id ? changedProject : project))
  }

  return (
    <div>
      <h4>Suunnitellut projektit</h4>
      <TableContainer style={{ maxHeight: '55vh' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Nimi</StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell align='right'>Tavoite</StyledTableCell>
              <StyledTableCell align='right'>Kohdennettu</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.filter(project => !project.started).map((project) => (
              <TableRow key={project.id}>
                <StyledTableCell component="th" scope="row">
                  {project.name}
                </StyledTableCell>
                <StyledTableCell align='right'>
                  {project.funds >= project.target ? <Button onClick={() => startProject(project.id)} variant='contained' style={{ backgroundColor: '#7BAFAF' }}>Aloita hanke</Button> : null}
                </StyledTableCell>
                <StyledTableCell align='right'>
                  {project.assignedFunds !== 0 ? <Button onClick={() => returnFunds(project.id) } variant='contained'>Palauta varat</Button> : null}
                </StyledTableCell>
                <StyledTableCell align='right'>{formatMoney(project.target)}</StyledTableCell>
                <StyledTableCell align='right'>{formatMoney(project.funds)}</StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default PlannedProjectsList