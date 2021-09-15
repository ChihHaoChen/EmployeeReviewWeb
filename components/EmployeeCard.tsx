import React, { useEffect, useState } from 'react'
import { ExternalLinkIcon, DeleteIcon } from '@chakra-ui/icons'
import styled from 'styled-components'
import {
  Employee,
  Review,
  useDeleteEmployeeMutation,
  useUpdateEmployeeMutation,
  useAssignReviewMutation,
  useDeleteReviewMutation,
  useReviewsQuery
} from '../generated/graphql'
import EditableInput from './EditableInput'
import CustomTextArea from './CustomTextArea'
import { CustomSelector, AssigneeType } from './CustomSelector'
import EmployReviewCard from './EmployReviewCard'
import AdminInputCard from './AdminInputCard'

interface EmployeeProps {
  employee: Employee
  assignees: string[]
  review?: string[],
}

const UseReviewsFetched = () => {
  const [{ data, fetching }] = useReviewsQuery()
  return data?.reviews as Review[]
}


const EmployeeCard = ({ employee, assignees }: EmployeeProps) => {
  // GraphQL Hooks
  const [resDeleted, deleteEmployee] = useDeleteEmployeeMutation()
  const [resUpdated, updateEmployee] = useUpdateEmployeeMutation()
  const [resAssigned, assignReviewer] = useAssignReviewMutation()
  const [resDeletedReview, deleteReview] = useDeleteReviewMutation()
  const reviews = UseReviewsFetched()

  // State Variables
  const { name, id } = employee
  const reviewsEmployee = (reviews !== undefined) ?
    reviews.filter(review => review.reviewedEmployeeId === id) :
    undefined

  // const [reviewsState, setReviewState] = useState<Review[] | undefined>(reviewsEmployee)
  const [nameValue, setNameValue] = useState<string>(name)
  const [selectedOption, setSelectedOption] = useState<AssigneeType | []>()
  const [_, setReviewContent] = useState<string>('')

  useEffect(() => {
    setNameValue(name)
  }, [name])


  let assigneesOptions: AssigneeType[] = []
  if (assignees !== undefined) {
    assignees.filter(assigneeName => assigneeName !== name).forEach(nameOption => {
      assigneesOptions.push({ value: nameOption, label: nameOption})
    })
  }
  
  
  const removeEmployee = () => {
    // Before removing a specific employee, all the reviews related to him/her have to be removed first because of foreign-key constraints
    deleteReview({ deleteReviewOfEmployeeId: id })
    // after the reviews deleted, then the employee can be safely deleted.
    deleteEmployee({ deleteEmployeeId: id })
  }

  const updateEmployeeName = (inputValue: string) => {
    updateEmployee({ updateEmployeeName: inputValue, updateEmployeeId: id })
  }

  const handleChange = (option: AssigneeType) => {
    setSelectedOption(option)
  }

  const dispatchReview = () => {
    // const isPreviousReviewExisted =
    //   reviews.filter(review => (review.reviewedBy === name && !review.isCompleted))
    if (selectedOption !== undefined) {
      if (selectedOption as AssigneeType) {
        assignReviewer({ assignRevieweeId: id, assignReviewerName: (selectedOption as AssigneeType).value })
        setSelectedOption([])
      }
    }
  }

  const handleTextAreaChange = (changedText: string) => {
    setReviewContent(changedText)
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
        <AdminInputCard id={id}/>
      </ReviewWrapper>
      {
        (reviewsEmployee !== undefined && reviewsEmployee.length !== 0) &&
        <ReviewWrapper>
          { 
            reviewsEmployee.map((review, index) =>
              <EmployReviewCard
                key={`${review.reviewedBy}-${index}`}
                review={review}
                handleTextAreaChange={handleTextAreaChange}
              />
            )
          }
        </ReviewWrapper>
      }
     
      <OperationWrapper>
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
      </OperationWrapper>
    </CardWrapper>
  )
}


export default EmployeeCard


const ReviewWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: block;
  overflow-y: auto;
  margin: 4px 0;
`

const CardWrapper = styled.div`
  height: 600px;
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

const OperationWrapper = styled.div`
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
  padding: 0 4px;
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
