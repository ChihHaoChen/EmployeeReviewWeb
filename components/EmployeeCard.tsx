import React, { useEffect, useState } from 'react'

import { ExternalLinkIcon, DeleteIcon, AddIcon, } from '@chakra-ui/icons'
import styled from 'styled-components'
import { useRouter } from "next/router";
import {
  Employee,
  useDeleteEmployeeMutation,
  useUpdateEmployeeMutation,
  useAssignReviewMutation,
  useAdminReviewMutation
} from '../generated/graphql'
import EditableInput from './EditableInput'
import CustomTextArea from './CustomTextArea';
import { CustomSelector, AssigneeType } from './CustomSelector'

interface EmployeeProps {
  employee: Employee
  assignees: string[]
  review?: string[],
}


const testText = `

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis mattis odio non varius. Nunc ac tristique nunc. Cras varius, ante vitae bibendum iaculis, nunc odio vehicula nulla, quis iaculis nibh diam nec ligula. Fusce gravida lectus sit amet leo lacinia, eget rutrum ex egestas. Etiam dignissim elementum viverra. Nunc condimentum eleifend risus, ut sollicitudin est placerat ut. Proin volutpat malesuada eros, et rutrum odio feugiat vel.

In gravida tortor mi, nec venenatis nulla egestas eu. Ut purus eros, sodales sed nisl et, vestibulum viverra dui. Donec egestas volutpat sodales. In et sapien sem. Proin ultricies arcu et turpis luctus, ut scelerisque enim malesuada. Nam nibh nisl, consequat sed vulputate et, semper eu nulla. Maecenas sed nisl congue diam finibus varius. Etiam risus ante, venenatis euismod sapien a, bibendum ultricies justo. Integer commodo eget enim a egestas. Phasellus at risus consequat, luctus ipsum luctus, vestibulum velit. Aenean vel mi magna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer tincidunt neque ut felis varius, at sodales turpis sodales. Vestibulum consectetur, felis vitae volutpat faucibus, sapien augue porttitor libero, eget imperdiet nisl lorem nec orci. Mauris dapibus porta tincidunt.

 porttitor ante non porttitor imperdiet. Donec sodales pharetra lectus eu euismod. Pellentesque ultrices rutrum leo. Morbi nec pellentesque massa. Duis ante enim, suscipit ut blandit in, volutpat a neque. Praesent nisl nibh, ullamcorper vitae erat ut, elementum malesuada metus. In vel pulvinar sapien. Praesent vel cursus nunc, ac consectetur sapien. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed hendrerit faucibus massa. 
`

const EmployeeCard = ({ employee, assignees }: EmployeeProps) => {
  
  const { name, id } = employee
  const [nameValue, setNameValue] = useState<string>(name)
  const [selectedOption, setSelectedOption] = useState<AssigneeType | []>()
  const [reviewContext, setReviewContent] = useState<string>('')
  
  useEffect(() => {
    setNameValue(name)
  }, [name])

  const [resDeleted, deleteEmployee] = useDeleteEmployeeMutation()
  const [resUpdated, updateEmployee] = useUpdateEmployeeMutation()
  const [resAssigned, assignReviewer] = useAssignReviewMutation()
  const [resAdminReview, adminReview] = useAdminReviewMutation()

  let assigneesOptions: AssigneeType[] = []
  if (assignees !== undefined) {
    assignees.filter(assigneeName => assigneeName !== name).forEach(nameOption => {
      assigneesOptions.push({ value: nameOption, label: nameOption})
    })

  }
  
  
  const removeEmployee = () => {
    deleteEmployee({ deleteEmployeeId: id })
  }

  const updateEmployeeName = (inputValue: string) => {
    updateEmployee({ updateEmployeeName: inputValue, updateEmployeeId: id })
  }

  const handleChange = (option: AssigneeType) => {
    setSelectedOption(option)
  }

  const dispatchReview = () => {
    if (selectedOption !== undefined) {
      assignReviewer({ assignRevieweeId: id, assignReviewerName: selectedOption.value })
      setSelectedOption([])
    }
  }

  const handleTextAreaChange = (changedText: string) => {
    setReviewContent(changedText)
    adminReview({
      adminReviewInput: {
        reviewedEmployeeId: id,
        rating: 5,
        feedback: changedText
    }})
  }
  
  return (
    <CardWrapper>
      <NameWrapper>
        <EditableInput
          value={nameValue}
          fieldName="name"
          onValueChange={updateEmployeeName}
        />
        <IconWrapper onClick={removeEmployee}>
          <DeleteIcon
            boxSize={20}
          />
        </IconWrapper>
      </NameWrapper>
      <ReviewWrapper>
        <TextFieldWrapper>
          <SubmitWrapper>
            <h3>
              {`Reviewed by `}
            </h3>
            <IconWrapper onClick={removeEmployee}>
              <AddIcon
                boxSize={20}
              />
            </IconWrapper>
          </SubmitWrapper>
          <CustomTextArea
            text={reviewContext}
            handleChange={handleTextAreaChange}
          />
        </TextFieldWrapper>
      </ReviewWrapper>
      <AssignReviewWrapper>
        <CustomSelector
          options={assigneesOptions}
          value={selectedOption}
          onChange={handleChange}
        />
        <IconWrapper onClick={dispatchReview}>
          <ExternalLinkIcon
            boxSize={20}
          />
        </IconWrapper>
      </AssignReviewWrapper>
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
  justify-content: space-between;
  align-items: center;
  margin: 12px;
  padding: 8px 8px 4px 8px;
`

const NameWrapper = styled.div`
  height: 60px;
  width: 100%;
  background-color: #f5f6f8;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 4px;
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
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
  margin: 4px 0;
`

const TextFieldWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`

const AssignReviewWrapper = styled(SubmitWrapper)`

`
