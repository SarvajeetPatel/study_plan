import React, { useEffect, useState } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './bookForm.css'
import BooksList from '../components/booksList.js'
import Multiselect from 'multiselect-react-dropdown';


function PlanForm() {

    const [title, setTitle] = useState('');
    const [selectedBook, setSelectedBook] = useState([]);
    const [chapters, setChapters] = useState([]);

    const [numberOfDayTime, setNumberOfDayTime] = useState(0);
    const [numberOfBooks, setNumberOfBooks] = useState(0);
    const [addBook, setAddBook] = useState([]);
    const [addTime, setAddTime] = useState([]);
    const [allBooksData, setAllBooksData] = useState([]);

    const daysOfWeek = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ]

    let oneBook;
    let chp = [];

    function handleChange(e) {
        setSelectedBook(
            [...selectedBook, e.target.value]
        )
    }

    useEffect(() => {
        oneBook = allBooksData.filter(userBook => userBook.name === selectedBook[selectedBook.length - 1])
        const newChapters = oneBook.map(chap => chap.chapters)

        const newArray = newChapters.map(ch => ch.map((chapp) => chapp.name))
        chp = newArray[0];

        console.log(oneBook, "the one book", selectedBook, "chapters", chp)
    }, [selectedBook])

    useEffect(() => {
        setAllBooksData(BooksList);
    }, []);

    function handleBookAdd() {

        setNumberOfBooks(numberOfBooks + 1);
        addBook.push(numberOfBooks)
        setAddBook(addBook);
    }

    function handleAddTime() {
        setNumberOfDayTime(numberOfDayTime + 1);
        addTime.push(numberOfDayTime)
        setAddTime(addTime)
    }

    function handleSubmit(e) {
        e.preventDefault();

        const isValid = ValidateForm();
    }

    function ValidateForm() {
        const existingData = JSON.parse(localStorage.getItem("Form Data"))
        if (title.length === 0) {
            alert('Please enter Plan title');
        }
        if (title === existingData.title) {
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
                                <input type='text' name='title' value={title} placeholder='Enter plan name here'
                                    className='textInput' onChange={(e) => setTitle(e.target.value)} />
                            </Row>
                            <Row>
                                <label className='textLabel'>Select Books</label> <br />
                                {addBook?.map((Book) => (
                                    <>
                                        <Row key={Book}>
                                            <Col className='col-md-3' >
                                                <select onChange={handleChange} className='textInput' name='selectedBook'>
                                                    {
                                                        allBooksData.map((book) => (
                                                            <>
                                                                <option key={book.id} > {book.name} </option>
                                                                <br />
                                                            </>
                                                        ))
                                                    }
                                                </select>
                                            </Col>
                                            <Col className='col-md-5'>
                                                {chp &&
                                                    <>
                                                        <Multiselect
                                                            options={chp}
                                                            isObject={false}
                                                            showCheckbox
                                                            showArrow
                                                        />
                                                        <br />
                                                    </>
                                                }
                                            </Col>
                                        </Row>
                                    </>
                                ))
                                }
                            </Row>
                            <br />
                            <Row>
                                <Button onClick={handleBookAdd} variant='secondary' value={numberOfBooks} className='buttonCss'> Add A Book </Button>
                            </Row>


                            <Row>
                                <label className='textLabel'>Select Timings </label> <br />
                                {
                                    daysOfWeek.map((days, index) => (
                                        <Col key={index}>
                                            <Row className='weekdays'> {days} </Row>
                                            
                                            <Row className='weekdays'>
                                                <button onClick={handleAddTime} value={numberOfDayTime} style={{ width: '100px' }}> +  </button>
                                            </Row>
                                        </Col>
                                    ))
                                }
                            </Row>

                        </form>
                    </div>
                </Container >
            </div >
        </>
    )
}

export default PlanForm