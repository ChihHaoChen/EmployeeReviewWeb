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
  createEmployee: Employee;
  deleteEmployee: Scalars['Boolean'];
  submitFeedback: ReviewResponse;
  updateEmployee?: Maybe<Employee>;
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
  reviewedBy: Scalars['Float'];
  reviewedEmployee: Scalars['Float'];
  updatedAt: Scalars['String'];
};

export type ReviewResponse = {
  __typename?: 'ReviewResponse';
  errors?: Maybe<Array<FieldError>>;
  review?: Maybe<Review>;
};

export type SubmitReviewInput = {
  feedback: Scalars['String'];
  rating: Scalars['Float'];
  reviewedBy: Scalars['Float'];
  reviewedEmployee: Scalars['Float'];
};

export type DeleteEmployeeMutionMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteEmployeeMutionMutation = { __typename?: 'Mutation', deleteEmployee: boolean };

export type EmployeesQueryVariables = Exact<{ [key: string]: never; }>;


export type EmployeesQuery = { __typename?: 'Query', employees: Array<{ __typename?: 'Employee', id: number, name: string }> };


export const DeleteEmployeeMutionDocument = gql`
    mutation DeleteEmployeeMution($id: Int!) {
  deleteEmployee(id: $id)
}
    `;

export function useDeleteEmployeeMutionMutation() {
  return Urql.useMutation<DeleteEmployeeMutionMutation, DeleteEmployeeMutionMutationVariables>(DeleteEmployeeMutionDocument);
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