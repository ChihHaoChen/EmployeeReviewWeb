import { useState } from 'react'
import styled from 'styled-components'
import CustomTextArea from './CustomTextArea'
import { Review, useSubmitFeedbackMutation, useReviewsQuery } from '../generated/graphql'

const EmployReviewCard = ({ name, }) => {
  const [reviewContent, setReviewContent] = useState<string>('')
  const [resSubmitFeedback, submitFeedback] = useSubmitFeedbackMutation()


  const handleTextAreaChange = (changedText: string) => {
    setReviewContent(changedText)
    const submitFeedbackInput = {
      rating: 5,
      feedback: changedText,
      isCompleted: true
    }

    submitFeedback({ submitFeedbackInput })
  }

  return (
    <CardWrapper>
      <ReviewWrapper>
        <TextFieldWrapper>
          <HeaderWrapper>
            <h3>
              {`Editing Area`}
            </h3>
            <h3>
              {`for Employee ${name}`}
            </h3>
          </HeaderWrapper>
          <CustomTextArea
            text={reviewContent}
            handleChange={handleTextAreaChange}
            editable={true}
          />
        </TextFieldWrapper>
      </ReviewWrapper>
    </CardWrapper>
}

export default EmployReviewCard


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