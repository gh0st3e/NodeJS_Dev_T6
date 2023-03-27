let db_data = [
    { id: "1", name: 'Leonov Denis', bday: '08-04-2003' },
    { id: "2", name: "Kotovich Roman", bday: '12-03-2002' },
    { id: "3", name: 'John Doe', bday: '31-12-2000' }
];

function DB() {
    this.select = function () {
        return db_data;
    }

    this.insert = function (r) {
        let index = db_data.findIndex((element) => element.id === r.id);
        if (index == -1) {
            db_data.push(r)
        }
    }

    this.update = function (id, r) {
        let index = db_data.findIndex((element) => element.id === id);
        if (index != -1) {
            db_data[index].name = r.name
            db_data[index].bday = r.bday
        }
    }

    this.delete = function (id) {
        let deletedUser;
        const index = db_data.findIndex(item => item.id === id);
        if (index !== -1) {
            deletedUser = db_data[index];
            db_data.splice(index, 1);
        }
        return deletedUser

    }
}


exports.DB = DB