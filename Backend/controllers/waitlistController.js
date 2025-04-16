import prisma from '../config/database.js'
import asyncHandler from '../middleware/asyncHandler.js';
import { successHandler, errorHandler } from '../middleware/responseHandler.js';


const joinWaitlist = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return errorHandler(res, 'Email is required', 400);
  }
  const existing = await prisma.waitlist.findUnique({ where: { email } });
  if (existing) {
    return successHandler(res, existing, 'You’re already on the waitlist');
  }
    const entry = await prisma.waitlist.create({ data: { email } });
    console.log(entry)
    successHandler(res, entry, 'Successfully joined the waitlist!', 201);
});

const getWaitlist = asyncHandler(async (req, res) => {  
  const waitlist = await prisma.waitlist.findMany();
  successHandler(res, waitlist);
});

export default { joinWaitlist, getWaitlist };
