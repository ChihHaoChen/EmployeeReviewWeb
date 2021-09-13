import { useMemo, ChangeEvent, KeyboardEvent, useState, EventHandler } from "react"
import styled from "styled-components"

interface EditableInputProps {
  value: string
  fieldName: string
  onValueChange: (value: string) => void
}

const EditableInput = ({ value, fieldName, onValueChange }: EditableInputProps) => {
  const [inputValue, setInputValue] = useState(value);

  useMemo(() => { setInputValue(value) }, [value]);
  
  const handleTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setInputValue(value);
  }
  
  const onSubmit = () => {
    onValueChange(inputValue);
  }
    
  const handleKeyPressed: EventHandler<KeyboardEvent<HTMLInputElement>> = (event) => {
    if (event.key === 'Enter') {
      onSubmit();
    }
  }
  
  const onBlur = () => {
    onSubmit();
  }
  
  return (
    <InputWrapper>
      <CustomInput 
          onChange={handleTextFieldChange}
          placeholder={`Please input employee's name`}
          value={inputValue}
          name={fieldName}
          onSubmit={onSubmit}
          onKeyDownCapture={handleKeyPressed}
          onBlur={onBlur}
        />
    </InputWrapper>
  )
}

export default EditableInput

const CustomInput = styled.input`
  background-color: #f5f6f8;
  font-size: 20px;
  color: black;
  display: block;
  width: 100%;
  height: 100%;
  border: none;
  text-align: center;
  &:focus {
    outline: none;
  }
  &:hover {
    outline-offset: -4px;
    outline: 0.5px dashed black;
    background-color: white;
  }
`

const InputWrapper = styled.div`
  height: 32px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px;
`
