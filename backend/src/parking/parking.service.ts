import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ParkingLot } from './entities/parking.entity'
import { CreateParkingInput } from './dto/create-parking.input';
import { UpdateParkingInput } from './dto/update-parking.input';

@Injectable()
export class ParkingService {
  private supabaseClient: SupabaseClient;

  constructor() {
    this.supabaseClient = createClient(
      process.env.SUPABASE_URL as string,
      process.env.SUPABASE_KEY as string,
    );
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

  // ✅ READ ALL
  async findAll(): Promise<ParkingLot[]> {
    const { data, error } = await this.supabaseClient
      .from('parking_lots')
      .select('*');

    if (error) throw new Error(error.message);

    return data.map((lot: any) => ({
      id: lot.id,
      name: lot.name,
      location: lot.location,
      totalSpots: lot.total_spots,
      availableSpots: lot.available_spots,
      levels: lot.levels,
      spots: lot.spots,
      rules: lot.rules,
    }));
  }

  async findOne(id: number): Promise<ParkingLot> {
    const { data, error } = await this.supabaseClient
      .from('parking_lots')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(error.message);

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

    return parking as ParkingLot;
  }
}
