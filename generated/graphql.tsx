import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Employee = {
  __typename?: 'Employee';
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  adminReview: Review;
  assignReview: Review;
  createEmployee: Employee;
  deleteEmployee: Employee;
  submitFeedback: ReviewResponse;
  updateEmployee?: Maybe<Employee>;
};


export type MutationAdminReviewArgs = {
  reviewAdminInput: ReviewAdminInput;
};


export type MutationAssignReviewArgs = {
  revieweeId: Scalars['Float'];
  reviewerName: Scalars['String'];
};


export type MutationCreateEmployeeArgs = {
  name: Scalars['String'];
};


export type MutationDeleteEmployeeArgs = {
  id: Scalars['Int'];
};


export type MutationSubmitFeedbackArgs = {
  submitInput: SubmitReviewInput;
};


export type MutationUpdateEmployeeArgs = {
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  employee?: Maybe<Employee>;
  employees: Array<Employee>;
  reviews: Array<Review>;
};


export type QueryEmployeeArgs = {
  id: Scalars['Float'];
};

export type Review = {
  __typename?: 'Review';
  createdAt: Scalars['String'];
  feedback: Scalars['String'];
  id: Scalars['Float'];
  isCompleted: Scalars['Boolean'];
  rating: Scalars['Float'];
  reviewedBy: Scalars['String'];
  reviewedEmployee: Employee;
  reviewedEmployeeId: Scalars['Float'];
  updatedAt: Scalars['String'];
};

export type ReviewAdminInput = {
  feedback: Scalars['String'];
  rating: Scalars['Float'];
  reviewedEmployeeId: Scalars['Float'];
};

export type ReviewResponse = {
  __typename?: 'ReviewResponse';
  errors?: Maybe<Array<FieldError>>;
  review?: Maybe<Review>;
};

export type SubmitReviewInput = {
  feedback: Scalars['String'];
  rating: Scalars['Float'];
  reviewedBy: Scalars['String'];
  reviewedEmployeeId: Scalars['Float'];
};

export type AdminReviewMutationVariables = Exact<{
  adminReviewInput: ReviewAdminInput;
}>;


export type AdminReviewMutation = { __typename?: 'Mutation', adminReview: { __typename?: 'Review', reviewedEmployeeId: number, rating: number, isCompleted: boolean } };

export type AssignReviewMutationVariables = Exact<{
  assignRevieweeId: Scalars['Float'];
  assignReviewerName: Scalars['String'];
}>;


export type AssignReviewMutation = { __typename?: 'Mutation', assignReview: { __typename?: 'Review', reviewedEmployeeId: number, reviewedBy: string } };

export type CreateEmployeeMutationVariables = Exact<{
  employeeName: Scalars['String'];
}>;


export type CreateEmployeeMutation = { __typename?: 'Mutation', createEmployee: { __typename?: 'Employee', id: number, name: string, createdAt: string } };

export type DeleteEmployeeMutationVariables = Exact<{
  deleteEmployeeId: Scalars['Int'];
}>;


export type DeleteEmployeeMutation = { __typename?: 'Mutation', deleteEmployee: { __typename?: 'Employee', id: number, name: string } };

export type SubmitFeedbackMutationVariables = Exact<{
  submitFeedbackInput: SubmitReviewInput;
}>;


export type SubmitFeedbackMutation = { __typename?: 'Mutation', submitFeedback: { __typename?: 'ReviewResponse', review?: Maybe<{ __typename?: 'Review', isCompleted: boolean, feedback: string, rating: number, reviewedBy: string, reviewedEmployeeId: number }> } };

export type UpdateEmployeeMutationVariables = Exact<{
  updateEmployeeName: Scalars['String'];
  updateEmployeeId: Scalars['Int'];
}>;


export type UpdateEmployeeMutation = { __typename?: 'Mutation', updateEmployee?: Maybe<{ __typename?: 'Employee', id: number, name: string }> };

