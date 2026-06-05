import { Body, Controller, Post } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { createMessage } from './message.dto.ts/message.dto';

@Controller('contacts')
export class ContactsController {
    constructor (
        private readonly contactsService: ContactsService
    ) {}

   @Post()
   async create(@Body() dto: createMessage) {
    return this.contactsService.createMassage(dto)
   }
}