import { ParkingService } from './parking.service';
import { ParkingLot } from './entities/parking.entity';
import { CreateParkingInput } from './dto/create-parking.input';
import { UpdateParkingInput } from './dto/update-parking.input';
export declare class ParkingResolver {
    private readonly parkingService;
    constructor(parkingService: ParkingService);
    createParking(createParkingInput: CreateParkingInput): Promise<ParkingLot>;
    findAll(): Promise<ParkingLot[]>;
    findOne(id: number): Promise<ParkingLot>;
    updateParking(updateParkingInput: UpdateParkingInput): Promise<ParkingLot>;
    removeParking(id: number): Promise<ParkingLot>;
}
