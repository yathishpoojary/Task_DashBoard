import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService} from '../core/task.service';
import { Task } from '../model/model';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})

export class TaskListComponent implements OnInit {

    openTaskList : Array<Task> = [];
    progressTaskList : Array<Task> = [];
    completedTaskList : Array<Task> = [];
    listtstst = "";

    constructor(private router: Router, private taskService: TaskService){}

    ngOnInit(): void {
        this.getAllTaskItem();
    }

    openCreateTask(){
        this.router.navigate(['../create-task']);
    }

    getAllTaskItem() { 
        this.taskService.getAllTask("OPEN").subscribe(
            resp => {
                let result: any = resp;
                if(result){
                    this.openTaskList = result.data;
                }
            },
            err => {
                console.log("Unable to Get")
            }
        )
        this.taskService.getAllTask("PROGRESS").subscribe(
            resp => {
                let result: any = resp;
                if(result){
                    this.progressTaskList = result.data;
                }
            },
            err => {
                console.log("Unable to Get")
            }
        )
        this.taskService.getAllTask("COMPLETE").subscribe(
            resp => {
                let result: any = resp;
                if(result){
                    this.completedTaskList = result.data;
                }
            },
            err => {
                console.log("Unable to Get")
            }
        )
    }

    drop(event: CdkDragDrop<Task[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            let dragItemID = event.item.data.ID;
            if(event.container.id === "cdk-drop-list-0") {
                this.updateTaskListData(dragItemID, "OPEN");
            } 
            if(event.container.id === "cdk-drop-list-1") {
                this.updateTaskListData(dragItemID, "PROGRESS");
            }
            if(event.container.id === "cdk-drop-list-2") {
                this.updateTaskListData(dragItemID, "COMPLETE");
            }
            transferArrayItem(event.previousContainer.data,
                            event.container.data,
                            event.previousIndex,
                            event.currentIndex);
        }
    }

    updateTaskListData(ID:number, status:string) {
        let taskObj = {
            ID: ID,
            status: status
        }
        this.taskService.updateTask(taskObj).subscribe(
            resp => {
                let result: any = resp;
                if(result && result.success === true) {
                    console.log("Task List is Updated");
                }
            },
            err => {
                console.log("Unable to Update")
            }
        )
    }
}
