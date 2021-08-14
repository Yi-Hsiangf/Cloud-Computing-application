// require express and other modules
const express = require('express');
const app = express();
// Express Body Parser
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Set Static File Directory
app.use(express.static(__dirname + '/public'));


/************
 * DATABASE *
 ************/

const db = require('./models');

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', (req, res) => {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  res.json({
    message: 'Welcome to my app api!',
    documentationUrl: '', //leave this also blank for the first exercise
    baseUrl: '', //leave this blank for the first exercise
    endpoints: [
      {method: 'GET', path: '/api', description: 'Describes all available endpoints'},
      {method: 'GET', path: '/api/profile', description: 'Data about me'},
      {method: 'GET', path: '/api/books/', description: 'Get All books information'},
      {method: 'POST', path: '/api/books/', description: 'Add a book information into database'},
      {method: 'PUT', path: '/api/books/', description: 'Update a book information based upon the specified ID'},
      {method: 'DELETE', path: '/api/books/', description: 'Delete a book based upon the specified ID'},
      // TODO: Write other API end-points description here like above
    ]
  })
});
// TODO:  Fill the values
app.get('/api/profile', (req, res) => {
  res.json({
    'name': 'Vivid',
    'homeCountry': 'Taiwan',
    'degreeProgram': 'Informatics',//informatics or CSE.. etc
    'email': 'yihsiang.fang@gmail.com',
    'deployedURLLink': '',//leave this blank for the first exercise
    'apiDocumentationURL': '', //leave this also blank for the first exercise
    'currentCity': 'Munich',
    'hobbies': ['Vollyball', 'Baseball']

  })
});
/*
 * Get All books information
 */
app.get('/api/books/', (req, res) => {
  /*
   * use the books model and query to mongo database to get all objects
   */

  console.log('GET');
  db.books.find({}, function (err, books) {
    if (err) throw err;
    /*
     * return the object as array of json values
     */
    console.log(books);
    res.json(books);
  });
});
/*
 * Add a book information into database
 */


app.post('/api/books/', (req, res) => {

  /*
   * New Book information in req.body
   */
  console.log('POST');
  console.log(req.body);
  /*
   * TODO: use the books model and create a new object
   * with the information in req.body
   */
  
  /*
  var newBook = new db.books({title: req.body.title,
      author: req.body.author,
      releaseDate: req.body.releaseDate,
      genre: req.body.genre,
      rating: req.body.rating,
      language: req.body.language}
    )  
    newBook.save(function (err, newBook) {
    if (err) return console.error(err);
    */
    db.books.create(req.body, (err, newBook) => {
	if (err) throw err;
	res.json(newBook);
    });
});    

/*
 * Update a book information based upon the specified ID
 */
app.put('/api/books/:id', (req, res) => {
  /*
   * Get the book ID and new information of book from the request parameters
   */
  console.log('PUT');

  const bookId = req.params.id;
  const bookNewData = req.body;
  console.log(`book ID = ${bookId} \n Book Data = ${bookNewData}`);

  /*
   * TODO: use the books model and find using the bookId and update the book information
   */
   
   
  /* 
  db.books.updateOne({title: bookNewData.title,
    author: bookNewData.author,
    releaseDate: bookNewData.releaseDate,
    genre: bookNewData.genre,
    rating: bookNewData.rating,
    language: bookNewData.language}, function(err, res) {
  });
  
  var updatedBookInfo = req.params;
  */
  
 	db.books.findOneAndUpdate({_id: bookId},
	bookNewData, {new: true}, (err, updatedBookInfo) => {
  	if (err) throw err;
  	/*
  	* Send the updated book information as a JSON object
  	*/
  	res.json(updatedBookInfo);
  	});
});
/*
 * Delete a book based upon the specified ID
 */
app.delete('/api/books/:id', (req, res) => {
  /*
   * Get the book ID of book from the request parameters
   */
  console.log('DELETE');
  const bookId = req.params.id;
  /*
   * TODO: use the books model and find using
   * the bookId and delete the book
   */

  /*
  db.books.deleteOne({ _id: bookId }, function (err) {
    if (err) return handleError(err);
    // deleted at most one book document
  });
  var deletedBook = req.params
  res.json(deletedBook);
  */
  
  db.books.findOneAndRemove({_id: bookId},
  (err, deletedBookInfo) => {
    if (err) throw err;
    /*
    * Send the deleted book information as a JSON object
    */
    res.json(deletedBookInfo);
  });

});


/**********
 * SERVER *
 **********/

// listen on the port 3000
app.listen(process.env.PORT || 80, () => {
  console.log('Express server is up and running on http://localhost:80/');
});
