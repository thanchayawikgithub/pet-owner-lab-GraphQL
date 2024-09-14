import { Injectable } from '@nestjs/common';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';
import { Pet } from './entities/pet.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from 'src/owner/entities/owner.entity';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet) private petRepo: Repository<Pet>,
    @InjectRepository(Owner) private ownerRepo: Repository<Owner>,
  ) {}
  async create(createPetInput: CreatePetInput) {
    const { ownerId, ...data } = createPetInput;
    const pet = this.petRepo.create(data);

    const owner = await this.ownerRepo.findOne({ where: { id: ownerId } });
    pet.owner = owner;
    return this.petRepo.save(pet);
  }

  findAll() {
    return this.petRepo.find({ relations: { owner: true } });
  }

  findOne(id: number) {
    return this.petRepo.findOne({ where: { id }, relations: { owner: true } });
  }

  async update(id: number, updatePetInput: UpdatePetInput) {
    await this.petRepo.update(id, updatePetInput);
    return this.petRepo.findOne({ where: { id } });
  }

  remove(id: number) {
    return this.petRepo.delete(id);
  }
}
