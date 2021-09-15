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
  padding: 8px;
`

const NameWrapper = styled.div`
  height: 30px;
  width: 100%;
  background-color: #f5f6f8;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 4px;
  border-radius: 4px;
`

const IconWrapper = styled.div`
  display: flex;
  width: 20%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
