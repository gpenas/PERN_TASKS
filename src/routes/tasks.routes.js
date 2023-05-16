const { Router } = require("express");
const { getTask, postTask, putTask, deleteTask, getList } = require("../controllers/tasks.controllers");
//const { db } = require('../db');

const router = Router();

router.get('/', getList);

router.get('/:id', getTask);

router.post('/', postTask);

router.put('/:id', putTask);

router.delete('/:id', deleteTask);

module.exports = router;