import TaskElement from './task'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup, Accordion } from 'react-bootstrap';
import { Task } from '../types/tasktype';
import { Dispatch, SetStateAction } from 'react';
import { filterFutureTasks, filterPastTasks, filterTodayTasks, deleteTaskConstructor, editTaskConstructor } from '../system/functions';

function TaskMenu({tasks, setTasks}: {tasks:Task[]; setTasks:Dispatch<SetStateAction<Task[]>>}) {
    const TodayTasks = filterTodayTasks(tasks);
    const PastTasks = filterPastTasks(tasks);
    const FutureTasks = filterFutureTasks(tasks);
    return (
        <Accordion className="w-80 p-3" defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Today's Tasks</Accordion.Header>
                <Accordion.Body>
                    <ListGroup style={{height: "50vh", overflowY: "scroll"}}>
                        {(TodayTasks.length == 0) ? <h4>You don't have any task today!</h4> : TodayTasks.map((task) => <TaskElement task={task} editTask={editTaskConstructor(task, tasks, setTasks)} deleteTask={deleteTaskConstructor(tasks, setTasks)} key={task.id}></TaskElement>)}
                    </ListGroup>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Past Tasks</Accordion.Header>
                <Accordion.Body>
                    <ListGroup style={{height: "50vh", overflowY: "scroll"}}>
                        {(PastTasks.length == 0) ? <h4>You don't have any past task!</h4> : PastTasks.map((task) => <TaskElement task={task} editTask={editTaskConstructor(task, tasks, setTasks)} deleteTask = {deleteTaskConstructor(tasks, setTasks)} key={task.id}></TaskElement>)}
                    </ListGroup>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>Future Tasks</Accordion.Header>
                <Accordion.Body>
                    <ListGroup style={{height: "50vh", overflowY: "scroll"}}>
                        {(FutureTasks.length == 0) ? <h4>You don't have any future task!</h4> : FutureTasks.map((task) => <TaskElement task={task} editTask={editTaskConstructor(task, tasks, setTasks)} deleteTask = {deleteTaskConstructor(tasks, setTasks)} key={task.id}></TaskElement>)}
                    </ListGroup>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default TaskMenu;