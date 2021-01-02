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
    }
}