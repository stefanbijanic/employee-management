import {IsNotEmpty, IsDate, IsString, IsISO8601} from "class-validator";
import {HomeAddress} from "./home-address.dto";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateEmployeeDTO {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string;

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