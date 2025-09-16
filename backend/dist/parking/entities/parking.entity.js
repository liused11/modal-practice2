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
exports.ParkingLot = void 0;
const graphql_1 = require("@nestjs/graphql");
let Spot = class Spot {
    spotId;
    status;
    vehicle;
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Spot.prototype, "spotId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Spot.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Spot.prototype, "vehicle", void 0);
Spot = __decorate([
    (0, graphql_1.ObjectType)()
], Spot);
let Level = class Level {
    level;
    spots;
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Level.prototype, "level", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Spot]),
    __metadata("design:type", Array)
], Level.prototype, "spots", void 0);
Level = __decorate([
    (0, graphql_1.ObjectType)()
], Level);
let ParkingRules = class ParkingRules {
    hasGate;
    maxHours;
    pricePerHour;
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], ParkingRules.prototype, "hasGate", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], ParkingRules.prototype, "maxHours", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], ParkingRules.prototype, "pricePerHour", void 0);
ParkingRules = __decorate([
    (0, graphql_1.ObjectType)()
], ParkingRules);
let ParkingLot = class ParkingLot {
    id;
    name;
    location;
    totalSpots;
    availableSpots;
    levels;
    spots;
    rules;
};
exports.ParkingLot = ParkingLot;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ParkingLot.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ParkingLot.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ParkingLot.prototype, "location", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ParkingLot.prototype, "totalSpots", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ParkingLot.prototype, "availableSpots", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Level], { nullable: true }),
    __metadata("design:type", Array)
], ParkingLot.prototype, "levels", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Spot], { nullable: true }),
    __metadata("design:type", Array)
], ParkingLot.prototype, "spots", void 0);
__decorate([
    (0, graphql_1.Field)(() => ParkingRules),
    __metadata("design:type", ParkingRules)
], ParkingLot.prototype, "rules", void 0);
exports.ParkingLot = ParkingLot = __decorate([
    (0, graphql_1.ObjectType)()
], ParkingLot);
//# sourceMappingURL=parking.entity.js.map