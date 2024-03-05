import React, { useEffect, useState } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import './bookForm.css'
import BooksList from '../components/booksList.js'
import { Multiselect } from 'multiselect-react-dropdown'

function BookForm() {

    const initialValues = {
        title: '',
        selectedBook: [],
        chapters: [],
    }

    const [numberOfBooks, setNumberOfBooks] = useState(0);
    const [formData, setFormData] = useState(initialValues);
    const [addBook, setAddBook] = useState([]);
    const [allBooks, setAllBooks] = useState([]);
    const [userBook, setUserBook] = useState();

    useEffect(() => {
        setAllBooks(BooksList);
    }, []);

    useEffect(() => {
        const bookData = allBooks.filter((book) => book.name === formData.selectedBook);
        setUserBook(bookData)
        console.log(userBook, "selected book", formData.selectedBook)
    }, [formData.selectedBook])

    console.log(formData, "all books")

    function handleBookAdd() {
        if (numberOfBooks !== 0) {
        }
        setNumberOfBooks(numberOfBooks + 1);
        addBook.push(numberOfBooks)
        setAddBook(addBook);
        console.log(addBook, "books", numberOfBooks)
    }

    function handleInput(e) {
        const name = e.target.name;
        const value = e.target.value;

        if (name === 'title') {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }))
        }
        else {
            const data = name.append(value)
            setFormData(prev => ({
                ...prev,
                [name]: data
            }))
        }
        console.log(formData)
    }

    function handleSubmit(e) {
        e.preventDefault();

        const isValid = ValidateForm();
    }

    function ValidateForm() {
        const existingData = JSON.parse(localStorage.getItem("Form Data"))
        if (formData.title.length === 0) {
            alert('Please enter Plan title');
        }
        if (formData.title === existingData.title) {
            alert('Title already exists!');
        }
    }

    return (
        <>
            <div className='outerDiv'>
                <Container fluid>
                    <div className='mainForm'>
                        <form onSubmit={handleSubmit}>
                            <Row> <h2 className='mainHeading'> Create New Plan </h2> </Row>
                            <Row>
                                <label className='textLabel'> Title Of Your Plan </label> <br />
                                <input type='text' name='title' value={formData.title} placeholder='Enter plan name here' className='textInput' onChange={handleInput} />
                            </Row>
                            <Row>
                                <label className='textLabel'>Select Books</label> <br />
                                {addBook?.map((Book) => (
                                    <>
                                        <Row key={Book}>
                                            <Col>
                                                <select onChange={handleInput} className='textInput' name='selectedBook'>
                                                    {
                                                        allBooks.map((book) => (
                                                            <>
                                                                <option key={book.id} > {book.name} </option>
                                                                <br />
                                                            </>
                                                        ))
                                                    }
                                                </select>
                                            </Col>
                                            <Col>
                                                <Multiselect options={userBook} onChange={handleInput} name='chapters' />
                                            </Col>
                                        </Row> </>
                                ))
                                }

                                <Button onClick={handleBookAdd} variant='secondary' value={numberOfBooks}> Add A Book </Button>
                            </Row>
                        </form>
                    </div>
                </Container >
            </div >
        </>
    )
}

export default BookForm