import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ParkingLot } from './entities/parking.entity';
import { CreateParkingInput } from './dto/create-parking.input';
import { UpdateParkingInput } from './dto/update-parking.input';
import { Observable } from 'rxjs';
export declare class ParkingService implements OnModuleInit, OnModuleDestroy {
    private supabaseClient;
    private parkingSubscription;
    private parkingChanges$;
    constructor();
    getParkingChanges(): Observable<ParkingLot>;
    create(createParkingInput: CreateParkingInput): Promise<ParkingLot>;
    findAll(): Promise<ParkingLot[]>;
    findOne(id: number): Promise<ParkingLot>;
    update(id: number, updateParkingInput: UpdateParkingInput): Promise<ParkingLot>;
    remove(id: number): Promise<ParkingLot>;
    private mapParking;
    onModuleInit(): void;
    onModuleDestroy(): void;
}
