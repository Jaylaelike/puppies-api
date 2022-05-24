import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const port = process.env.PORT || 7890;
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
  });
  // app.setGlobalPrefix("api/v1");
  const options = new DocumentBuilder()
    .setTitle('Puppies Api')
    .setDescription('The Puppies Api')
    .setVersion('1.0')
    .addTag('Puppies')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(port);
}
bootstrap();
