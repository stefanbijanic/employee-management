import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class HomeAddress {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    city: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    zipCode: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    addressLine1: string;

    @IsString()
    @ApiProperty()
    addressLine2: string;

}