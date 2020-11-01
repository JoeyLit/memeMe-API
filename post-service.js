
// mysql database connection
const connection = require('./config/database');

async function getPosts(offset) {
    

    if (!offset) {
        offset = 0
    }

    let query = "SELECT * FROM mememe LIMIT 5 OFFSET " + offset;

    const response = await new Promise((resolve, reject) => {
      connection.query(query, function(error, results) {
          if (error) reject (error);

          resolve(results);
      });

    });
// console.log(response)
}

module.exports = { getPosts }