import React, { useState } from 'react'
import { Button, TextField, MenuItem, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle }
  from '@material-ui/core'

const FundsForm = ({ projects, setProjects, availableFunds, setAvailableFunds }) => {
  const [open, setOpen] = useState(false)
  const [chosenProject, setChosenProject] = useState('')
  const [assignedSum, setAssignedSum] = useState(0)

  const handleClick = () => {
    setOpen(!open)
  }

  const handleProjectChange = (event) => {
    setChosenProject(event.target.value)
  }

  const handleSumChange = (event) => {
    if (Number(event.target.value >= 0)) {
      setAssignedSum(event.target.value)
    }
  }

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
    <div>
      <Button variant="outlined" color="primary" onClick={handleClick}>
        Kohdenna varoja
      </Button>
      <Dialog open={open} onClose={handleClick} aria-labelledby="form-dialog-title">
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
            id="amount"
            label="Number"
            type="number"
            value={assignedSum}
            onChange={handleSumChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClick} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAssignClick} color="primary">
            Kohdenna
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default FundsForm