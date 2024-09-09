import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetModule } from './pet/pet.module';
import { OwnerModule } from './owner/owner.module';

@Module({
  imports: [PetModule, OwnerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
