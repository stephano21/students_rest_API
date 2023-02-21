import { Router } from "express";
import {getStudents, getStudent, createStudents,updateStudent, deleterStudent} from "../controllers/students.controlles.js";


const router = Router();


router.get('/students',getStudents)

router.get('/student/:id',getStudent)


router.post('/students',createStudents)


router.patch('/students/:id',updateStudent)


router.delete('/students/:id',deleterStudent)

export default router