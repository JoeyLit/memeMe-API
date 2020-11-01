const express = require('express');
const router = express.Router();

// mysql database connection
const connection = require('../config/database');

//GET all New Meme WHERE MEMETYPE = MEMETYPE SELECTED BY USER with Pagination [ASCENDING ORDER]
router.get('/', (req, res, next)=>{
    //set memetype = memetype query param selected by user
    var memeTypeQuery = req.query.memetype;
    var sql = `SELECT * FROM mememe WHERE type =` +` '${memeTypeQuery}' ORDER BY timestamp DESC`;
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


// GET meme by id
router.get('/:id', (req, res, next)=>{
    connection.query('SELECT * FROM mememe WHERE id=?', [req.params.id], (err, rows, fields)=>{
        if(!err) {
            res.send(rows)
        }
    });
});

// DELETE meme by id
router.delete('/:id', (req, res, next)=>{
    connection.query('DELETE FROM mememe WHERE id=?', [req.params.id], (err, rows, fields)=>{
        if(!err) {
            res.send('deleted successfully')
        }
        else{
            console.log(err)
        }
    });
});





module.exports = router