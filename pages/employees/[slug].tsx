
import { useRouter } from 'next/router'
import { useState } from 'react'
import styled from 'styled-components'
import CustomTextArea from '../../components/CustomTextArea'
import { Grid, GridItem, Box, VStack, Container } from '@chakra-ui/react'
import { Review, useSubmitFeedbackMutation, useReviewsQuery } from '../../generated/graphql'

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
  console.log('reviews waited =>', reviewsWaited)

  
  return (
    <VStack>
      <ReviewWrapper>
      {
        (reviewsWaited !== undefined) &&
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        {
          reviewsWaited.map((review, index) =>
           
          )
        }
        </Grid>
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
