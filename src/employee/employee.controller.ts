import {Body, Controller, Delete, Get, Param, Post, Put, Query} from "@nestjs/common";
import {ApiBody, ApiTags, ApiParam} from "@nestjs/swagger";
import ErrorResponse from "src/common/errors/error-response.interface";
import {CreateEmployeeDTO, UpdateEmployeeDTO} from "./dto";
import {EmployeeService} from "./employee.service";
import {Employee} from "./schemas/employee.schema";

@ApiTags('employees')
@Controller('employees')
export class EmployeeController {
    constructor(private employeeService: EmployeeService) {}

    @Post()
    @ApiBody({ type: [CreateEmployeeDTO] })
    async createEmployee(@Body() body: CreateEmployeeDTO): Promise<Employee | ErrorResponse> {
        return await this.employeeService.createEmployee(body);
    }

    @Get()
    async getAllEmployees(@Query() paginationQuery): Promise<Employee[] | ErrorResponse> {
        return await this.employeeService.getAllEmployees(paginationQuery);
    }

    @Get('employee/:employeeId')
    @ApiParam({
        name: 'employeeId',
        required: true,
        description: 'Should be UUID that exists in the database',
        type: String,
    })
    async getEmployeeById(@Param() params): Promise<Employee | ErrorResponse> {
        const employeeId = params.employeeId;
        
        return await this.employeeService.getEmployeeById(employeeId);
    }

    @Put('employee/:employeeId')
    @ApiParam({
        name: 'employeeId',
        required: true,
        description: 'Should be UUID that exists in the database',
        type: String,
    })
    @ApiBody({ type: UpdateEmployeeDTO })
    async updateEmployeeById(@Param() params, @Body() body: UpdateEmployeeDTO): Promise<Employee | ErrorResponse> {
        const employeeId = params.employeeId;

        return await this.employeeService.updateEmployeeById(employeeId, body);
    }

    @Delete('employee/:employeeId')
    @ApiParam({
        name: 'employeeId',
        required: true,
        description: 'Should be UUID that exists in the database',
        type: String,
    })
    async deactivateEmployeeById(@Param() params): Promise<Employee | ErrorResponse> {
        return await this.employeeService.deactivateEmployeeById(params.employeeId);
    }

    @Get('deactivated')
    async getAllDeactivatedEmployees(): Promise<Employee[] | ErrorResponse> {
        return await this.employeeService.getAllDeactivatedEmployees();
    }

}