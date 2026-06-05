import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './product.controller';

describe('UsersController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    controller = module.get<UserController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
