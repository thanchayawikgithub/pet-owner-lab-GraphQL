import { Injectable } from '@nestjs/common';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OwnerService {
  constructor(@InjectRepository(Owner) private ownerRepo: Repository<Owner>) {}

  create(createOwnerInput: CreateOwnerInput) {
    const owner = this.ownerRepo.create(createOwnerInput);
    return this.ownerRepo.save(owner);
  }

  findAll() {
    return this.ownerRepo.find();
  }

  findOne(id: number) {
    return this.ownerRepo.findOne({ where: { id } });
  }

  async update(id: number, updateOwnerInput: UpdateOwnerInput) {
    await this.ownerRepo.update(id, updateOwnerInput);
    return this.ownerRepo.findOne({ where: { id } });
  }

  remove(id: number) {
    return this.ownerRepo.delete(id);
  }
}
