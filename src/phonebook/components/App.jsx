import { useState, useEffect } from 'react';
import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import {
  Container,
  StyledTitle,
  StyledTitles,
} from './ContactForm/ContactForm.styled';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('CONTACTS')) ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('CONTACTS', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = newContact => {
    if (contacts.some(contact => contact.name === newContact.name)) {
      alert('Contact has already added!');
      return;
    }
    setContacts(contacts => [...contacts, newContact]);
  };

  const handleSetFilter = e => {
    setFilter(e.target.value);
  };

  const getFiltredContacts = () => {
    if (filter) {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      );
    }
    return contacts;
  };

  const handleDeleteContact = id => {
    setContacts(contacts => contacts.filter(contact => contact.id !== id));
  };

  return (
    <Container>
      <StyledTitle>Phonebook</StyledTitle>
      <ContactForm addContact={handleAddContact} />
      <StyledTitles>Contacts</StyledTitles>
      <Filter filter={filter} handleInputChange={handleSetFilter} />
      <ContactList
        filteredContacts={getFiltredContacts()}
        deleteContact={handleDeleteContact}
      />
    </Container>
  );
};