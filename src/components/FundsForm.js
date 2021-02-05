import React, { useState } from 'react'
import { Button, TextField, MenuItem, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle }
  from '@material-ui/core'

const FundsForm = ({ projects, setProjects, availableFunds, setAvailableFunds }) => {
  const [open, setOpen] = useState(false)
  const [chosenProject, setChosenProject] = useState('')
  const [assignedSum, setAssignedSum] = useState(0)

  // sets open when a button is clicked
  const handleClick = () => {
    setOpen(!open)
  }

  // handles field project-name changing
  const handleProjectChange = (event) => {
    setChosenProject(event.target.value)
  }

  // handles field amount changing
  const handleSumChange = (event) => {
    if (Number(event.target.value >= 0)) {
      setAssignedSum(event.target.value)
    }
  }

  // when user is assigning money checks whether there is enough money to assign and then assigns the money
  const handleAssignClick = () => {
    if (assignedSum < availableFunds) {
      const changedProject = projects.find(project => project.id === chosenProject)
      if (changedProject) {
        changedProject.funds += Number(assignedSum)
        changedProject.assignedFunds += Number(assignedSum)
        setProjects(projects.map(project => project.id === changedProject.id ? changedProject : project))
        setAvailableFunds(availableFunds-assignedSum)
        setOpen(false)
      }
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <Button style={{ background: '#3F5369', color: 'white' }} variant='contained' onClick={handleClick}>
        Kohdenna varoja
      </Button>
      <Dialog open={open} onClose={handleClick} fullWidth aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Kohdenna varoja</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Valitse Projekti
          </DialogContentText>
          <TextField
            id="project-name"
            select
            value={chosenProject}
            onChange={handleProjectChange}
            fullWidth
          >
            {projects.filter(project => !project.started).map((project) => (
              <MenuItem key={project.id} value={project.id}>
                {project.name}
              </MenuItem>
            ))}
          </TextField>
          <DialogContentText>
            Valitse Summa
          </DialogContentText>
          <TextField
            id="amount"S
            type="number"
            value={assignedSum}
            onChange={handleSumChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClick} style={{ color:'#B8526A' }}>
            Peruuta
          </Button>
          <Button onClick={handleAssignClick} id='assign' style={{ color:'#26514C' }}>
            Kohdenna
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default FundsForm