import { CommandFactory } from 'nest-commander';
import { AppModule } from './app.module';

async function bootstrap() {
  await CommandFactory.run(AppModule, {
    errorHandler: (err) => {
      console.error(err);
      process.exit(1); // this could also be a 0 depending on how you want to handle the exit code
    },
  });
}

bootstrap();
