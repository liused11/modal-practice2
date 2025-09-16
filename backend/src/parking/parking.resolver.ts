import { Resolver, Query, Mutation, Args, Int, Subscription } from '@nestjs/graphql';
import { ParkingService } from './parking.service';
import { ParkingLot } from './entities/parking.entity';
import { CreateParkingInput } from './dto/create-parking.input';
import { UpdateParkingInput } from './dto/update-parking.input';
import { PubSub } from 'graphql-subscriptions';
import { Observable } from 'rxjs';

type PubSubEvents = {
  [event: string]: any; // ✅ ทำให้ index signature ถูกต้อง
};

const pubSub = new PubSub();

@Resolver(() => ParkingLot)
export class ParkingResolver {
  constructor(private readonly parkingService: ParkingService) {
  }

  @Mutation(() => ParkingLot)
  async createParking(@Args('createParkingInput') createParkingInput: CreateParkingInput) {
    const parking = await this.parkingService.create(createParkingInput);
    //await pubSub.publish('parkingChanged', { parkingChanged: parking }); // ✅ instance
    return parking;
  }

  @Mutation(() => ParkingLot)
  async updateParking(@Args('updateParkingInput') updateParkingInput: UpdateParkingInput) {
    const parking = await this.parkingService.update(updateParkingInput.id, updateParkingInput);
    await pubSub.publish('parkingChanged', { parkingChanged: parking }); // ✅ instance
    return parking;
  }

  @Mutation(() => ParkingLot)
  async removeParking(@Args('id') id: number) {
    const parking = await this.parkingService.remove(id);
    //await pubSub.publish('parkingChanged', { parkingChanged: parking }); // ✅ instance
    return parking;
  }

  @Query(() => [ParkingLot], { name: 'parkings' })
  findAll() {
    return this.parkingService.findAll();
  }

  @Query(() => ParkingLot, { name: 'parking' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.parkingService.findOne(id);
  }

  // ✅ Subscription สำหรับ client
  @Subscription(() => ParkingLot, {
  resolve: (payload) => payload.parkingChanged,
  })
  parkingChanged() {
    return pubSub.asyncIterator('parkingChanged');
  }



}
