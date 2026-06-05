import { Injectable } from '@nestjs/common';
import { Message} from './schema/message.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createMessage } from './message.dto.ts/message.dto';

@Injectable()
export class ContactsService {
    constructor (
        @InjectModel(Message.name) private readonly Message: Model<Message>
    ) {}

    async createMassage(dto: createMessage) {
        return this.Message.create(dto)
    }
}
