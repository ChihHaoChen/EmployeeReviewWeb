import { useEffect, useMemo, useRef, useState, ChangeEvent, KeyboardEvent, EventHandler } from 'react'
import styled from 'styled-components';

interface TextAreaProps {
  text: string
  handleChange: (text: string) => void
  editable: boolean
}

const CustomTextArea = ({ text, handleChange, editable }: TextAreaProps) => {
  const textAreaRef = useRef(null)
  const [textValue, setTextValue] = useState(text)

  useMemo(() => { setTextValue(text) }, [text])

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target
    setTextValue(value)

  }

  const onSubmit = () => {
    if (editable) {
      handleChange(textValue)
      setTextValue('')
    }
  }
    
  const handleKeyPressed: EventHandler<KeyboardEvent<HTMLTextAreaElement>> = (event) => {
    if (event.key === 'Enter') {
      onSubmit();
    }
  }
  
  const onBlur = () => {
    onSubmit()
  }

  // useEffect(() => {
  //   if (!textAreaRef && (textAreaRef.current)) {
  //     textAreaRef.current.style.height = '0px';
  //     textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  //   }
  // }, [textValue])

  return (
    <StyledTextArea 
      ref={textAreaRef}
      value={textValue}
      onChange={handleTextAreaChange}
      onBlur={onBlur}
      onSubmit={onSubmit}
      onKeyDownCapture={handleKeyPressed}
    />
  )
}

export default CustomTextArea

const StyledTextArea = styled.textarea`
resize: none;
overflow: scroll;
width: 100%;
height: 100%;
min-height: 23px;
padding-left: 2px;
padding-top: 2px;
padding-bottom: 2px;
max-height: 42px;
display: block;
border: none;
outline: none;
text-overflow: ellipsis;
line-height: 19px;
box-sizing: border-box;
max-height: none;
max-width: none;
border-radius: 4px;
background-color: #f5f6f8;
&:hover {
  outline-offset:  -1px;
  outline: 0.5px dashed lightorange;
}

&:focus {
  outline-offset:  -1px;
  outline: 0.5px solid orange;
}
`
