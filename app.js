const express = require('express');
const app = express();
const PORT = 3000;
const tasks = require('./MOCK_DATA.json');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hola nodemon');
})
//Obtener todas las tareas
app.get('/tasks', (req, res) => {
    res.status(200).json({
        message: "Tareas encontradas",
        data: tasks
    })
})
//Obtener una tarea en particular
app.get('/tasks/:id', (req, res) => {
    let task = tasks.find(t => t.id == req.params.id)
    res.status(200).json({
        message: "Tarea encontrada", 
        data: task
    })
})
//Crear una nueva tarea
app.post('/tasks/crear', (req, res) => {
    const body = req.body
    let newTask = {
        id: body.id,
        description: body.description,
        start: body.start,
        end: body.end,
        status: body.status,
        geolong: body.geolong,
        geolat: body.geolat
    }
    res.status(201).json({
        message: "Tarea creada correctamente",
        data: newTask
    })
})
//Editar una tarea
app.put('/tasks/editar/:id', (req, res) => {
    const id = req.params.id
    const body = req.body
    let task = tasks.find(t => t.id == id)
    task = body
    res.status(200).json({
        message: "Tarea editada correctamente", 
        data: task
    })
})
//Eliminar una tarea
app.delete('/tasks/eliminar/:id', (req, res) => {
    const id = req.params.id;
    let task = tasks.find(t => t.id == id)
    tasks.pop(task);
    res.status(200).json({
        message: "Tarea eliminada correctamente",
        data: task
    })
})
app.listen(PORT, (err, res) =>{
    console.log('Arranco el server');
})