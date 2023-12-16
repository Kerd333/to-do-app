import { Task } from "../types/tasktype";
import { Dispatch, SetStateAction } from "react";

export function addTaskConstructor(tasks: Task[], setTasks: Dispatch<SetStateAction<Task[]>>) {
    function addTask(task: Task) {
        let newId = 1;
        if (tasks.length != 0) {
          newId = Math.max(...tasks.map((task) => task.id)) + 1;
        }
        task.id = newId;
        const newTasks = [...tasks, task];
        newTasks.sort(taskSorter)
        setTasks(newTasks)
    }
    return addTask
}

export function editTaskConstructor(task: Task, tasks: Task[], setTasks: Dispatch<SetStateAction<Task[]>>) {
    const editTask = function (newTask: Task) {
        const index = tasks.indexOf(task);
        const newTasks = [...tasks];
        newTasks.splice(index, 1, newTask);
        newTasks.sort(taskSorter)
        setTasks(newTasks)
    }
    return editTask
}

export function deleteTaskConstructor(tasks: Task[], setTasks: Dispatch<SetStateAction<Task[]>>) {
    function deleteTask(task: Task) {
        const index = tasks.indexOf(task);
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks)
    }
    return deleteTask
}

export function validateTime(time: string) {
    return /^(0[1-9]|1[0-2]):([0-5][0-9])$/.test(time)
}

export function taskSorter(task1: Task, task2: Task) {
    const Date1 = new Date(task1.date + " " + task1.hour)
    const Date2 = new Date(task2.date + " " + task2.hour)
    return Date1.getTime() - Date2.getTime()
}

export function filterTodayTasks(tasks: Task[]) {
    return tasks.filter((task: Task) => {
        const today = new Date((new Date()).getTime()-14400000);
        return today.toISOString().split('T')[0] == task.date
    })
}

export function filterPastTasks(tasks: Task[]) {
    return tasks.filter((task: Task) => {
        const today = new Date((new Date()).getTime()-14400000);
        const todayWithoutTime = new Date(today.toISOString().split('T')[0]);
        const taskDate = new Date(task.date);
        return taskDate.getTime() < todayWithoutTime.getTime()
    })
}

export function filterFutureTasks(tasks: Task[]) {
    return tasks.filter((task: Task) => {
        const today = new Date((new Date()).getTime()-14400000);
        const todayWithoutTime = new Date(today.toISOString().split('T')[0]);
        const taskDate = new Date(task.date);
        return taskDate.getTime() > todayWithoutTime.getTime()
    })
}

export function filterDoneTasks(tasks: Task[]) {
    return tasks.filter((task: Task) => task.done)
}

export function filterNotDoneTasks(tasks: Task[]) {
    return tasks.filter((task:Task) => !task.done)
}