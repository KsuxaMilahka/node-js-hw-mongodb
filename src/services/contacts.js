import { Contact } from '../models/contact.js';

export const getAllContacts = async (
  filter = {},
  page = 1,
  perPage = 4,
  sortBy = 'name',
  sortOrder = 'asc',
) => {
  const totalItems = await Contact.countDocuments(filter);

  const contacts = await Contact.find(filter)
    .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
    .skip((page - 1) * perPage)
    .limit(perPage);

  return { contacts, totalItems };
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
