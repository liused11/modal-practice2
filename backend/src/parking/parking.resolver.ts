import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ParkingService } from './parking.service';
import { ParkingLot } from './entities/parking.entity';
import { CreateParkingInput } from './dto/create-parking.input';
import { UpdateParkingInput } from './dto/update-parking.input';

@Resolver(() => ParkingLot)
export class ParkingResolver {
  constructor(private readonly parkingService: ParkingService) {}

  @Mutation(() => ParkingLot)
  createParking(@Args('createParkingInput') createParkingInput: CreateParkingInput) {
    return this.parkingService.create(createParkingInput);
  }

  @Query(() => [ParkingLot], { name: 'parkings' })
  findAll() {
    return this.parkingService.findAll();
  }

  @Query(() => ParkingLot, { name: 'parking' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.parkingService.findOne(id);
  }

  @Mutation(() => ParkingLot)
  updateParking(@Args('updateParkingInput') updateParkingInput: UpdateParkingInput) {
    return this.parkingService.update(updateParkingInput.id, updateParkingInput);
  }

  @Mutation(() => ParkingLot)
  removeParking(@Args('id', { type: () => Int }) id: number) {
    return this.parkingService.remove(id);
  }
}
