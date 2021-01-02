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

    get: () => {
        return 0
    },
}