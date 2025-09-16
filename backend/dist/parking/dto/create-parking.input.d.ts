export declare class SpotInput {
    spotId: string;
    status: string;
    vehicle?: string;
}
export declare class LevelInput {
    level: number;
    spots: SpotInput[];
}
export declare class ParkingRulesInput {
    hasGate: boolean;
    maxHours?: number;
    pricePerHour?: number;
}
export declare class CreateParkingInput {
    name: string;
    location: string;
    totalSpots: number;
    availableSpots: number;
    levels?: LevelInput[];
    spots: SpotInput[];
    rules?: ParkingRulesInput;
}
