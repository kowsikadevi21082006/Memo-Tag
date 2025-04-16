import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import asyncHandler from '../middleware/asyncHandler.js';
import { successHandler, errorHandler } from '../middleware/responseHandler.js';

const prisma = new PrismaClient();

const submitContactForm = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return errorHandler(res, 'All fields are required', 400);
  }

  const contact = await prisma.contact.create({
    data: { name, email, message },
  });

  successHandler(res, contact, 'Message submitted successfully', 201);
});

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await prisma.contact.findMany();
  successHandler(res, contacts);
});

export default { submitContactForm, getContacts };
