import { useState } from 'react'
import Select, { StylesConfig, ValueType } from 'react-select'
import styled from 'styled-components'

export type AssigneeType = {
  value: string
  label: string
}

interface SelectorProps {
  options: AssigneeType[] 
  value: AssigneeType | undefined | []
  onChange: (option: any) => void
}

// ToDo: Conversion of any to the type based on react-select
const customStyles = {
  container: (provided: any, state: any) => ({
    ...provided,
    // borderBottom: '1px dotted lightgray',
    color: state.isSelected ? 'orange' : 'lightgray',
    width: '100%',
    border: 'none'
    // height: '30px',
    // backgroundColor: 'teal',
    // display: 'block',
  }),
  control: (provided: any, state: any) => ({
    ...provided,
    // borderBottom: '1px dotted lightgray',
    color: state.isSelected ? 'orange' : 'lightgray',
    width: '100%',
    height: '30px',
    backgroundColor: 'transparent',
    border: 0,
    boxShadow: 'none'
  }),
  valueContainer: (base: any) => ({
    ...base,
    width: '100%',
    height: '100%',
  }),
  option: (provided: any) => ({
    ...provided,
    borderBottom: '1px dotted lightgray',
    width: '100%'
  }),
  input: (provided: any) => ({
    ...provided,
    width: '100%',
    backgroundColor: 'none'
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    color: 'black'
  }),
  indicatorSeparator: (provided: any) => ({
    ...provided,
    display: 'none'
  }),
}

export const CustomSelector = ({ options, onChange, value }: SelectorProps) => {
  
  return (
    <SelectWrapper>
      <Select<AssigneeType>
        options={options}
        value={value}
        onChange={onChange}
        styles={customStyles}
        isClearable={true}
      />
    </SelectWrapper>
  )
}


const SelectWrapper = styled.div`
  width: 95%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`