import { Body, Controller, Post } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  register(@Body() data: UserDTO) {
    return this.userService.register(data);
  }

  @Post('login')
  login(@Body() data: UserDTO) {
    return this.userService.login(data);
  }
}
