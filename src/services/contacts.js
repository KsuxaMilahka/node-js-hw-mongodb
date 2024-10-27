import { Contact } from '../models/contact.js';

export const getAllContacts = async (
  userId,
  filter = {},
  page = 1,
  perPage = 4,
  sortBy = 'name',
  sortOrder = 'asc',
) => {
  const searchFilter = { ...filter, userId };

  const totalItems = await Contact.countDocuments(searchFilter);

  const contacts = await Contact.find(searchFilter)
    .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
    .skip((page - 1) * perPage)
    .limit(perPage);

  return { contacts, totalItems };
};

export const getContactById = async (contactId, userId) => {
  return await Contact.findOne({ _id: contactId, userId });
};

export const createContact = async (newContact) => {
  return await Contact.create(newContact);
};

export const updateContact = async (contactId, userId, newContact) => {
  return await Contact.findOneAndUpdate(
    { _id: contactId, userId },
    newContact,
    {
      new: true,
    },
  );
};

export const deleteContact = async (contactId, userId) => {
  return await Contact.findOneAndDelete({ _id: contactId, userId });
};
