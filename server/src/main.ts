import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Setup docs generation
  const swaggerOptions = new DocumentBuilder()
    .setTitle('LRT Tiesiogiai')
    .setDescription('LRT Tiesiogiai API')
    .setVersion('1.0')
    .addTag('lrt')
    .setBasePath('api')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3001);
}
bootstrap();
