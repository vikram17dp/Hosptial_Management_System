import express from 'express';
import { postAppointment } from '../controllers/appointmentController.js';
import {isPatientAuthenicated} from '../middlewares/auth.js'


const router = express.Router();

router.post('/post',isPatientAuthenicated,postAppointment)

export default router;