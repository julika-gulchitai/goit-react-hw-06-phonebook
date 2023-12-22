import {
  StyledBtn,
  StyledForm,
  StyledInput,
  StyledLabel,
} from './ContactForm.styled.js';
import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'store/contactsSlice.js';

export const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contactsList.contacts);

  const handleInputName = e => {
    setName(e.target.value);
    if (contacts.some(contact => contact.name === name)) {
      alert(`Such contact is already exists!`);
      return name;
    }
  };
  const handleInputNumber = e => {
    setNumber(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const newContact = { name, number, id: nanoid() };

    dispatch(addContact(newContact));
    setName('');
    setNumber('');
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledLabel>
        {'Name'}
        <StyledInput
          name="name"
          value={name}
          type="text"
          onChange={handleInputName}
          placeholder="name"
          required
        ></StyledInput>
      </StyledLabel>
      <StyledLabel>
        {'Number'}
        <StyledInput
          name="number"
          value={number}
          type="tel"
          onChange={handleInputNumber}
          placeholder="phone number"
          required
        ></StyledInput>
      </StyledLabel>
      <StyledBtn>Add contacts</StyledBtn>
    </StyledForm>
  );
};
