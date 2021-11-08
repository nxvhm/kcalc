import SQLite  from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'kcalc.db' });

class Database {
    db;

    constructor(db) {
        this.db = db;
    }

    exec(sql, params) {
        return new Promise( (resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(sql , params, (db, results) => {
                    resolve(results);
                }, error => {
                    reject(error);
                });
            })
        })
    }



    test() {
        console.log('dasdasdas');
    }
}

export default new Database(db);


