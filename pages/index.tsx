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
      <StyledButton
        onClick={() => {
          router.push('/admin')
        }}
      >
        {`admin user`}
      </StyledButton>
      {
        (employees !== undefined) &&
        <Stack direction="row" spacing={12} align="center">
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
