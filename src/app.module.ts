import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'; 
import {EmployeeModule} from './employee/empolyee.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/employee-management'),
    EmployeeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
