declare class Spot {
    spotId: string;
    status: string;
    vehicle?: string;
}
declare class Level {
    level: number;
    spots: Spot[];
}
declare class ParkingRules {
    hasGate: boolean;
    maxHours?: number;
    pricePerHour?: number;
}
export declare class ParkingLot {
    id: number;
    name: string;
    location: string;
    totalSpots: number;
    availableSpots: number;
    levels?: Level[];
    spots?: Spot[];
    rules: ParkingRules;
}
export {};
