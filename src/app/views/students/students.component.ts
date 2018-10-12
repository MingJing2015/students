import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { Student } from '../../models/defineClass';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students: Array<Student>;

  subTitle: string;

  editItem: Student;
  adminType;
  first_name_order = true;
  last_name_order = false;
  dateOfCreated_order = false;

  submitted = false;

  constructor(
    private studentsService: StudentsService
  ) { }


  ngOnInit() {

    this.studentsService.getStudents()
      .then((result: any) => {
        const answer = JSON.parse(result._body);
        //console.log(answer);
        if (answer.code === 0) {
          //console.log('Error request: ' + answer.data);
          return;
        }
        this.students = answer.data;
        //console.log(this.students);

      });
  }


  // delete
  private editOne(item: Student): void {

    this.editItem = item;

    this.subTitle = "Edit Student";
    this.adminType = 3;

    //console.log("Edit a new one Student");
  }

  private deleteOne(item: Student): void {
    this.studentsService
      .deleteOneItem(item)
      .then(() => {
        this.students = this.students.filter(h => h !== item);
      });
  }

  private addOne(): void {

    this.editItem = new Student(1, '', '', new Date());

    this.subTitle = "Add Student";
    this.adminType = 1;

    //console.log("Add a new Student");
  }

  private onSubmit() {

    //console.log(this.editItem);

    if (this.adminType === 3) {

      this.studentsService.updataOneItem(this.editItem);
    } else if (this.adminType === 1) {

      this.studentsService.addOneItem(this.editItem);
      this.students.push(this.editItem);
    }

    this.students = this.students.sort( this.compare("first_name", this.first_name_order) );
    this.submitted = true;
    this.editItem = null;
  }

  compare(property, type) {

    if (type) {
      return function (obj1, obj2) {
        const value1 = obj1[property];
        const value2 = obj2[property];
        return value1 > value2 ? -1 : 1;   // up
      };
    } else {
      return function (obj1, obj2) {
        const value1 = obj1[property];
        const value2 = obj2[property];
        return value2 > value1 ? -1 : 1;  // down
      };
    }
  }

  sortBy(type) {

    // //console.log("ordering ... ");

    switch (type) {
      case 'first_name':
        this.first_name_order = !this.first_name_order;
        this.students = this.students.sort(this.compare(type, this.first_name_order));
        break;

      case 'last_name':
        this.last_name_order = !this.last_name_order;
        this.students = this.students.sort(this.compare(type, this.last_name_order));
        break;

      case 'dateOfCreated':
        this.dateOfCreated_order = !this.dateOfCreated_order;
        this.students = this.students.sort(this.compare(type, this.dateOfCreated_order));
        break;
    }
  }
}
