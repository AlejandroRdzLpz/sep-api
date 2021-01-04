const {ExamenService} = require('../services/index')

module.exports = {
    create: async (req, res) => {
        try {
            const {escolaridad} = req.params;
            const createTable = await ExamenService.create(escolaridad)
            res.status(200).send({success: true, createTable});
        } catch (err) {
            res.status(500).send({error: err});
        }
    },
    
    post: async (req, res) => {
        try {
            const {escolaridad, grado, asignatura, modulo} = req.params;
            const {body} = req;
            const createExam = await ExamenService.post(escolaridad, grado, asignatura, modulo, body);
            res.status(200).send({success: true, createExam});
        } catch (err) {
            res.status(404).send({success: false, err});
        }
    },

    get: async (req, res) => {
        try {
            const {escolaridad} = req.params;
            const getExams = await ExamenService.get(escolaridad);
            res.status(200).send({success: true, getExams});
        } catch (err) {
            res.status(404).send({error: err})
        }
    },

    getOne: async (req, res) => {
        try {
            const {escolaridad, id} = req.params;
            const getOneExam = await ExamenService.getOne(escolaridad, id);
            res.status(200).send({success: true, getOneExam});
        } catch (err) {
            res.status(404).send({error: err})
        }
    },

    edit: async (req, res) => {
        try {
            const {escolaridad, grado, asignatura, modulo, id} = req.params;
            const {body} = req;
            const editExam = await ExamenService.edit(escolaridad, grado, asignatura, modulo, id, body);
            res.status(200).send({success: true, editExam});
        } catch (err) {
            res.status(404).send({error: err});
        }
    },

    addQuestion: async (req, res) => {
        try {
            const {escolaridad, grado, asignatura, modulo, id} = req.params;
            const {body} = req;
            const addQuestion = await ExamenService.addQuestion(escolaridad, grado, asignatura, modulo, id, body);
            res.status(200).send({success: true, addQuestion})
        } catch (err) {
            res.status(404).send({error: err})
        }
    },

    deleteQuestion: async (req, res) => {
        try {
            const {escolaridad, grado, asignatura, modulo, id, pregunta} = req.params;
            const deletePregunta = await ExamenService.deleteQuestion(escolaridad, grado, asignatura, modulo, id, pregunta);
            res.status(200).send({success: true, deletePregunta});
        } catch (err) {
            res.status(404).send({error: err})
        }
    },

    deleteExam: async (req, res) => {
        try {
            const {escolaridad, id} = req.params;
            const deleteExam = await ExamenService.deleteExam(escolaridad, id)
            res.status(200).send({success: true, deleteExam})
        } catch (err) {
            res.status(200).send({success: false, error: err})
        }
    }
}