import React, { useEffect, useState } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './bookForm.css'
import BooksList from '../components/booksList.js'
import Multiselect from 'multiselect-react-dropdown';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { TimePicker } from '@mui/x-date-pickers'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

function PlanForm() {

    const [title, setTitle] = useState('');
    const [selectedBook, setSelectedBook] = useState([]);
    const [totalTime, setTotalTime] = useState([]);
    const [options, setOptions] = useState([]);
    const [numberOfDayTime, setNumberOfDayTime] = useState(0);
    const [numberOfBooks, setNumberOfBooks] = useState(0);
    const [addBook, setAddBook] = useState([]);
    // const [addTime, setAddTime] = useState([]);
    const [allBooksData, setAllBooksData] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    // const [timeSelected, setTimeSelected] = useState([]);
    const [startTime, setStartTime] = useState([]);
    const [endTime, setEndTime] = useState([]);
    const [words, setWords] = useState(0);

    const days = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
    ]

    const [timingState, setTimingState] = useState({
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
    })

    let sum = 0;
    function handleChange(e) {
        setSelectedBook(
            [...selectedBook, e.target.value]
        )
        const oneBook = allBooksData.filter(userBook => userBook.name === e.target.value)
        const newChapters = oneBook[0].chapters

        newChapters.forEach((chData) => sum += chData.no_of_words)
        setWords(sum + words);
        const chap = newChapters.map(ch => ch.name)
        setOptions(chap)
    }

    useEffect(() => {
        setAllBooksData(BooksList);
    }, []);

    function handleBookAdd() {

        setNumberOfBooks(numberOfBooks + 1);
        addBook.push(numberOfBooks)
        setAddBook(addBook);
    }

    function handleTimeStart(time, i) {
        setStartTime([time.$H, time.$m])

        if (time.$H && time.$m && timingState[i][timingState[i].length - 1].length === 0) {
            timingState[i][timingState[i].length - 1].push(time.$H, time.$m)
            console.log(timingState, "first if");
        }
        else if (time.$H && time.$m && timingState[i][timingState[i].length - 1].length === 2) {
            timingState[i][timingState[i].length - 1].splice(0, 2)
            timingState[i][timingState[i].length - 1].push(time.$H, time.$m)
            console.log(timingState, "second if");
        }
        else if (time.$H && time.$m && timingState[i][timingState[i].length - 1].length === 4) {
            timingState[i][timingState[i].length - 1].splice(0, 4)
            timingState[i][timingState[i].length - 1].push(time.$H, time.$m)
            console.log(timingState, "second if");
        }
    }

    function handleTimeEnd(time, i) {
        setEndTime([time.$H, time.$m])

        if (time.$H && time.$m && timingState[i][timingState[i].length - 1].length === 2) {
            timingState[i][timingState[i].length - 1].push(time.$H, time.$m)
            console.log(timingState, "end 1st")
        }
        else if (time.$H && time.$m && timingState[i][timingState[i].length - 1].length === 4) {
            timingState[i][timingState[i].length - 1].splice(2, 2)
            timingState[i][timingState[i].length - 1].push(time.$H, time.$m)
            console.log(timingState, "end 2nd")
        }
    }

    console.log(startTime, endTime);
    useEffect(() => {
        const hours = words / 50;
        if (words % 50 !== 0) {
            hours += 1;
        }

        var finalHours = startTime[1] - endTime[1] - 1;
        var minutes = startTime[1] + (60 - endTime[1]);

        if (minutes >= 60) {
            finalHours++;
            minutes = minutes - 60;
        }

        console.log(finalHours, ":", minutes)
    }, [endTime])

    function handleAddTime(dayIndex) {

        console.log(totalTime, "total time")
        setTimingState(prevState => ({
            ...prevState,
            [dayIndex]: [...prevState[dayIndex], totalTime]
        }));
        setNumberOfDayTime(numberOfDayTime + 1);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const isValid = ValidateForm();
        if (isValid) {
            localStorage.setItem("data", JSON.stringify());
        }
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
                                    days.map((day, index) => (
                                        <Col key={index}>
                                            <Row>{day}</Row>

                                            {timingState[index].map((field, i) => (
                                                <>
                                                    <Row key={i}>
                                                        <Col>
                                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                <DemoContainer components={['TimePicker']}>
                                                                    <TimePicker label="From Time" minutesStep={15} onChange={(time) => handleTimeStart(time, index)} />
                                                                </DemoContainer>
                                                            </LocalizationProvider>
                                                        </Col>
                                                        <Col>
                                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                <DemoContainer components={['TimePicker']}>
                                                                    <TimePicker label="To Time" minutesStep={15} onChange={(time) => handleTimeEnd(time, index)} />
                                                                </DemoContainer>
                                                            </LocalizationProvider>
                                                        </Col>
                                                    </Row>
                                                    <br />
                                                </>
                                            ))}

                                            <Row>
                                                <Button onClick={() => handleAddTime(index)} variant='secondary' className='buttonNew'> + </Button>
                                            </Row>
                                        </Col>
                                    ))
                                }
                            </Row>

                            <Row>
                                <label className='textLabel'> Duration </label> <br />
                            </Row>
                            <Row>
                                <Col className='col-md-2'>Start Date</Col>
                                <Col> <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} minDate={new Date()} /> </Col>
                                <Col></Col>
                                <Col className='col-md-2'>End Date </Col>
                                <Col><div className='endTime'>Time</div></Col>
                            </Row>

                        </form>
                    </div>
                </Container >
            </div >
        </>
    )
}

export default PlanForm