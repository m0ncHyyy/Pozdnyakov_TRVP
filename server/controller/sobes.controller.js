const db = require('../db');

class SobesController {
    async createSobes(req, res) {
        const { fio, time_visit, abilities, specialist_id } = req.body;
        const newSobes = await db.query(
            `INSERT INTO sobes (fio, time_visit, abilities, specialist_id) values ($1, $2, $3, $4) RETURNING *`,
            [fio, time_visit, abilities, specialist_id]
        );
        res.json(newSobes.rows[0]);
    }

    async getSobeses(_, res) {
        const sobeses = await db.query('SELECT * FROM sobes');
        res.json(sobeses.rows);
    }

    async getOneSobes(req, res) {
        const id = req.params.id;
        const sobes = await db.query('SELECT * FROM sobes WHERE id = $1', [id]);
        res.json(sobes.rows[0]);
    }

    async updateSobes(req, res) {
        const { id, fio, time_visit, abilities, specialist_id } = req.body;
        const sobes = await db.query(
            'UPDATE sobes SET fio = $1, time_visit = $2, abilities = $3, specialist_id = $4 where id = $5 RETURNING *',
            [fio, time_visit, abilities, specialist_id, id]
        );
        res.json(sobes.rows[0]);
    }

    async deleteSobes(req, res) {
        const id = req.params.id;
        const sobes = await db.query('DELETE FROM sobes WHERE id = $1', [id]);
        res.json(sobes.rows[0]);
    }

    async getManagerSobeses(req, res) {
        const specialist_id = req.params.specialist_id;
        const sobes = await db.query('SELECT * FROM sobes WHERE specialist_id = $1', [specialist_id]);
        res.json(sobes.rows);
    }
}

module.exports = new SobesController();
