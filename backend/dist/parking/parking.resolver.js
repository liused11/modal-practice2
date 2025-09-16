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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkingResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const parking_service_1 = require("./parking.service");
const parking_entity_1 = require("./entities/parking.entity");
const create_parking_input_1 = require("./dto/create-parking.input");
const update_parking_input_1 = require("./dto/update-parking.input");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const pubSub = new graphql_subscriptions_1.PubSub();
let ParkingResolver = class ParkingResolver {
    parkingService;
    constructor(parkingService) {
        this.parkingService = parkingService;
    }
    async createParking(createParkingInput) {
        const parking = await this.parkingService.create(createParkingInput);
        return parking;
    }
    async updateParking(updateParkingInput) {
        const parking = await this.parkingService.update(updateParkingInput.id, updateParkingInput);
        await pubSub.publish('parkingChanged', { parkingChanged: parking });
        return parking;
    }
    async removeParking(id) {
        const parking = await this.parkingService.remove(id);
        return parking;
    }
    findAll() {
        return this.parkingService.findAll();
    }
    findOne(id) {
        return this.parkingService.findOne(id);
    }
    parkingChanged() {
        return pubSub.asyncIterator('parkingChanged');
    }
};
exports.ParkingResolver = ParkingResolver;
__decorate([
    (0, graphql_1.Mutation)(() => parking_entity_1.ParkingLot),
    __param(0, (0, graphql_1.Args)('createParkingInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_parking_input_1.CreateParkingInput]),
    __metadata("design:returntype", Promise)
], ParkingResolver.prototype, "createParking", null);
__decorate([
    (0, graphql_1.Mutation)(() => parking_entity_1.ParkingLot),
    __param(0, (0, graphql_1.Args)('updateParkingInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_parking_input_1.UpdateParkingInput]),
    __metadata("design:returntype", Promise)
], ParkingResolver.prototype, "updateParking", null);
__decorate([
    (0, graphql_1.Mutation)(() => parking_entity_1.ParkingLot),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ParkingResolver.prototype, "removeParking", null);
__decorate([
    (0, graphql_1.Query)(() => [parking_entity_1.ParkingLot], { name: 'parkings' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ParkingResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => parking_entity_1.ParkingLot, { name: 'parking' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ParkingResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Subscription)(() => parking_entity_1.ParkingLot, {
        resolve: (payload) => payload.parkingChanged,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ParkingResolver.prototype, "parkingChanged", null);
exports.ParkingResolver = ParkingResolver = __decorate([
    (0, graphql_1.Resolver)(() => parking_entity_1.ParkingLot),
    __metadata("design:paramtypes", [parking_service_1.ParkingService])
], ParkingResolver);
//# sourceMappingURL=parking.resolver.js.map