export type EmployeesQueryVariables = Exact<{ [key: string]: never; }>;


export type EmployeesQuery = { __typename?: 'Query', employees: Array<{ __typename?: 'Employee', id: number, name: string }> };

export type ReviewsQueryVariables = Exact<{ [key: string]: never; }>;


export type ReviewsQuery = { __typename?: 'Query', reviews: Array<{ __typename?: 'Review', id: number, reviewedBy: string, reviewedEmployeeId: number, isCompleted: boolean, feedback: string, rating: number, reviewedEmployee: { __typename?: 'Employee', id: number, name: string } }> };


export const AdminReviewDocument = gql`
    mutation AdminReview($adminReviewInput: ReviewAdminInput!) {
  adminReview(reviewAdminInput: $adminReviewInput) {
    reviewedEmployeeId
    rating
    isCompleted
  }
}
    `;

export function useAdminReviewMutation() {
  return Urql.useMutation<AdminReviewMutation, AdminReviewMutationVariables>(AdminReviewDocument);
};
export const AssignReviewDocument = gql`
    mutation AssignReview($assignRevieweeId: Float!, $assignReviewerName: String!) {
  assignReview(revieweeId: $assignRevieweeId, reviewerName: $assignReviewerName) {
    reviewedEmployeeId
    reviewedBy
  }
}
    `;

export function useAssignReviewMutation() {
  return Urql.useMutation<AssignReviewMutation, AssignReviewMutationVariables>(AssignReviewDocument);
};
export const CreateEmployeeDocument = gql`
    mutation CreateEmployee($employeeName: String!) {
  createEmployee(name: $employeeName) {
    id
    name
    createdAt
  }
}
    `;

export function useCreateEmployeeMutation() {
  return Urql.useMutation<CreateEmployeeMutation, CreateEmployeeMutationVariables>(CreateEmployeeDocument);
};
export const DeleteEmployeeDocument = gql`
    mutation DeleteEmployee($deleteEmployeeId: Int!) {
  deleteEmployee(id: $deleteEmployeeId) {
    id
    name
  }
}
    `;

export function useDeleteEmployeeMutation() {
  return Urql.useMutation<DeleteEmployeeMutation, DeleteEmployeeMutationVariables>(DeleteEmployeeDocument);
};
export const SubmitFeedbackDocument = gql`
    mutation SubmitFeedback($submitFeedbackInput: SubmitReviewInput!) {
  submitFeedback(submitInput: $submitFeedbackInput) {
    review {
      isCompleted
      feedback
      rating
      reviewedBy
      reviewedEmployeeId
    }
  }
}
    `;

export function useSubmitFeedbackMutation() {
  return Urql.useMutation<SubmitFeedbackMutation, SubmitFeedbackMutationVariables>(SubmitFeedbackDocument);
};
export const UpdateEmployeeDocument = gql`
    mutation UpdateEmployee($updateEmployeeName: String!, $updateEmployeeId: Int!) {
  updateEmployee(name: $updateEmployeeName, id: $updateEmployeeId) {
    id
    name
  }
}
    `;

export function useUpdateEmployeeMutation() {
  return Urql.useMutation<UpdateEmployeeMutation, UpdateEmployeeMutationVariables>(UpdateEmployeeDocument);
};
export const EmployeesDocument = gql`
    query Employees {
  employees {
    id
    name
  }
}
    `;

export function useEmployeesQuery(options: Omit<Urql.UseQueryArgs<EmployeesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<EmployeesQuery>({ query: EmployeesDocument, ...options });
};
export const ReviewsDocument = gql`
    query Reviews {
  reviews {
    id
    reviewedBy
    reviewedEmployeeId
    isCompleted
    feedback
    rating
    reviewedEmployee {
      id
      name
    }
  }
}
    `;

export function useReviewsQuery(options: Omit<Urql.UseQueryArgs<ReviewsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ReviewsQuery>({ query: ReviewsDocument, ...options });
};