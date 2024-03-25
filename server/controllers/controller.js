const bookModel = require("../models/bookModel")


const getAllBooks = async (request, response) => {
    try{
        const books = await bookModel.Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        })
    } catch (error) {
        console.log(error.message)
        response.status(500).send({message: error.message})
    }
}

const singleBook = async (request, response) => {
    try{
        const { id } = request.params;
        const book = await bookModel.Book.findById(id);
        return response.status(200).json(book)
    } catch (error) {
        console.log(error.message)
        response.status(500).send({message: error.message})
    }
}

const createBook = async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                message: "Send all required fields: title, author, publishYear"
            })
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        };
        const book = await bookModel.Book.create(newBook);
        return res.status(201).send(book)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
}

const updateBook = async (request, response) => {
    try{
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
          ) {
            return response.status(400).send({
              message: 'Send all required fields: title, author, publishYear',
            });
          }
      
          const { id } = request.params;
      
          const result = await bookModel.Book.findByIdAndUpdate(id, request.body);
      
          if (!result) {
            return response.status(404).json({ message: 'Book not found' });
          }
      
          return response.status(200).send({ message: 'Book updated successfully' });
      
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
}

const deleteBook = async (request, response) => {
    try {
        const { id } = request.params;
    
        const result = await bookModel.Book.findByIdAndDelete(id);
    
        if (!result) {
          return response.status(404).json({ message: 'Book not found' });
        }
    
        return response.status(200).send({ message: 'Book deleted successfully' });
      } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
      }
}

module.exports = {
    getAllBooks,
    singleBook,
    createBook,
    updateBook,
    deleteBook
}