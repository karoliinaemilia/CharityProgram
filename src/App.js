import React, { useEffect, useState } from 'react'
import logo from './images/charitylogo.png'
import donationService from './services/donations'
import projectService from './services/projects'
import FundsForm from './components/FundsForm'
import PlannedProjectsList from './components/PlannedProjectsList'
import StartedProjectsList from './components/StartedProjectsList'

const App = () => {
  const [donations, setDonations] = useState([])
  const [projects, setProjects] = useState([])
  const [donationsSum, setDonationsSum] = useState(0)
  const [availableFunds, setAvailableFunds] = useState(0)

  const sumCounter = (sumNow, donation) => {
    return sumNow + donation.sum
  }

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
    <div>
      <img src={logo}></img>
      <p>Lahjoitukset yhteensä: {donationsSum}</p>
      <p>Kohdentamattomat varat: {availableFunds}</p>
      <FundsForm projects={projects} setProjects={setProjects} availableFunds={availableFunds} setAvailableFunds={setAvailableFunds} />
      <div>
        <PlannedProjectsList projects={projects} setProjects={setProjects} setAvailableFunds={setAvailableFunds} availableFunds={availableFunds}/>
        <StartedProjectsList projects={projects} />
      </div>
    </div>
  )
}

export default App