import { Component } from '@angular/core';

interface Student {
  id: number;
  name: string;
  grade: string;
}

@Component({
  selector: 'app-grade',
  templateUrl: './grading.component.html',
  styleUrls: ['./grading.component.css']
})
export class GradingComponent {
  students: Student[] = [];
  newStudent: Student = {} as Student;
  editedStudent: Student = {} as Student;
  isEditing = false;
  searchKeyword = '';

  constructor() { }

  addStudent(): void {
    this.newStudent.id = this.students.length + 1;
    this.students.push({ ...this.newStudent });
    this.newStudent = {} as Student;
  }

  editStudent(student: Student): void {
    this.isEditing = true;
    this.editedStudent = { ...student };
  }

  saveEditedStudent(): void {
    const index = this.students.findIndex(s => s.id === this.editedStudent.id);
    if (index !== -1) {
      this.students[index] = { ...this.editedStudent };
    }
    this.cancelEdit();
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editedStudent = {} as Student;
  }

  deleteStudent(student: Student): void {
    this.students = this.students.filter(s => s.id !== student.id);
  }

  get filteredStudents(): Student[] {
    return this.students.filter(student =>
      student.name.toLowerCase().includes(this.searchKeyword.toLowerCase())
    );
  }
}
