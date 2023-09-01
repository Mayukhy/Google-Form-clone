import express from 'express'
import {getForm,creatForm,updateForm,deleteForm,searchterm, getsingleForm} from '../controllers/formcontroller.js'
const router = express.Router()
router.get('/',getForm)
router.post('/',creatForm)
router.get('/:id',getsingleForm)
router.patch('/:id',updateForm)
router.delete('/:id',deleteForm)
router.get('/search/:key',searchterm)

export default router