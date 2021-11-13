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

      let mealsTable = "CREATE TABLE IF NOT EXISTS Meals(" +
        "products TEXT," +
        "calories  DECIMAL(10,5),"+
        "carbs  DECIMAL(10,5)," +
        "sugar  DECIMAL(10,5),"+
        "fats  DECIMAL(10,5),"+
        "protein  DECIMAL(10,5)," +
        "date TEXT" +
      ");";

      let productsTable = "CREATE TABLE IF NOT EXISTS Products("+
        "name VARCHAR(255),"+
        "calories  DECIMAL(10,5),"+
        "carbs  DECIMAL(10,5),"+
        "sugar  DECIMAL(10,5),"+
        "fats  DECIMAL(10,5),"+
        "protein  DECIMAL(10,5),"+
        "description TEXT, photo TEXT"+
      ");";

      return this.exec(mealsTable+productsTable);

    }


    getProducts()
    {
      return this.exec("SELECT *, Products.rowid FROM Products ORDER BY Products.rowid DESC");
    }

    getProduct(productId) {
      return this.exec("SELECT *, Products.rowid FROM products WHERE Products.rowid = ?", [productId]);
    }

    getProductsByName(name, limit = 5) {
      let q = "SELECT *, Products.rowid FROM products WHERE name LIKE ? LIMIT ?";
      return this.exec(q, ['%'+name+'%', limit]);
    }

    saveProduct(product)
    {
      let query = "INSERT INTO Products (name, calories, carbs, sugar, fats, protein) VALUES (?,?,?,?,?,?)";

      let params = [
        product.name,
        product.calories,
        product.carbs,
        product.sugar,
        product.fats,
        product.protein
      ];

      return this.exec(query, params);
    }

    getMeals(limit = 5)
    {
      let q = "SELECT *, Meals.rowid FROM Meals ORDER BY Meals.rowid DESC LIMIT ?";

      return this.exec(q, [limit]);
    }

    dropTables() {
      return this.exec(
        "DROP TABLE IF EXISTS Products;" +
        "DROP TABLE IF EXISTS Meals;"
      )
    }

    insertTestData()
    {
      let sql = "INSERT INTO Products (name, calories, carbs, sugar, fats, protein) VALUES (?,?,?,?,?,?),(?,?,?,?,?,?),(?,?,?,?,?,?)";
      let params = [
        'Bananas 1', 89, 23, 12, 0.3, 1.1,
        'Bananas T1', 100, 20, 10, 0.3, 1.2,
        'Bananas T2', 110, 30, 20, 0.5, 1.5,
      ];

      return this.exec(sql, params);
    }
}

export default new Database(db);


