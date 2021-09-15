
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Grid, VStack } from '@chakra-ui/react'
import { Review, useReviewsQuery } from '../../generated/graphql'
import SubmitReviewCard from '../../components/SubmitReviewCard'

const UseReviewsFetched = () => {
  const [{ data, fetching }] = useReviewsQuery()
  return data?.reviews as Review[]
}

const EmployeeSubmitFeedback = () => {
 
  const { asPath } = useRouter()
  
  const employeeName = asPath.split('/').slice(-1)[0]
  const reviews = UseReviewsFetched()
  const reviewsWaited = (reviews !== undefined) ?
    reviews.filter(review => (review.reviewedBy === employeeName) && !review.isCompleted) :
    undefined

  
  return (
    <VStack>
      <ReviewWrapper>
      {
        (reviewsWaited !== undefined && reviewsWaited.length !== 0) ?
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        {
          reviewsWaited.map((review, index) =>
            <SubmitReviewCard
              key={index}
              review={review}
              reviewedName={review.reviewedEmployee.name}
            />
          )
        }
        </Grid> :
      <NotificationMessage />
      }
      </ReviewWrapper>
    </VStack>
  )
}

export default EmployeeSubmitFeedback


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

const NotificationWrapper = styled.div`
  height: 30px;
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: orange;
  padding: 8px;
`

const StyledMessage = styled.p`
  font-size: 16px;
  color: white;
  font-weight: bold;
`

const NotificationMessage = () => (
  <NotificationWrapper>
    <span>
      <StyledMessage>
      Currently you do not have reviews assigned to you.
      </StyledMessage>
    </span>
  </NotificationWrapper>
)  
