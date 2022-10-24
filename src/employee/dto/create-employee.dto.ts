import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsDate, IsString, IsEmail, IsISO8601} from "class-validator";
import {HomeAddress} from "./home-address.dto";

export class CreateEmployeeDTO {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    phoneNumber: string;

    @IsNotEmpty()
    @ApiProperty()
    homeAddress: HomeAddress;

    @IsNotEmpty()
    @IsISO8601()
    @ApiProperty()
    dateOfEmployment: Date;

    @IsNotEmpty()
    @IsISO8601()
    @ApiProperty()
    dateOfBirth: Date;
}