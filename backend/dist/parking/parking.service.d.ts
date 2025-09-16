import { ParkingLot } from './entities/parking.entity';
import { CreateParkingInput } from './dto/create-parking.input';
import { UpdateParkingInput } from './dto/update-parking.input';
export declare class ParkingService {
    private supabaseClient;
    constructor();
    create(createParkingInput: CreateParkingInput): Promise<ParkingLot>;
    findAll(): Promise<ParkingLot[]>;
    findOne(id: number): Promise<ParkingLot>;
    update(id: number, updateParkingInput: UpdateParkingInput): Promise<ParkingLot>;
    remove(id: number): Promise<ParkingLot>;
}
