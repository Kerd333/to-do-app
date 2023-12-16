import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Task } from "../types/tasktype";
import { useState } from "react";
import { validateTime } from "../system/functions";
import Modal from 'react-bootstrap/Modal';

function Alert({show, type}: {show: boolean, type: "noName" | "noDate" | "noHour" | "invalidHour"}) {
    if (show) {
        if (type == "noName") {
            return <div style={{color:"red"}}> Name is required</div>
        } else if (type == "noDate") {
            return <div style={{color:"red"}}> Date is required</div>
        } else if (type == "noHour") {
            return <div style={{color:"red"}}> Hour is required</div>
        } else {
            return <div style={{color:"red"}}> Invalid hour. Enter 12-hour hh:mm</div>
        }
    }
    return null
}

export default function TaskForm({newTask, taskFunction, task = {id:0, name: "", date:"", hour:"", done:false}, handleClose}: {newTask: boolean; taskFunction: (task: Task) => void; task?: Task; handleClose: () => void}) {
    const [nameInvalid, setNameInvalid] = useState(false);
    const [dateInvalid, setDateInvalid] = useState(false);
    const [[hourInvalid, hourType], setHourInvalid] = useState([false, "noHour"]);
    let nameStyle = {borderColor: "blue"}
    let dateStyle = {borderColor: "blue"}
    let hourStyle = {borderColor: "blue"}
    
    if (nameInvalid) {
        nameStyle = {borderColor: "red"}
    }
    if (dateInvalid) {
        dateStyle = {borderColor: "red"}
    }
    if (hourInvalid) {
        hourStyle = {borderColor: "red"}
    }

    let buttonText = "Save";
    if (newTask) {
        buttonText = "Add";
    }
    return (
        <Form onSubmit={(event) => {
            event.preventDefault();
            let valid = true;
            const form = new FormData(event.currentTarget)
            const formName = form.get("name")
            const formDate = form.get("date")
            const formHour = form.get("hour")
            const formXM = form.get("XM")
            if (!formName || (typeof(formName) != "string")) {
                valid = false;
                setNameInvalid(true)
            }
            if (!formDate || (typeof(formDate) != "string")) {
                valid = false;
                setDateInvalid(true)
            }
            if (!formHour) {
                valid = false;
                setHourInvalid([true, "noHour"])
            }
            if (formHour && !validateTime(formHour as string)) {
                valid = false;
                setHourInvalid([true, "invalidHour"])
            }
            if (valid) {
                const newTask = {id: task.id, name:formName as string, date:formDate as string, hour:formHour + " " + formXM, done:task.done}
                taskFunction(newTask);
                handleClose();
            }
          }}>
            <Form.Group className="mb-3" controlId="formTaskName">
                <Form.Label>Task Name</Form.Label><Alert show={nameInvalid} type="noName"/>
                <Form.Control style={nameStyle} type="text" placeholder="Name" name="name" defaultValue={task.name} onChange={() => setNameInvalid(false)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTaskDate">
                <Form.Label>Task Date</Form.Label><Alert show={dateInvalid} type="noDate"/>
                <Form.Control style={dateStyle} type="date" name="date" defaultValue={task.date} onChange={() => setDateInvalid(false)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTaskHour">
                <Form.Label>Task Hour</Form.Label>
                <Alert show={hourInvalid} type={hourType  as "noHour" || "hourInvalid"}/>
                <Container>
                    <Row>
                        <Col style={{paddingLeft: "0"}}>
                        <Form.Control style={hourStyle} type="text" placeholder="hh:mm" name="hour" defaultValue={task.hour.slice(0,5)} onChange={() => setHourInvalid([false, "noHour"])}/>
                        </Col>
                        <Col style={{paddingRight: "0"}}>
                        <Form.Select style={{borderColor:"blue"}} name="XM" defaultValue={task.hour.slice(6)}>
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                        </Form.Select>
                        </Col>
                    </Row>
                </Container>
            </Form.Group>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Cancel
            </Button>
            <Button variant="primary" type="submit">
                {buttonText}
            </Button>
            </Modal.Footer>
        </Form>
    )
}