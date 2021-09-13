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
  assignReview: Review;
  createEmployee: Employee;
  deleteEmployee: Employee;
  submitFeedback: ReviewResponse;
  updateEmployee?: Maybe<Employee>;
};


export type MutationAssignReviewArgs = {
  reviewee: Scalars['Int'];
  reviewer: Scalars['Int'];
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

export type CreateEmployeeMutationVariables = Exact<{
  employeeName: Scalars['String'];
}>;


export type CreateEmployeeMutation = { __typename?: 'Mutation', createEmployee: { __typename?: 'Employee', id: number, name: string, createdAt: string } };

export type DeleteEmployeeMutationVariables = Exact<{
  deleteEmployeeId: Scalars['Int'];
}>;


export type DeleteEmployeeMutation = { __typename?: 'Mutation', deleteEmployee: { __typename?: 'Employee', id: number, name: string } };

export type UpdateEmployeeMutationVariables = Exact<{
  updateEmployeeName: Scalars['String'];
  updateEmployeeId: Scalars['Int'];
}>;


export type UpdateEmployeeMutation = { __typename?: 'Mutation', updateEmployee?: Maybe<{ __typename?: 'Employee', id: number, name: string }> };

export type EmployeesQueryVariables = Exact<{ [key: string]: never; }>;


export type EmployeesQuery = { __typename?: 'Query', employees: Array<{ __typename?: 'Employee', id: number, name: string }> };


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