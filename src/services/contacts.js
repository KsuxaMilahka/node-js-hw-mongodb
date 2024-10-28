import createHttpError from 'http-errors';
import { Contact } from '../models/contact.js';
import { skipMiddlewareFunction } from 'mongoose';

export const getAllContacts = async (
  userId,
  filter = {},
  page = 1,
  perPage = 4,
  sortBy = 'name',
  sortOrder = 'asc',
) => {
  if (!userId) {
    throw createHttpError(400, 'Invalid user ID');
  }
  const query = { userId, ...filter };
  if (filter.contactType) {
    query.contactType = filter.contactType;
  }

  if (filter.isFavourite !== undefined) {
    query.isFavourite = filter.isFavourite;
  }

  const totalItems = await Contact.countDocuments(query);
  contacts.where('userId').equals(userId);
  const contacts = await Promise.all([
    Contact.countDocuments(query),
    query
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]);

  return { contacts, totalItems };
};

export const getContactById = async (contactId) => {
  return await Contact.findOne({ _id: contactId });
};

export const createContact = async (newContact) => {
  return await Contact.create(newContact);
};

export const updateContact = async (contactId, newContact) => {
  return await Contact.findOneAndUpdate({ _id: contactId }, newContact, {
    new: true,
  });
};

export const deleteContact = async (contactId, userId) => {
  return await Contact.findOneAndDelete({ _id: contactId, userId });
};
