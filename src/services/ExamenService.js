const {client} = require('../../connect-database');
const uuid = require('uuid')

module.exports = {
    create: async (escolaridad) => {
        try {
            await client.connect();
            const createUDT = await client.execute(`CREATE TYPE IF NOT EXISTS sep.contenido (\"reactivos\" map<text,text>)`)
            const escolaridadDB = await client.execute(`CREATE TABLE IF NOT EXISTS sep.${escolaridad} (\"id\" timeuuid,\"asignatura\" text,\"asignatura_id\" int,\"grado\" int,\"modulo\" int,\"contenido\" map<text,frozen<contenido>>, PRIMARY KEY(\"id\",\"asignatura_id\",\"grado\"))WITH CLUSTERING ORDER BY (\"asignatura_id\" DESC, \"grado\" DESC)`)
            const response = await client.execute(`SELECT * FROM sep.${escolaridad}`);
            return response
        } catch (err) {
            return err
        }
    },
    post: async (escolaridad, grado, asignatura, modulo, body) => {
        try {
            const preguntaNumero = Object.keys(body.contenido)[0]
            const reactivos = body.contenido[preguntaNumero].reactivos

            await client.connect();
            const createExamen = await client.execute(`INSERT INTO sep.${escolaridad} (\"id\", \"asignatura\", \"asignatura_id\", \"grado\", \"modulo\", \"contenido\") VALUES (${uuid.v1()}, \'${asignatura}\', ${body.asignaturaId}, ${grado}, ${modulo}, {\'${preguntaNumero}\': {reactivos: {\'texto\': \'${reactivos.texto}\', \'imagen\': \'${reactivos.imagen}\', \'opcion1\': \'${reactivos.opcion1}\', \'opcion2\': \'${reactivos.opcion2}\', \'opcion3\': \'${reactivos.opcion3}\', \'opcion4\': \'${reactivos.opcion4}\', \'respuesta\': \'${reactivos.respuesta}\'}}})`)
            const response = await client.execute(`SELECT * FROM sep.${escolaridad}`);
            return response
        } catch (err) {
            return err
        }
    },

    get: async (escolaridad) => {
        try {
            await client.connect();
            const examenes = await client.execute(`SELECT * FROM sep.${escolaridad}`)
            return examenes.rows;
        } catch (err) {
            return err
        }
    },

    getOne: async (escolaridad, id) => {
        try {
            await client.connect();
            const examenes = await client.execute(`SELECT * FROM sep.${escolaridad} WHERE id = ${id}`)
            return examenes
        } catch (err) {
            return err
        }
    },

    edit: async (escolaridad, grado, asignatura, modulo, id, body) => {
        const preguntaNumero = Object.keys(body.contenido)[0]
        const reactivos = body.contenido[preguntaNumero].reactivos
        try {
            await client.connect();
            const findOne = await client.execute(`SELECT * FROM sep.${escolaridad} WHERE id = ${id}`);
            const editExamenes = await client.execute(`INSERT INTO sep.${escolaridad} (\"id\", \"asignatura\", \"asignatura_id\", \"grado\", \"modulo\", \"contenido\") VALUES (${id}, \'${asignatura}\', ${body.asignaturaId}, ${grado}, ${modulo}, {\'${preguntaNumero}\': {reactivos: {\'texto\': \'${reactivos.texto}\', \'imagen\': \'${reactivos.imagen}\', \'opcion1\': \'${reactivos.opcion1}\', \'opcion2\': \'${reactivos.opcion2}\', \'opcion3\': \'${reactivos.opcion3}\', \'opcion4\': \'${reactivos.opcion4}\', \'respuesta\': \'${reactivos.respuesta}\'}}})`)
            const response = await client.execute(`SELECT * FROM sep.${escolaridad}`)
            return response
        } catch (err) {
            return err;
        }
    },

    addQuestion: async (escolaridad, grado, asignatura, modulo, id, body) => {
        const preguntaNumero = Object.keys(body.contenido)[0]
        const reactivos = body.contenido[preguntaNumero].reactivos
        try {
            await client.connect();
            const question = await client.execute(`UPDATE sep.${escolaridad} SET contenido = contenido + { '${preguntaNumero}': { reactivos: { 'texto': '${reactivos.texto}', 'imagen': '${reactivos.imagen}', 'opcion1': '${reactivos.opcion1}', 'opcion2': '${reactivos.opcion2}', 'opcion3': '${reactivos.opcion3}', 'opcion4': '${reactivos.opcion4}', 'respuesta': '${reactivos.respuesta}'} } } WHERE id = ${id} AND asignatura_id = ${body.asignaturaId} AND grado = ${grado}`)
            const response = await client.execute(`SELECT * FROM sep.${escolaridad} WHERE id = ${id}`)
            return response.rows
        } catch (err) {
            return err
        }
    },

    editQuestion: async (escolaridad, grado, asignatura, modulo, id, body) => {
        const preguntaNumero = Object.keys(body.contenido)[0]
        const reactivos = body.contenido[preguntaNumero].reactivos
        try {
            await client.connect();
            const editPregunta = client.execute(`UPDATE sep.${escolaridad} SET contenido['${preguntaNumero}'] = {reactivos: {'texto': '${reactivos.texto}', 'imagen': '${reactivos.imagen}', 'opcion1': '${reactivos.opcion1}', 'opcion2': '${reactivos.opcion2}',  'opcion3': '${reactivos.opcion3}', 'opcion4': '${reactivos.opcion4}', 'respuesta', '${reactivos.respuesta}'}} WHERE id = ${id} AND asignatura_id = ${body.asignaturaId} AND grado = ${grado}`)
            const resultado = client.execute(`SELECT * FROM sep.${escolaridad} WHERE id = ${id}`)
            return resultado
        } catch (err) {
            return err
        }
    },

    deleteQuestion: async (escolaridad, grado, asignatura, modulo, id, pregunta) => {
        const asignaturaId = 0;
        switch (asignatura) {
            case 'lectura':
                asignaturaId = 1;
                break;
            case 'texto':
                asignaturaId = 2;
                break;
            case 'matematicas':
                asignaturaId = 3; 
                break;
            default:
                asignaturaId = 0
                break;
        }
        try {
            await client.connect();
            const deletePregunta = await client.execute(`UPDATE sep.${escolaridad} SET contenido = contenido - {'${pregunta}'} WHERE id = ${id} AND asignatura_id = ${asignaturaId} AND grado = ${grado}`)
        } catch (err) {
            
        }
    },

    deleteExam: async (escolaridad, id) => {
        try {
            await client.connect();
            const deleteExamen = await client.execute(`DELETE FROM sep.${escolaridad} WHERE id = ${id}`)
            const resultado = await client.execute(`SELECT * FROM sep.${escolaridad}`)
            return resultado
        } catch (err) {
            return err
        }
    }
}