import { Col, Container, ListGroupItem, Row } from "react-bootstrap";
import { DoneButton, EditButton, DeleteButton } from "./buttons";
import { Task } from "../types/tasktype";

function TaskName({name, done}: {name: string, done: boolean}) {
    if (done) {
        return <del><h4>{name}</h4></del>
    }
    return <h4>{name}</h4>
}

export default function TaskElement({task, editTask, deleteTask}: {task: Task, editTask:(newTask: Task) => void, deleteTask: (newTask: Task) => void}) {
    function doneTask() {
        const newTask = {...task}
        newTask.done = !newTask.done
        editTask(newTask)
    }
    let bgColor={backgroundColor: "#ed6d6d"}
    if (task.done) {
        bgColor={backgroundColor: "#69b872"}
    }
    return (
        <ListGroupItem style={bgColor}>
            <Container>
                <Row>
                    <Col><TaskName name={task.name} done={task.done}/>{task.date} {task.hour}</Col>
                    <Col className="d-flex align-items-center justify-content-end"><DoneButton onClick={doneTask} done={task.done}/> <EditButton task={task} editTask={editTask}/> <DeleteButton task={task} deleteTask={deleteTask}/></Col>
                </Row>
            </Container>
        </ListGroupItem>
    )
}