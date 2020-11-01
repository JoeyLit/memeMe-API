const express = require('express');
const router = express.Router();

// mysql database connection
const connection = require('../config/database');


//GET all FULLTEXT SEARCH RESULT FROM ALL CULLUMNS of mememe with Pagination 
router.get('/', (req, res, next)=>{
    //set searchQuery = search query input param by user
    var searchQuery = req.query.search
    var sql = `SELECT * FROM mememe WHERE MATCH (tag1, tag2, tag3, description, category) AGAINST ('${searchQuery}')`;
    connection.query(sql, (err, rows, fields)=>{
        if(!err){

            /*=========== PAGINATION WITH NEXT AND PREVIOUS===========*/
            const page = parseInt(req.query.page)
            const limit = parseInt(req.query.limit)

            const startIndex = (page - 1) * limit
            const endIndex = page * limit
            const results = {}

        if (endIndex < rows.length) {
            results.next = {
                page: page + 1,
                limit: limit,
            }
        }
    
        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }
        
        results.results = rows.slice(startIndex, endIndex)
        res.send(results)
      /* __________  End of pagination with next and previous____*/
        }
        else{
            console.log(err)
        }
    })
});




module.exports = router