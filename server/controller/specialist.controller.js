const db = require('../db');

class SpecialistController {
    async createSpecialist(req, res) {
        const { fio, abilities, time_start, time_finish } = req.body;
        const newSpecialist = await db.query(
            `INSERT INTO specialist (fio, abilities, time_start, time_finish) values ($1, $2, $3, $4) RETURNING *`,
            [fio, abilities, time_start, time_finish]
        );
        res.json(newSpecialist.rows[0]);
    }

    async getSpecialists(req, res) {
        const specialists = await db.query('SELECT * FROM specialist');
        res.json(specialists.rows);
    }

    async getOneSpecialist(req, res) {
        const id = req.params.id;
        const specialist = await db.query('SELECT * FROM specialist WHERE id = $1', [id]);
        res.json(specialist.rows[0]);
    }

    async updateSpecialist(req, res) {
        const { id, fio, abilities, time_start, time_finish } = req.body;
        const specialist = await db.query(
            'UPDATE specialist set fio = $1, abilities = $2, time_start = $3, time_finish = $4 where id = $5 RETURNING *',
            [fio, abilities, time_start, time_finish, id]
        );
        res.json(specialist.rows[0]);
    }

    async deleteSpecialist(req, res) {
        const id = req.params.id;
        await db.query('DELETE FROM sobes WHERE specialist_id = $1', [id]);
        const specialist = await db.query('DELETE FROM specialist WHERE id = $1', [id]);
        res.json(specialist.rows[0]);
    }
}

module.exports = new SpecialistController();
