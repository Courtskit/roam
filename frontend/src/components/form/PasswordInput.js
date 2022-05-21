import { useState } from "react";

import {
  InputGroup,
  InputRightElement,
  Button,
  Input,
} from "@chakra-ui/react";

function PasswordInput(props) {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  return (
    <InputGroup size='md'>
      <Input
        {...props}
        pr='4.5rem'
        type={show ? 'text' : 'password'}
        placeholder="Password" 
      />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}

export default PasswordInput;
