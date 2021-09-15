import React, { FC } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Employee, useEmployeesQuery, Review, useReviewsQuery } from '../generated/graphql'
import { VStack, Stack } from '@chakra-ui/react'

const UseEmployeesFetched = () => {
  const [{ data, fetching }] = useEmployeesQuery()
  return data?.employees as Employee[]
}

const UseReviewsFetched = () => {
  const [{ data, fetching }] = useReviewsQuery()
  return data?.reviews as Review[]
}

const Home: FC = () => {
  const employees = UseEmployeesFetched()
  const router = useRouter()

  return (
    <VStack>
      <CardWrapper>
        <StyledButton
          onClick={() => {
            router.push('/admin')
          }}
        >
          {`admin`}
        </StyledButton>
      </CardWrapper>      
      {
        (employees !== undefined) &&
        <CardWrapper>
          <h3>Users</h3>
          <Stack direction="row" spacing={16} align="center">      
          {
            employees.map((employee) =>
              <StyledButton
                key={employee.id}
                onClick={() => {
                  router.push('/employees/' + employee.name)
                }}
              >
                {employee.name}
              </StyledButton>
            )
          }
          </Stack>
        </CardWrapper>
      }
      
    </VStack>

  )
}

export default Home


const StyledButton = styled.button`
  width: 120px;
  height: 40px;
  letter-spacing: 0.5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* padding: 0 35px 0 35px; */
  font-size: 16px;
  background-color: #cc9209;
  color: black;
  font-family: 'Open Sans Condensed';
  font-weight: bolder;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: orange;
    color: white;
    border: 1px solid #ff9100;
  }
`

const CardWrapper = styled.div`
  height: auto;
  width: 600px;
  background-color: lightgray;
  border: solid 2px #cc9209;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 12px;
  padding: 4px 8px 4px 8px;
`
