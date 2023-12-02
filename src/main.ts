import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  process.on('uncaughtException', (error) => {
    console.log("catching error!")
    console.log(error);
  });
  await app.listen(3000);
}
bootstrap();
