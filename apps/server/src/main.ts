import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:
      process.env.NODE_ENV === 'development' ? true : process.env.CORS_ORIGIN,
  });

  await app.listen(process.env.PORT ?? 1414);
}

bootstrap();
