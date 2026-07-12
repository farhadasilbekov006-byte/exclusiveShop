import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CartModule } from './cart/cart.module';
import { CheckoutModule } from './checkout/checkout.module';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    ProductModule,
    UserModule,
    AuthModule,
    CartModule,
    CheckoutModule,
    ContactsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
