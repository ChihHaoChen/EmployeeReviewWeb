import { Grid, GridItem, Box, VStack, Container, Image, Badge } from '@chakra-ui/react'
import { StarIcon, DeleteIcon, AddIcon, } from '@chakra-ui/icons'
import styled from 'styled-components'
import { useRouter } from "next/router";
import { Employee, useDeleteEmployeeMutation, useUpdateEmployeeMutation } from '../generated/graphql'
import EditableInput from './EditableInput'
import { useEffect, useState } from 'react'

interface EmployeeProps {
  employee: Employee
  review?: string[],
}

const testText = `


Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis mattis odio non varius. Nunc ac tristique nunc. Cras varius, ante vitae bibendum iaculis, nunc odio vehicula nulla, quis iaculis nibh diam nec ligula. Fusce gravida lectus sit amet leo lacinia, eget rutrum ex egestas. Etiam dignissim elementum viverra. Nunc condimentum eleifend risus, ut sollicitudin est placerat ut. Proin volutpat malesuada eros, et rutrum odio feugiat vel.

In gravida tortor mi, nec venenatis nulla egestas eu. Ut purus eros, sodales sed nisl et, vestibulum viverra dui. Donec egestas volutpat sodales. In et sapien sem. Proin ultricies arcu et turpis luctus, ut scelerisque enim malesuada. Nam nibh nisl, consequat sed vulputate et, semper eu nulla. Maecenas sed nisl congue diam finibus varius. Etiam risus ante, venenatis euismod sapien a, bibendum ultricies justo. Integer commodo eget enim a egestas. Phasellus at risus consequat, luctus ipsum luctus, vestibulum velit. Aenean vel mi magna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer tincidunt neque ut felis varius, at sodales turpis sodales. Vestibulum consectetur, felis vitae volutpat faucibus, sapien augue porttitor libero, eget imperdiet nisl lorem nec orci. Mauris dapibus porta tincidunt.

Nulla aliquet volutpat interdum. Integer scelerisque ac enim vitae iaculis. Sed egestas varius sapien, eu molestie tellus suscipit at. Fusce nec mi nibh. Etiam nec diam orci. Nunc ut pellentesque libero, et efficitur risus. Vivamus consequat magna vitae tortor auctor consectetur. Integer vehicula est at lectus gravida malesuada. Curabitur tincidunt lectus a elit venenatis molestie. Sed commodo lacus ut nisi tristique, et pretium massa porttitor. Donec ac erat fringilla enim consequat suscipit. Integer sed eros mi.

Ut finibus lacus et est dictum tristique. Nullam facilisis lobortis ipsum, eget faucibus diam pretium et. Morbi imperdiet nisi nec est consequat, sit amet scelerisque justo ultricies. Donec purus odio, scelerisque non felis vel, ullamcorper vestibulum mi. Nam eget arcu magna. Fusce sodales, eros a rutrum tristique, lectus nulla aliquam arcu, vel lobortis nunc enim vel urna. Nulla ut eros eget elit rhoncus pretium id eu urna.

Fusce auctor leo quis elementum lobortis. Suspendisse porttitor ante non porttitor imperdiet. Donec sodales pharetra lectus eu euismod. Pellentesque ultrices rutrum leo. Morbi nec pellentesque massa. Duis ante enim, suscipit ut blandit in, volutpat a neque. Praesent nisl nibh, ullamcorper vitae erat ut, elementum malesuada metus. In vel pulvinar sapien. Praesent vel cursus nunc, ac consectetur sapien. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed hendrerit faucibus massa. 
`

const EmployeeCard = ({ employee }: EmployeeProps) => {
  
  const { name, id, ...restProps } = employee
  const [nameValue, setNameValue] = useState(name)
  
  useEffect(() => {
    setNameValue(name)
  }, [name])

  const router = useRouter();
  const [resDeleted, deleteEmployee] = useDeleteEmployeeMutation()
  const [resUpdated, updateEmployee] = useUpdateEmployeeMutation()
  
  const deleteEmployeeTest = () => {
    deleteEmployee({ deleteEmployeeId: id })
  }

  const updateEmployeeName = (inputValue: string) => {
    updateEmployee({ updateEmployeeName: inputValue, updateEmployeeId: id })
  }

  return (
    <CardWrapper>
      <NameWrapper>
        <EditableInput
          value={nameValue}
          fieldName="name"
          onValueChange={updateEmployeeName}
        />
        <IconWrapper onClick={deleteEmployeeTest}>
          <DeleteIcon
            boxSize={20}
          />
        </IconWrapper>
      </NameWrapper>
      <ReviewWrapper>
        <TextFieldWrapper>
          {testText}
        </TextFieldWrapper>
        <SubmitWrapper>
          <h3>
            {`Reviewed by `}
          </h3>
          <IconWrapper onClick={deleteEmployeeTest}>
            <AddIcon
              boxSize={20}
            />
          </IconWrapper>
        </SubmitWrapper>
        <TextFieldWrapper>
          {testText}
        </TextFieldWrapper>
      </ReviewWrapper>
    </CardWrapper>
  )
}


export default EmployeeCard


const CardWrapper = styled.div`
  height: 400px;
  width: 600px;
  background-color: lightgray;
  border: solid 2px #cc9209;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 12px;
  padding: 4px 8px;
`

const NameWrapper = styled.div`
  height: 60px;
  width: 100%;
  background-color: #f5f6f8;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 4px;
`

const SubmitWrapper = styled.div`
  height: 30px;
  width: 100%;
  background-color: orange;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 4px 0;
  padding-left: 4px;
  font-style: italic;
  border-radius: 4px;
`

const IconWrapper = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const ReviewWrapper = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
`

const TextFieldWrapper = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`