const db = require('../../utils/database');
const scheduleQuery = require('../../data/queries/schedule/schedule.query')


module.exports = class Schedule {
    constructor(id, day, hour, total) {
        this.id = id;
        this.day = day;
        this.hour = hour;
        this.total = total;
    }

    save() {
        return db.insertUpdate(
            scheduleQuery.insert(),
            [this.day, this.hour, this.total]
        );
    }

    static getDay(day) {
        return db.select(
            scheduleQuery.select(), [day]
        )
    }

    static selectSingle(id) {
        return db.select(
            scheduleQuery.selectSingle(), [id]
        )
    }

    static updateReduceTotal(id) {
        return db.insertUpdate(
            scheduleQuery.updateReduceTotal(), [id]
        )
    }

    static updateAddTotal(id) {
        return db.insertUpdate(
            scheduleQuery.updateAddTotal(), [id]
        )
    }

    static delete() {
        return db.insertUpdate(
            scheduleQuery.delete(), []
        )
    }
}