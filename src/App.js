import React, { useEffect, useState } from 'react'
import logo from './images/charitylogo.png'
import donationService from './services/donations'
import projectService from './services/projects'
import FundsForm from './components/FundsForm'
import PlannedProjectsList from './components/PlannedProjectsList'
import StartedProjectsList from './components/StartedProjectsList'
import { formatMoneyEur } from './utils/formatFunctions'
import { Grid, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

const App = () => {
  // all donations
  const [donations, setDonations] = useState([])
  // all projects
  const [projects, setProjects] = useState([])
  // sum of all donations
  const [donationsSum, setDonationsSum] = useState(0)
  // sum of all donations that didn't have a target
  const [availableFunds, setAvailableFunds] = useState(0)

  // helper for counting donation sums
  const sumCounter = (sumNow, donation) => {
    return sumNow + donation.sum
  }

  // uses projectService and donationService to fecth donations and projects, adds fields places them in state
  useEffect(() => {
    projectService
      .getAll()
      .then(initialProjects => {
        setProjects(initialProjects.map(initialProject => ({ ...initialProject, funds: 0, started: false, assignedFunds: 0 })))
      })

    donationService
      .getAll()
      .then(initialDonations => {
        setDonations(initialDonations.map(initialDonation => ({ ...initialDonation, allocated: false })))
        setDonationsSum(initialDonations.reduce(sumCounter, 0))
        setAvailableFunds(initialDonations.filter(donation => !donation.target).reduce(sumCounter, 0))
      })
  }, [])

  // calculates targeted donations
  useEffect(() => {
    const directDonations = donations.filter(donation => donation.target)
    directDonations.forEach((donation => {
      const donationTarget = projects.find((project => project.id === donation.target))
      if (donationTarget && !donation.allocated) {
        donationTarget.funds += donation.sum
        setProjects(projects.map(project => project.id === donationTarget.id ? donationTarget : project))
        donation.allocated = true
        setDonations(originalDonation => donation === originalDonation ? donation : originalDonation)
      }
    }))
  }, [donations, projects])

  return (
    <div style={{ background: '#7BAFAF', height: '100%' }}>
      <AppBar style={{ maxHeight:'100px' }} color='white' position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <img src={logo}></img>
        </Toolbar>
      </AppBar>
      <div style={{ margin: '20px 20px 20px 20px' }}>
        <Typography>
          <Grid  container spacing={3} justify='space-around'>
            <Grid item xs={6}>
              <h2 style={{ textAlign: 'center' }}>Lahjoitukset yhteensä: {formatMoneyEur(donationsSum)}</h2>
            </Grid>
            <Grid item xs={6}>
              <h2 style={{ textAlign: 'center' }}>Kohdentamattomat varat: {formatMoneyEur(availableFunds)}</h2>
            </Grid>
            <Grid item xs={12}>
              <FundsForm projects={projects} setProjects={setProjects} availableFunds={availableFunds} setAvailableFunds={setAvailableFunds} />
            </Grid>
            <Grid item xs={6}>
              <PlannedProjectsList projects={projects} setProjects={setProjects} setAvailableFunds={setAvailableFunds} availableFunds={availableFunds}/>
            </Grid>
            <Grid item xs={6}>
              <StartedProjectsList projects={projects} />
            </Grid>
          </Grid>
        </Typography>
      </div>
    </div>

  )
}

export default App