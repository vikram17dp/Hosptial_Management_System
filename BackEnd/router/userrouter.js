import express from 'express'
import { addNewAdmin, login, patientRegister } from '../controllers/userController.js';
import {isAdminAuthenicated,isPatientAuthenicated} from '../middlewares/auth.js'

const router = express.Router();

router.post('/patient/register',patientRegister);
router.post('/login',login)
router.post('/admin/addNewAdmin',isAdminAuthenicated,addNewAdmin)
// router.get('/doctors',getAllDoctors)
// router.get('/admin/me',isAdminAuthenicated,getAllUserDetails);
// router.get('/patient/me',isPatientAuthenicated,getAllUserDetails)
// router.get('/admin/logout',isAdminAuthenicated,logoutAdmin)
// router.get('/patient/logout',isPatientAuthenicated,logoutPatient)
// router.post('/doctor/addnew',isAdminAuthenicated,addNewDoctor)

export default router;