import express from 'express';
import contactController from '../controllers/contactController.js';

const router = express.Router();

router.post('/contact', contactController.submitContactForm);
router.get('/contact', contactController.getContacts); // Optional admin route

export default router;
