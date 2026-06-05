import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schema/message.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {name: Message.name, schema: MessageSchema}
  ]) ],
  providers: [ContactsService],
  controllers: [ContactsController]
})
export class ContactsModule {}
