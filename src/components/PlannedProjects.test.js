import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import PlannedProjectsList from './PlannedProjectsList'

const projects = [{
  id: 'tiikerit',
  name: 'Amurintiikerien palautus luontoon',
  target: 20000,
  funds: 45000,
  started: false,
  assignedFunds: 0
},
{
  id: 'itameri',
  name: 'Itämeren rehevöitymisen torjunta',
  target: 30000,
  funds: 0,
  started: false,
  assignedFunds: 0
},
]

describe('<PlannedProjectsList />', () => {
  let component

  beforeEach(() => {
    component = render(
      <PlannedProjectsList projects={projects} />
    )
  })


  test('renders content', () => {

    expect(component.container).toHaveTextContent(
      'Itämeren rehevöitymisen torjunta',
      '0',
      'Amurintiikerien palautus luontoon',
      '45 000'
    )
  })
})