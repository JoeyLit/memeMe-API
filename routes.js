const hostName = 'localhost:8080';

exports.index = function(req, res){
    message = '';
   if(req.method == "POST"){
      var post  = req.body;
      var type= post.meme_type;
      var description= post.meme_description;
      var category= post.meme_category;
      var tag1= post.meme_tag1;
      var tag2= post.meme_tag2;
      var tag3= post.meme_tag3;
 
	  if (!req.files)
				return res.status(400).send('No files were uploaded.');
 
		var file = req.files.meme_image;
      var img_name=file.name;
      var addDate = Date.now();
      var url = `http://www.`+`${hostName}`+`/${addDate}_${file.name}`
      ;

	  	 if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
                                 
              file.mv('public/images/upload_images/'+addDate
              +"_" +file.name, function(err) {
                             
	              if (err)
 
	                return res.status(500).send(err);
      					var sql = "INSERT INTO `mememe`(`category`,`description`,`type`,`tag1`, `tag2`,`tag3` ,`image`) VALUES ('" + description + "','" + category + "','" + type + "','" + tag1 + "','" + tag2 + "','" + tag3 + "','" + url + "')";
 
    						var query = db.query(sql, function(err, result) {
    							 res.redirect('profile/'+result.insertId);
    						});
					   });
          } else {
            message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
            res.render('index.ejs',{message: message});
          }
   } else {
      res.render('index');
   }
 
};

exports.profile = function(req, res){
	var message = '';
	var id = req.params.id;
    var sql="SELECT * FROM `mememe` WHERE `id`='"+id+"'"; 
    db.query(sql, function(err, result){
	  if(result.length <= 0)
	  message = "Profile not found!";
	  
      res.render('profile.ejs',{data:result, message: message});
   });
};
