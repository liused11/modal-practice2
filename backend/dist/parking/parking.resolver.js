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
let ParkingResolver = class ParkingResolver {
    parkingService;
    constructor(parkingService) {
        this.parkingService = parkingService;
    }
    createParking(createParkingInput) {
        return this.parkingService.create(createParkingInput);
    }
    findAll() {
        return this.parkingService.findAll();
    }
    findOne(id) {
        return this.parkingService.findOne(id);
    }
    updateParking(updateParkingInput) {
        return this.parkingService.update(updateParkingInput.id, updateParkingInput);
    }
    removeParking(id) {
        return this.parkingService.remove(id);
    }
};
exports.ParkingResolver = ParkingResolver;
__decorate([
    (0, graphql_1.Mutation)(() => parking_entity_1.ParkingLot),
    __param(0, (0, graphql_1.Args)('createParkingInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_parking_input_1.CreateParkingInput]),
    __metadata("design:returntype", void 0)
], ParkingResolver.prototype, "createParking", null);
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
    (0, graphql_1.Mutation)(() => parking_entity_1.ParkingLot),
    __param(0, (0, graphql_1.Args)('updateParkingInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_parking_input_1.UpdateParkingInput]),
    __metadata("design:returntype", void 0)
], ParkingResolver.prototype, "updateParking", null);
__decorate([
    (0, graphql_1.Mutation)(() => parking_entity_1.ParkingLot),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ParkingResolver.prototype, "removeParking", null);
exports.ParkingResolver = ParkingResolver = __decorate([
    (0, graphql_1.Resolver)(() => parking_entity_1.ParkingLot),
    __metadata("design:paramtypes", [parking_service_1.ParkingService])
], ParkingResolver);
//# sourceMappingURL=parking.resolver.js.map