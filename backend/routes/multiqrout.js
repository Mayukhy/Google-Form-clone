import express from 'express'
import {getq,creatq,deleteq} from '../controllers/multiqcontroller.js'
const router = express.Router()
router.get('/',getq)
router.post('/',creatq)
router.delete('/:id',deleteq)

export default router