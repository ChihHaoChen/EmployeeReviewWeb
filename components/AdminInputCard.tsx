import styled from 'styled-components'
import CustomTextArea from './CustomTextArea'
import { EditIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import {
  useAdminReviewMutation,
} from '../generated/graphql'


interface AdminInputCardProps {
  id: number
}

const AdminInputCard = ({ id }: AdminInputCardProps) => {
  // GraphQL Hooks
  const [resAdminReview, adminReview] = useAdminReviewMutation()
  // Local State
  const [reviewContext, setReviewContent] = useState<string>('')
  
  const handleTextAreaChange = (changedText: string) => {
    setReviewContent(changedText)
  }

  const dispatchAdminReview = () => {
    adminReview({
      adminReviewInput: {
        reviewedEmployeeId: id,
        rating: 5,
        feedback: reviewContext
      }
    })
  }
  
  return (
    <TextFieldWrapper>
      <HeaderWrapper>
        <h3>
          {`Editing Area`}
        </h3>
        <IconWrapper onClick={dispatchAdminReview}>
          <EditIcon boxSize={20}/>
        </IconWrapper>
      </HeaderWrapper>
      <CustomTextArea
        text={reviewContext}
        handleChange={handleTextAreaChange}
        editable={true}
      />
    </TextFieldWrapper>
  )
}

export default AdminInputCard


const HeaderWrapper = styled.div`
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

const TextFieldWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
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