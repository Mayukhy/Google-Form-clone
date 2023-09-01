import express from 'express'
import { creatResponse, deleteResponse, getResponse, getsingleResponse } from '../controllers/userResponse.js'
const router = express.Router()
router.get('/',getResponse)
router.post('/',creatResponse)
router.get('/:id',getsingleResponse)
router.delete('/:id',deleteResponse)

export default router