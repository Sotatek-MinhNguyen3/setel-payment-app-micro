import { Controller, Get, Inject } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { SERVICE_ORDER, SERVICE_PAYMENT } from '../common/constant';
import { VerificationResponse } from './payment.model';

@Controller()
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    @Inject('PAYMENT_SERVICE') private readonly client: ClientProxy,
  ) {}
  async onApplicationBootstrap() {
    await this.client.connect();
  }

  @EventPattern(SERVICE_PAYMENT)
  async handleIncomingPayment(data) {
    const paymentResult = Math.round(Math.random() * 1);
    if (paymentResult === 0) {
      this.client.emit<any>(SERVICE_ORDER, new VerificationResponse(false, data));
    }else {
      this.client.emit<any>(SERVICE_ORDER, new VerificationResponse(true, data));
    }
  }
}
