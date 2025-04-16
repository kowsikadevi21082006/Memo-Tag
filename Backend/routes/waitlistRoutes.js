import express from 'express';
import waitlistController from '../controllers/waitlistController.js';

const router = express.Router();

router.post('/waitlist', waitlistController.joinWaitlist);
router.get('/waitlist', waitlistController.getWaitlist); // Optional admin route

export default router;
