import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import {HomeAddress} from "../dto";

export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee {
    @Prop()
    employeeId: string;

    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    phoneNumber: string;

    @Prop()
    homeAddress: HomeAddress;

    
    @Prop()
    dateOfEmployment: Date;

    @Prop()
    dateOfBirth: Date;

    @Prop()
    isActive: boolean;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);