"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkingService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
let ParkingService = class ParkingService {
    supabaseClient;
    constructor() {
        this.supabaseClient = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
    }
    async create(createParkingInput) {
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
        if (error)
            throw new Error(error.message);
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
    async findAll() {
        const { data, error } = await this.supabaseClient
            .from('parking_lots')
            .select('*');
        if (error)
            throw new Error(error.message);
        return data.map((lot) => ({
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
    async findOne(id) {
        const { data, error } = await this.supabaseClient
            .from('parking_lots')
            .select('*')
            .eq('id', id)
            .single();
        if (error)
            throw new Error(error.message);
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
    async update(id, updateParkingInput) {
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
        if (error)
            throw new Error(error.message);
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
    async remove(id) {
        const { data: parking, error: fetchError } = await this.supabaseClient
            .from('parking_lots')
            .select('*')
            .eq('id', id)
            .single();
        if (fetchError)
            throw new Error(fetchError.message);
        if (!parking)
            throw new Error('Parking not found');
        const { error: deleteError } = await this.supabaseClient
            .from('parking_lots')
            .delete()
            .eq('id', id);
        if (deleteError)
            throw new Error(deleteError.message);
        return parking;
    }
};
exports.ParkingService = ParkingService;
exports.ParkingService = ParkingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ParkingService);
//# sourceMappingURL=parking.service.js.map