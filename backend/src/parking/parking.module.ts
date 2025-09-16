import { Module } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { ParkingResolver } from './parking.resolver';

@Module({
  providers: [ParkingResolver, ParkingService],
})
export class ParkingModule {}
