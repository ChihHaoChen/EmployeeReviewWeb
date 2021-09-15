import { useState } from 'react'
import styled from 'styled-components'
import { EditIcon } from '@chakra-ui/icons'
import CustomTextArea from './CustomTextArea'
import { Review, useSubmitFeedbackMutation } from '../generated/graphql'

interface SubmitReviewProps {
  review: Review
  reviewedName: string
}

const SubmitReviewCard = ({ review, reviewedName }: SubmitReviewProps) => {
  const [reviewContent, setReviewContent] = useState<string>('')
  const [resSubmitFeedback, submitFeedback] = useSubmitFeedbackMutation()
  const handleTextAreaChange = (changedText: string) => {
    setReviewContent(changedText)
  }
  
  const dispatchSubmit = () => {
    const SubmitReviewInput = {
      rating: 5,
      feedback: reviewContent,
      reviewedBy: review.reviewedBy,
      reviewedEmployeeId: review.reviewedEmployeeId,
    }
    submitFeedback({ submitFeedbackInput: SubmitReviewInput})

  }

  return (
    <CardWrapper>
      <ReviewWrapper>
        <TextFieldWrapper>
          <HeaderWrapper>
            <h3>
              {`Editing Area to review ${reviewedName}`}
            </h3>
            <IconWrapper onClick={dispatchSubmit}>
              <EditIcon boxSize={20}/>
            </IconWrapper>
          </HeaderWrapper>
          <CustomTextArea
            text={reviewContent}
            handleChange={handleTextAreaChange}
            editable={true}
          />
        </TextFieldWrapper>
      </ReviewWrapper>
    </CardWrapper>
  )
}

export default SubmitReviewCard


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

const IconWrapper = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`