const { db } = require('../db');

const getList = async (req, res, next)=>{
    try{
        const result = await db.query('SELECT * FROM task ORDER BY id;');
        res.json(result.rows);
    }catch(er){
        //envia el tipo de error
        next(er);
    }
}

const getTask = async (req, res, next)=>{
    try{
        const { id } = req.params;
        const result = await db.query('SELECT * FROM task WHERE id = $1;', [ id ]);
        if(result.rows.length === 0) 
            return res.status(404).json({
                message: "Tarea no encontrada"
            });
        else
            res.json(result.rows[0]);
    }catch(er){
        //envia el tipo de error
        next(er);
    }
}

const postTask = async (req, res, next)=>{
    try{
        const { titulo, descripcion } = req.body;
        const result = await db.query('INSERT INTO task ( titulo, descripcion ) VALUES ($1, $2) RETURNING *;', [ titulo, descripcion ]);
        res.send(result.rows[0]);
    }catch(er){
        //envia el tipo de error
        next(er);
    }
};

const putTask = async (req, res, next)=>{
    try{
        const { id } = req.params;
        const { titulo, descripcion } = req.body;
        const result = await db.query('UPDATE task SET titulo = $1, descripcion = $2 WHERE id = $3 RETURNING *;', [ titulo, descripcion, id ]);
        if(result.rows.length === 0) 
            return res.status(404).json({
                message: "Tarea no encontrada"
            });
        else
            res.json(result.rows[0]);
    }catch(er){
        //envia el tipo de error
        next(er);
    }
}

const deleteTask = async (req, res, next)=>{
    try{
        const { id } = req.params;
        const result = await db.query('DELETE FROM task WHERE id = $1 RETURNING *;', [ id ]);
        if(result.rows.length === 0) 
            return res.status(404).json({
                message: "Tarea no encontrada"
            });
        else
            return res.sendStatus(204);
    }catch(er){
        //envia el tipo de error
        next(er);
    }
}

module.exports = { getList, getTask, postTask, putTask, deleteTask };