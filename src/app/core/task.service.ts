
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})



export class TaskService {
  
    baseURL = "http://localhost:3000/";

    constructor(private http: HttpClient) {};
    
    addTask(taskItemObj : any) {
        return this.http.post(this.baseURL + 'api/tasks/addTask' , taskItemObj);
    }

    getAllTask(status : string) {
        return this.http.get(this.baseURL + `api/tasks/getTask/${status}`);
    }

    updateTask(updateObj: any) {
        return this.http.post(this.baseURL + 'api/tasks/updateTask' , updateObj);
    }

    // delete task

    // getAllBill() {
    //     return this.http.get(`api/bills/getBills`);
    // }

    
};