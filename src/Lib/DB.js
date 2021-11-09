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

    init() {
        return this.exec(
            "CREATE TABLE IF NOT EXISTS Products(name VARCHAR(255), calories FLOAT, carbs FLOAT, fats FLOAT, protein FLOAT, description TEXT, photo TEXT)"
        );
    }

    getProducts()
    {
        return this.exec("SELECT *, Products.rowid FROM Products");
    }
}

export default new Database(db);


