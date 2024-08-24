import express from 'express'
import { addNewAdmin, getAllDoctors, getAllUserDetails, login, patientRegister } from '../controllers/userController.js';
import {isAdminAuthenicated,isPatientAuthenicated} from '../middlewares/auth.js'

const router = express.Router();

router.post('/patient/register',patientRegister);
router.post('/login',login)
router.post('/admin/addnew',isAdminAuthenicated,addNewAdmin)
router.get('/doctors',getAllDoctors)
router.get('/admin/me',isAdminAuthenicated,getAllUserDetails);
router.get('/patient/me',isPatientAuthenicated,getAllUserDetails)

export default router;