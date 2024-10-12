import { Contact } from '../models/contact.js';

export const getAllContacts = async () => {
  return await Contact.find();
};

export const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

export const createContact = async (newContact) => {
  return await Contact.create(newContact);
};

export const updateContact = async (contactId, newContact) => {
  return await Contact.findByIdAndUpdate(contactId, newContact, {
    new: true,
  });
};

export const deleteContact = async (contactId) => {
  return await Contact.findByIdAndDelete(contactId);
};
