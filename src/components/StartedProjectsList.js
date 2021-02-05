import React from 'react'
import { Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow }
  from '@material-ui/core'

const StartedProjectsList = ({ projects }) => {
  return (
    <div>
      <p>Toteutetut projektit</p>
      <TableContainer style={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Nimi</TableCell>
              <TableCell align='right'>Käytetty</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.filter(project => project.started).map((project) => (
              <TableRow key={project.id}>
                <TableCell component="th" scope="row">
                  {project.name}
                </TableCell>
                <TableCell align="right">{project.funds}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {projects.filter(project => project.started).length === 0 ? <p>(ei vielä yhtään toteutettua projektia)</p> : null}
    </div>
  )
}

export default StartedProjectsList