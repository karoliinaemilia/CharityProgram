import React from 'react'
import { Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Button }
  from '@material-ui/core'

const PlannedProjectsList = ({ projects, setProjects, availableFunds, setAvailableFunds }) => {

  const startProject = (id) => {
    const changedProject = projects.find(project => project.id === id)
    changedProject.started = true
    setProjects(projects.map(project => project.id === id ? changedProject : project))
  }

  const returnFunds = (id) => {
    const changedProject = projects.find(project => project.id === id)
    setAvailableFunds(availableFunds + changedProject.assignedFunds)
    changedProject.funds -= changedProject.assignedFunds
    changedProject.assignedFunds = 0
    setProjects(projects.map(project => project.id === id ? changedProject : project))
  }

  return (
    <div>
      <p>Suunnitellut projektit</p>
      <TableContainer style={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Nimi</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align='right'>Tavoite</TableCell>
              <TableCell align='right'>Kohdennettu</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.filter(project => !project.started).map((project) => (
              <TableRow key={project.id}>
                <TableCell component="th" scope="row">
                  {project.name}
                </TableCell>
                <TableCell align='right'>
                  {project.funds > project.target ? <Button onClick={() => startProject(project.id)} variant='contained' color='primary'>Aloita hanke</Button> : null}
                </TableCell>
                <TableCell align='right'>
                  {project.assignedFunds !== 0 ? <Button onClick={() => returnFunds(project.id)}>Palauta varat</Button> : null}
                </TableCell>
                <TableCell align='right'>{project.target}</TableCell>
                <TableCell align='right'>{project.funds}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default PlannedProjectsList