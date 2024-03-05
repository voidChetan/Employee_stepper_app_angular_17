import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit{
  designationList: any [] = [];
  roleList: any [] = [];
  stepsList: any [] = [
    { stepName: 'Basic Details',isComplete: false},
    { stepName: 'Skills',isComplete: false},
    { stepName: 'Experience',isComplete: false}
  ];
  activeStep:  any =  this.stepsList[0];

  employeeObj: any = {
    "roleId": 0,
    "empId": 0,
    "empName": "",
    "empEmailId": "",
    "empDesignationId": 0,
    "empContactNo": "",
    "empAltContactNo": "",
    "empPersonalEmailId": "",
    "empExpTotalYear": 0,
    "empExpTotalMonth": 0,
    "empCity": "",
    "empState": "",
    "empPinCode": "",
    "empAddress": "",
    "empPerCity": "",
    "empPerState": "",
    "empPerPinCode": "",
    "empPerAddress": "",
    "password": "",
    erpEmployeeSkills:[],
    ermEmpExperiences:[]
  }
  
  empExpObj : any  = {
    "empExpId": 0,
    "empId": 0,
    "companyName": "string",
    "startDate": "2024-03-05T16:58:07.710Z",
    "endDate": "2024-03-05T16:58:07.710Z",
    "designation": "string",
    "projectsWorkedOn": "string"
  }

  constructor(private http: HttpClient) {

  }
  ngOnInit(): void {
    this.loadDesignations();
    this.loadRoles();
  }

  setActiveStep(activeStep: any) {
    this.activeStep = activeStep;
  }

  addSkills() {
    const skillObj = {
      "empSkillId": 0,
      "empId": 0,
      "skill": "",
      "totalYearExp": 0,
      "lastVersionUsed": ""
    };

    this.employeeObj.erpEmployeeSkills.unshift(skillObj)
  }
  addExp() {
    const expObj = {
      "empExpId": 0,
      "empId": 0,
      "companyName": " ",
      "startDate": "",
      "endDate": "",
      "designation": "",
      "projectsWorkedOn": ""
    };

    this.employeeObj.ermEmpExperiences.unshift(expObj)
  }

  loadDesignations() {
    this.http.get("https://freeapi.gerasim.in/api/EmployeeApp/GetAllDesignation").subscribe((res:any)=>{
      this.designationList = res.data;
    })
  }

  loadRoles() {
    this.http.get("https://freeapi.gerasim.in/api/EmployeeApp/GetAllRoles").subscribe((res:any)=>{
      this.roleList = res.data;
    })
  }

  saveEmployee() {
    debugger;
    this.http.post("https://freeapi.gerasim.in/api/EmployeeApp/CreateNewEmployee", this.employeeObj).subscribe((res:any)=>{
      if(res.result) {
        alert('Employee Created Success')
      } else {
        alert(res.message)
      }
    })
  }
}
