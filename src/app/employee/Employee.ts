export class EmployeeData {

    public constructor(init?: Partial<EmployeeData>) {
        Object.assign(this, init);
    }

    public status: string;
    public data: Array<Employee>;
    public message: string;
}

export class Employee {
    public id: number;
    public employee_name: string;
    public employee_salary: number;
    public employee_age: number;
    public profile_image: string;
}