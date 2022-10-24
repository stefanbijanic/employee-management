import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Employee, EmployeeDocument} from "./schemas/employee.schema";
import {v4 as uuidv4} from "uuid";
import {CreateEmployeeDTO, UpdateEmployeeDTO} from "./dto";
import {ERROR_CREATE_NEW_EMPLOYEE, ERROR_EMAIL_ALREADY_EXSISTS, ERROR_GET_ALL_EMPLOYEES, ERROR_WRONG_EMPLOYEE_ID} from "src/common/errors/error-responses";
import ErrorResponseInterface from "src/common/errors/error-response.interface";

@Injectable()
export class EmployeeService {
    constructor(@InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>) {}

    async createEmployee(employeeDTO: CreateEmployeeDTO): Promise<Employee | ErrorResponseInterface> {
        try {
            const employeeEmail = await this.employeeModel.findOne({email: employeeDTO.email});
            
            if (employeeEmail) {
                return ERROR_EMAIL_ALREADY_EXSISTS;
            }

            const employee = new this.employeeModel({
                employeeId: uuidv4(),
                name: employeeDTO.name,
                email: employeeDTO.email,
                phoneNumber: employeeDTO.phoneNumber,
                homeAddress: {
                    city: employeeDTO.homeAddress.city,
                    zipCode: employeeDTO.homeAddress.zipCode,
                    addressLine1: employeeDTO.homeAddress.addressLine1,
                    addressLine2: employeeDTO.homeAddress.addressLine2,
                },
                dateOfEmployment: employeeDTO.dateOfEmployment,
                dateOfBirth: employeeDTO.dateOfBirth,
                isActive: true,
            });
            return employee.save();   
        } catch (error) {
            return ERROR_CREATE_NEW_EMPLOYEE;
        }
    }

    async getAllEmployees(paginationQuery): Promise<Employee[] | ErrorResponseInterface> {
        try {
            const employees = await this.employeeModel.find({isActive: true});

            if(!employees) throw new Error
        
            if (paginationQuery.page || paginationQuery?.limit) {
                const page = paginationQuery?.page;
                const limit = paginationQuery?.limit;
                const startIndex = (page - 1) * limit;
                const endIndex = page * limit;

                const paginatedEmployees: Employee[] = employees.slice(startIndex, endIndex);

                return paginatedEmployees;
            }
            
            return employees;
        } catch (error) {
            return ERROR_GET_ALL_EMPLOYEES;
        }
    }

    async getEmployeeById(employeeId: string): Promise<Employee | ErrorResponseInterface> {
        try {
            const employee = await this.employeeModel.findOne({employeeId});
            if(!employee) throw new Error;

            return employee
        } catch (error) {
            return  ERROR_WRONG_EMPLOYEE_ID;
        }
    }

    async updateEmployeeById(employeeId: string, data: UpdateEmployeeDTO): Promise<Employee | ErrorResponseInterface> {
        try {
            const employee = await this.employeeModel.findOneAndUpdate({employeeId}, data, {new: true})
            
            if(!employee) throw new Error;

            return employee;
        } catch (error) {
            return ERROR_WRONG_EMPLOYEE_ID;
        }
    }

    async deactivateEmployeeById(employeeId: string): Promise<Employee | ErrorResponseInterface> {
        try {
            const employee = await this.employeeModel.findOneAndUpdate({employeeId}, {isActive: false}, {new: true});
            
            if(!employee) throw new Error;

            return employee;
        } catch (error) {
            return ERROR_WRONG_EMPLOYEE_ID;
        }
    }

    async getAllDeactivatedEmployees(): Promise<Employee[] | ErrorResponseInterface> {
        try {
            const employees = await this.employeeModel.find({isActive: false});

            if (!employees) throw Error;

            return employees;
        } catch (error) {
            return ERROR_GET_ALL_EMPLOYEES;
        }
    }
}