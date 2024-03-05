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
    const [options, setOptions] = useState([]);
    const [numberOfDayTime, setNumberOfDayTime] = useState(0);
    const [numberOfBooks, setNumberOfBooks] = useState(0);
    const [addBook, setAddBook] = useState([]);
    const [addTime, setAddTime] = useState([]);
    const [allBooksData, setAllBooksData] = useState([]);

    const daysOfWeek = [
        { 'id': 0, 'day': 'Sunday' },
        { 'id': 1, 'day': 'Monday' },
        { 'id': 2, 'day': 'Tuesday' },
        { 'id': 3, 'day': 'Wednesday' },
        { 'id': 4, 'day': 'Thursday' },
        { 'id': 5, 'day': 'Friday' },
        { 'id': 6, 'day': 'Saturday' },
    ]

    function handleChange(e) {
        setSelectedBook(
            [...selectedBook, e.target.value]
        )
        const oneBook = allBooksData.filter(userBook => userBook.name === e.target.value)
        const newChapters = oneBook[0].chapters

        const chap = newChapters.map(ch => ch.name)
        console.log(chap)
        setOptions(chap)
    }

    console.log(options, "options", selectedBook, addTime)
    // useEffect(() => {
    //     oneBook = allBooksData.filter(userBook => userBook.name === selectedBook[selectedBook.length - 1])
    //     const newChapters = oneBook.map(chap => chap.chapters)

    //     const newArray = newChapters.map(ch => ch.map((chapp) => chapp.name))
    //     chp = newArray[0];

    //     console.log(oneBook, "the one book", selectedBook, "chapters", chp)
    // }, [selectedBook])

    useEffect(() => {
        setAllBooksData(BooksList);
    }, []);

    function handleBookAdd() {

        setNumberOfBooks(numberOfBooks + 1);
        addBook.push(numberOfBooks)
        setAddBook(addBook);
    }

    function handleAddTime(e) {

        console.log(e.target.value)
        setNumberOfDayTime(numberOfDayTime + 1);
        // addTime.push(e.target.value)

        setAddTime(e.target.value)
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
                                                {selectedBook &&
                                                    <>
                                                        <Multiselect
                                                            options={options}
                                                            defaultvalues={options}
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
                                    daysOfWeek.map((days) => (

                                        <Col key={days.id} value={days.id}>
                                            <Row className='weekdays' value={days.id}> {days.day} </Row>
                                            {
                                                (addTime === days.id) ?
                                                    <Row>
                                                        <Col> <input type='text' placeholder='From Time' /> </Col>
                                                        <Col> <input type='text' placeholder='To Time' /> </Col>
                                                    </Row>
                                                    : ""
                                            }

                                            <Row className='weekdays' value={numberOfDayTime}>
                                                <Button onClick={handleAddTime} style={{ width: '100px' }} variant='secondary' value={days.id} > + </Button>
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