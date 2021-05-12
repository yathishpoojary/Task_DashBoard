import { Component, OnInit } from '@angular/core';
import { TaskService } from '../core/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

    constructor(private taskService: TaskService) {}

    taskItem: any = {};

    titles = [
        {value: "", viewValue: "STATUS"},
        {value: "OPEN", viewValue: "TO DO"},
        {value: "PROGRESS", viewValue: "ON PROGRESS"},
        {value: "COMPLETE", viewValue: "DONE"}
    ]
  
    ngOnInit() {
        this.resetTaskItem();
    }

    resetTaskItem() {
        this.taskItem = {
            title: "",
            description: "",
            status: "",
            dateTime: ""
        }
    }

    addNewTaskItem() {
        this.taskItem.dateTime = new Date();
        this.taskService.addTask(this.taskItem).subscribe(
        resp => {
            let result: any = resp;
            console.log("result => " + result);
        },
        err => {
            console.log("Unable to ADD")
        }
        )
    }

  onStatusChange() {

  }

}
