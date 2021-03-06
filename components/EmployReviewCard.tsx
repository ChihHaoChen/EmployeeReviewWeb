import styled from 'styled-components'
import { Review } from '../generated/graphql'
import CustomTextArea from './CustomTextArea'
import { CheckCircleIcon } from '@chakra-ui/icons'

interface EmployReviewCardProps {
  review: Review
  handleTextAreaChange: (text: string) => void
}

const EmployReviewCard = ({ review, handleTextAreaChange }: EmployReviewCardProps) => {
  const { reviewedBy, isCompleted, feedback } = review

  return (
    <TextFieldWrapper>
      <HeaderWrapper>
        <h3>
          {`Reviewed by ${reviewedBy}`}
        </h3>
        <IconWrapper>
          {
            isCompleted ?
            <CheckCircleIcon
              boxSize={20}
              color='#0e6b03'
            />:
            <CheckCircleIcon
              boxSize={20}
              color='#e75480'
            />
          }
        </IconWrapper>
      </HeaderWrapper>
      <CustomTextArea
        text={feedback}
        handleChange={handleTextAreaChange}
        editable={false}
      />
    </TextFieldWrapper>
  )
}

export default EmployReviewCard


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