const express = require('express');
const router = express.Router();

// mysql database connection
const connection = require('../config/database');


//GET all meme with Pagination [RANDOM ORDER]
router.get('/', (req, res, next)=>{
    connection.query('SELECT * FROM `mememe` ORDER BY Rand()', (err, rows, fields)=>{
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