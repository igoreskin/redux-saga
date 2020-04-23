import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const NewUserForm = (props) => {

  const [form, setForm] = useState({
    firstName: '',
    lastName: ''
  })

  const handleNameChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(form);
    setForm({ firstName: '', lastName: '' })
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>First Name</Label>
        <Input name="firstName" required placeholder="First name" onChange={handleNameChange} value={form.firstName}></Input>
      </FormGroup>
      <FormGroup>
        <Label>Last Name</Label>
        <Input name="lastName" required placeholder="Last name" onChange={handleNameChange} value={form.lastName}></Input>
      </FormGroup>
      <FormGroup>
        <Button block outline type="submit" color="primary">Create</Button>
      </FormGroup>
    </Form>
  )
}

export default NewUserForm;
