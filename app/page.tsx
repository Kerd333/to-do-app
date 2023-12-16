'use client';

import styles from './page.module.css'
import TaskMenu from './ui/taskMenu';
import { NewTaskButton, TasksFilterButton } from './ui/buttons';
import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Task } from './types/tasktype';
import { filterDoneTasks, filterNotDoneTasks, addTaskConstructor } from './system/functions';

export default function Home() {
  document.title = "To Do App"
  const [tasks, setTasks] = useState(() => {
    const tasksString = localStorage.getItem('tasks');
    if (tasksString !== null) {
      return JSON.parse(tasksString) as Task[]
    }
    return [] as Task[]
  });
  
  useEffect(() => {
    // storing input name
    localStorage.setItem('tasks', JSON.stringify(tasks));

  }, [tasks]);

  return (
    <main className="d-flex align-items-center justify-content-center" style={{height: "100vh", backgroundColor: "gray"}}>
      <div className={styles.mainDiv}>
        <TaskMenu tasks={tasks} setTasks={setTasks}/>
        <Container>
            <Row>
                <Col className="d-flex align-items-center justify-content-center"><NewTaskButton addTask={addTaskConstructor(tasks, setTasks)}/></Col>
                <Col className="d-flex align-items-center justify-content-center"><TasksFilterButton name={"Done Tasks"} tasks={tasks} filter={filterDoneTasks} setTasks={setTasks}/></Col>
                <Col className="d-flex align-items-center justify-content-center"><TasksFilterButton name={"Unfinished Tasks"} tasks={tasks} filter={filterNotDoneTasks} setTasks={setTasks}/></Col>
            </Row>
        </Container>
      </div>
    </main>
  )
}
