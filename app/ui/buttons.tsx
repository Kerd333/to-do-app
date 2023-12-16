import { useState, Dispatch, SetStateAction } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TaskForm from './taskForm';
import { Task } from '../types/tasktype';
import { Form, ListGroup } from 'react-bootstrap';
import TaskElement from './task';
import { editTaskConstructor, deleteTaskConstructor } from '../system/functions';

interface IProps {
    myVar: boolean;
    setMyVar?: Dispatch<SetStateAction<boolean>>;
}

export function WelcomeButton() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Continue
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Continue</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formTaskName">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Name"/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Continue to App
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export function DoneButton({onClick, done}:{onClick: () => void, done: boolean}) {
    if (done) {
        return (
            <>
                <Button className="m-1" variant="secondary" onClick={onClick}>
                    Undo
                </Button>
            </>
        )
    }
    return (
        <>
            <Button className="m-1" variant="success" onClick={onClick}>
                Done
            </Button>
        </>
    )
}

export function EditButton({task, editTask}: {task: Task, editTask:(newTask: Task) => void}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Button className="m-1" variant="primary" onClick={handleShow}>
                Edit
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Task "{task.name}"</Modal.Title>
                </Modal.Header>
                <Modal.Body><TaskForm newTask={false} taskFunction={editTask} task={task}  handleClose={handleClose} /></Modal.Body>
            </Modal>
        </>
    )
}

export function DeleteButton({task, deleteTask}: {task: Task, deleteTask:(task: Task) => void}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleDelete = () => {
        setShow(false)
        setTimeout(() => deleteTask(task), 250)
    };
    const handleShow = () => setShow(true);
    return (
        <>
            <Button className="m-1" variant="danger" onClick={handleShow}>
                Delete
            </Button>

            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Delete Task "{task.name}"</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
                Delete
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export function NewTaskButton({addTask}: {addTask: (task: Task) => void}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add New Task
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Task</Modal.Title>
                </Modal.Header>
            <Modal.Body>
                <TaskForm newTask={true} taskFunction={addTask} handleClose={handleClose}/>
            </Modal.Body>
        </Modal>
        </>
    )
}

export function TasksFilterButton({name, tasks, filter, setTasks}: {name:string, tasks: Task[], filter: (tasks: Task[]) => Task[], setTasks:Dispatch<SetStateAction<Task[]>>}) {
    const [show, setShow] = useState(false);

    const tasksToDisplay = filter(tasks);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                {name}
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <ListGroup style={{height: "60vh", overflowY: "scroll"}}>
                        {(tasksToDisplay.length == 0) ? <h4>You don't have any {name.toLowerCase()}!</h4> : tasksToDisplay.map((task) => <TaskElement task={task} editTask={editTaskConstructor(task, tasks, setTasks)} deleteTask = {deleteTaskConstructor(tasks, setTasks)} key={task.id}></TaskElement>)}
                </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}