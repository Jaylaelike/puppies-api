import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Logger,
} from '@nestjs/common';
import { PuppyDTO } from './app.dto';
import { AppService } from './app.service';
import { AuthGuard } from './shared/auth.guard';
import { User } from './user/user.decorator';

@Controller('puppies')
export class AppController {
  private logger = new Logger('AppController');
  constructor(private readonly appService: AppService) {}

  private logData(options: any) {
    options.user && this.logger.log('USER ' + JSON.stringify(options.user));
    options.body && this.logger.log('BODY ' + JSON.stringify(options.body));
    options.id && this.logger.log('PUPPY ' + JSON.stringify(options.id));
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  registerPuppy(@User('id') user, @Body() body: PuppyDTO) {
    this.logData({ user, body });
    return this.appService.register(user, body);
  }

  @Get('/all')
  getPuppies() {
    return this.appService.readAll();
  }

  @Get(':id')
  @UseGuards(new AuthGuard())
  getPuppy(@Param('id') id: string) {
    return this.appService.read(id);
  }

  @Put(':id')
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  updatePuppy(
    @Param('id') id: string,
    @User('id') user: string,
    @Body() data: Partial<PuppyDTO>,
  ) {
    return this.appService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  deletePuppy(@Param('id') id: string, @User('id') user: string) {
    return this.appService.delete(id);
  }
}
