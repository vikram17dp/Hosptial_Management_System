import express from 'express';
import { deleteAppointment, getAllAppointment, postAppointment, updateAppointmentStatus } from '../controllers/appointmentController.js';
import {isAdminAuthenicated, isPatientAuthenicated} from '../middlewares/auth.js'


const router = express.Router();

router.post('/post',isPatientAuthenicated,postAppointment)
router.get('/getAllAppointment',isAdminAuthenicated,getAllAppointment)
router.put('/update/:id',isAdminAuthenicated,updateAppointmentStatus)
router.delete('/delete/:id',isAdminAuthenicated,deleteAppointment);


export default router;