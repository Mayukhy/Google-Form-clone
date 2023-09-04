import express from 'express'
import {getans,creatans,deleteans} from '../controllers/mcqrescontroller.js'
const router = express.Router()
router.get('/',getans)
router.post('/',creatans)
router.delete('/:id',deleteans)

export default router