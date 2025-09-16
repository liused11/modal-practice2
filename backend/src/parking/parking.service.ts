import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ParkingLot } from './entities/parking.entity'
import { CreateParkingInput } from './dto/create-parking.input';
import { UpdateParkingInput } from './dto/update-parking.input';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class ParkingService implements OnModuleInit, OnModuleDestroy {
  private supabaseClient: SupabaseClient;
  private parkingSubscription: ReturnType<typeof this.supabaseClient.channel> | null = null;
  private parkingChanges$: Subject<ParkingLot> = new Subject();

  constructor() {
    this.supabaseClient = createClient(
      process.env.SUPABASE_URL as string,
      process.env.SUPABASE_KEY as string,
    );
  }

  // ทำให้ GraphQL resolver สามารถ subscribe ได้
  getParkingChanges(): Observable<ParkingLot> {
    return this.parkingChanges$.asObservable();
  }
  async create(createParkingInput: CreateParkingInput): Promise<ParkingLot> {
    const { data, error } = await this.supabaseClient
      .from('parking_lots')
      .insert([
        {
        name: createParkingInput.name,
        location: createParkingInput.location,
        total_spots: createParkingInput.totalSpots,
        available_spots: createParkingInput.availableSpots,
        levels: createParkingInput.levels || null,
        spots: createParkingInput.spots || null,
        rules: createParkingInput.rules,
        },
      ])
      .select()
      .single();

    if (error) throw new Error(error.message);

    return this.mapParking(data);
  }

  // ✅ READ ALL
  async findAll(): Promise<ParkingLot[]> {
    const { data, error } = await this.supabaseClient
      .from('parking_lots')
      .select('*');

    if (error) throw new Error(error.message);

    return data.map(this.mapParking);
  }

  async findOne(id: number): Promise<ParkingLot> {
    const { data, error } = await this.supabaseClient
      .from('parking_lots')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(error.message);

    return this.mapParking(data);
  }

  async update(id: number, updateParkingInput: UpdateParkingInput): Promise<ParkingLot> {
    const { data, error } = await this.supabaseClient
      .from('parking_lots')
      .update({
        name: updateParkingInput.name,
        location: updateParkingInput.location,
        total_spots: updateParkingInput.totalSpots,
        available_spots: updateParkingInput.availableSpots,
        levels: updateParkingInput.levels || null,
        spots: updateParkingInput.spots || null,
        rules: updateParkingInput.rules,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);

    return this.mapParking(data);
  }

  // ✅ DELETE
  async remove(id: number): Promise<ParkingLot> {
    const { data: parking, error: fetchError } = await this.supabaseClient
      .from('parking_lots')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError) throw new Error(fetchError.message);
    if (!parking) throw new Error('Parking not found');

    const { error: deleteError } = await this.supabaseClient
      .from('parking_lots')
      .delete()
      .eq('id', id);

    if (deleteError) throw new Error(deleteError.message);

    return this.mapParking(parking);
  }

  private mapParking(data: any): ParkingLot {
    return {
      id: data.id,
      name: data.name,
      location: data.location,
      totalSpots: data.total_spots,
      availableSpots: data.available_spots,
      levels: data.levels,
      spots: data.spots,
      rules: data.rules,
    };
  }
  onModuleInit() {
    this.parkingSubscription = this.supabaseClient
      .channel('parking_lots_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'parking_lots' },
        (payload) => {
          let data: any;
          if (payload.eventType === 'DELETE') {
            data = payload.old;
          } else {
            data = payload.new;
          }
          if (data) {
            const parking = this.mapParking(data);
            this.parkingChanges$.next(parking);
          }
        }
      )
      .subscribe();
  }

  onModuleDestroy() {
    if (this.parkingSubscription) {
      this.supabaseClient.removeChannel(this.parkingSubscription);
      this.parkingSubscription = null;
    }
  }
}
