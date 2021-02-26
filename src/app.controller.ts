import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { SERVICE_PAYMENT } from './common/constant';

@Controller()
export class AppController {
  constructor() {}
  
  @EventPattern(SERVICE_PAYMENT)
  async handleMessagePrinted(data) {
    console.log(data);
  } 
  
  @Get()
  getHello() {
    return 'Hello World printed';
  }
}
