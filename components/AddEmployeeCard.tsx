import React, { useState } from 'react'
import styled from 'styled-components'
import EditableInput from './EditableInput'
import { AddIcon } from '@chakra-ui/icons'
import { useCreateEmployeeMutation } from '../generated/graphql'

const AddEmployeeCard = () => {
  const [name, setName] = useState('')
  const [_, createEmployee] = useCreateEmployeeMutation()

  const clickToChangeName = (nameValue: string) => {
    setName(nameValue)
  }

  const onClickToCreateEmployee = () => {
    createEmployee({ employeeName: name })
    setName('')
  }

  return (
    <CardWrapper>
      <NameWrapper>
        <EditableInput
          value={name}
          fieldName="name"
          onValueChange={clickToChangeName}
        />
        <IconWrapper
          onClick={onClickToCreateEmployee}
        >
          <AddIcon
            boxSize={20}
          />
        </IconWrapper>
      </NameWrapper>
    </CardWrapper>
  )
}

export default AddEmployeeCard

const CardWrapper = styled.div`
  height: 60px;
  width: 600px;
  background-color: teal;
  color: white;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 12px;
  padding: 4px 8px;
`

const NameWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: navy;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`

const IconWrapper = styled.div`
  display: flex;
  width: 20%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
