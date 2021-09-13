import React, { FC } from 'react'
import { Employee, useEmployeesQuery } from '../generated/graphql'
import { Grid, GridItem, Box, VStack, Container } from '@chakra-ui/react'
import EmployeeCard from '../components/EmployeeCard'
import AddEmployeeCard from '../components/AddEmployeeCard'

const Admin: FC = () => {

  const [{ data, fetching }] = useEmployeesQuery()
  const employees = data?.employees as Employee[]
  
  return (
    <VStack>
      <AddEmployeeCard />
      {
        (!fetching && employees !== undefined) &&
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {
            employees.map(employee =>        
              <EmployeeCard key={employee.id} employee={employee} />
            )
          }
          
        </Grid>
      }
    </VStack>

  )
}

export default Admin

