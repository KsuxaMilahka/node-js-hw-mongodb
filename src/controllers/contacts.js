import createHttpError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';

export const getContactsController = async (req, res) => {
  const {
    page = 1,
    perPage = 4,
    sortBy = 'name',
    sortOrder = 'asc',
    type,
    isFavourite,
  } = req.query;

  const { _id: userId } = req.user;
  const filter = { userId };
  if (type) filter.contactType = type;
  if (isFavourite) filter.isFavourite = isFavourite === 'true';

  const { contacts, totalItems } = await getAllContacts(
    userId,
    filter,
    page,
    perPage,
    sortBy,
    sortOrder,
  );

  const totalPages = Math.ceil(totalItems / perPage);
  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: {
      data: contacts,
      page: Number(page),
      perPage: Number(perPage),
      totalItems,
      totalPages,
      hasPreviousPage,
      hasNextPage,
    },
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  const contact = await getContactById(contactId, userId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const { _id: userId } = req.user;

  const newContact = await createContact({
    ...req.body,
    userId,
  });

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: newContact,
  });
};

export const updateContactController = async (req, res) => {
  const { contactId } = req.params;

  const { _id: userId } = req.user;

  const result = await updateContact(contactId, userId, req.body);

  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  const result = await deleteContact(contactId, userId);
  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(204).json({
    status: 204,
    message: `Contact deleted successfully`,
  });
};
