import { ContactElem } from 'components/ContactElem/ContactElem';
import { StyledContactsList } from 'components/ContactForm/ContactForm.styled';
import { useSelector } from 'react-redux';

export const ContactList = () => {
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase() || '')
  );

  return (
    <>
      <ul>
        <StyledContactsList>
          {filteredContacts.map(contact => (
            <ContactElem key={contact.id} {...contact} />
          ))}
        </StyledContactsList>
      </ul>
    </>
  );
};
