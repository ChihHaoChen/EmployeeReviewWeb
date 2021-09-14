import React, { FC } from 'react'
import { Employee, useEmployeesQuery, Review, useReviewsQuery } from '../generated/graphql'
import { Grid, GridItem, Box, VStack, Container } from '@chakra-ui/react'
import EmployeeCard from '../components/EmployeeCard'
import AddEmployeeCard from '../components/AddEmployeeCard'

const UseEmployeesFetched = () => {
  const [{ data, fetching }] = useEmployeesQuery()
  return data?.employees as Employee[]
}

const Admin: FC = () => {
  const employees = UseEmployeesFetched()
  let assigneeNames: string[] = []
  if (employees !== undefined) {
    assigneeNames = employees.map(employee => employee.name)
  }
  
  return (
    <VStack>
      <AddEmployeeCard />
      {
        (employees !== undefined) &&
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          {
            employees.map(employee =>        
              <EmployeeCard key={employee.id} employee={employee} assignees={assigneeNames}/>
            )
          }
          
        </Grid>
      }
    </VStack>

  )
}

export default Admin

