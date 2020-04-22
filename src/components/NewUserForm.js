import React, { useState } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

const NewUserForm = () => {

  const [form, setForm] = useState({
    firstName: '',
    lastName: ''
  })

  const handleFirstNameChange = (e) => {
    setForm({ ...form, firstName: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();

  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>First Name</Label>
        <Input placeholder="First name" onChange={handleFirstNameChange}></Input>
      </FormGroup>
    </Form>
  )
}

export default NewUserForm;
