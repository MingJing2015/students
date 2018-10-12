import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Student } from '../models/defineClass';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers } from '@angular/http';

const httpOptions = {
    headers: new Headers({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class StudentsService {

    private studentsUrl  = 'https://polar-bayou-68883.herokuapp.com/api/students';   // no image data, so fast
    // private studentsUrl  = 'http://localhost:3000/api/students';   // no image data, so fast

    private studentUrl = 'https://polar-bayou-68883.herokuapp.com/api/student';
    // private studentUrl = 'http://localhost:3000/api/student';

    constructor(private http: Http) {}

    getStudents(): Promise<any | void> {
        return this.http.get(this.studentsUrl)
            .toPromise()
            .then(response => response)
            .catch(this.handleError);
    }

    deleteOneItem(item: Student): Promise<void | any> {

        console.log("delete item +++++++ ");
        console.log(item);

        const url = `${this.studentUrl}/${item.id}`;
        return this.http.delete(url)
            .toPromise()
            .then(response => response)
            .catch(this.handleError);
    }



    addOneItem(item: Student): Promise<void | any> {

        console.log(item);

        const url = `${this.studentUrl}`;
        return this.http.post(url, item, httpOptions)
            .toPromise()
            .then(response => response)
            .catch(this.handleError);
    }


    updataOneItem(item: Student): Promise<void | any> {

        console.log(item);

        const url = `${this.studentUrl}/${item.id}`;
        return this.http.put(url, item, httpOptions)
            .toPromise()
            .then(response => response)
            .catch(this.handleError);
    }






    
    /** 2. set device status  **/
    // setDeviceStatus(data: any): Promise<any> {

    //     // const putUrl = 'https://polar-bayou-68883.herokuapp.com/api/device/' + data.id;
    //     const putUrl = this.devPutUrl + data.id;

    //     const temp = data.status === '1' ? '0' : '1';
    //     console.log(data);
    //     console.log(temp);
    //     data.status = temp;
    //     console.log(data);

    //     return this.http.put(putUrl, data)
    //         .toPromise()
    //         .then(response => response)
    //         .catch(this.handleError);
    // }

    private handleError(error: any) {
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
    }
}
