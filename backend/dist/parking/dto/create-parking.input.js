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
exports.CreateParkingInput = exports.ParkingRulesInput = exports.LevelInput = exports.SpotInput = void 0;
const graphql_1 = require("@nestjs/graphql");
let SpotInput = class SpotInput {
    spotId;
    status;
    vehicle;
};
exports.SpotInput = SpotInput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], SpotInput.prototype, "spotId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], SpotInput.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], SpotInput.prototype, "vehicle", void 0);
exports.SpotInput = SpotInput = __decorate([
    (0, graphql_1.InputType)()
], SpotInput);
let LevelInput = class LevelInput {
    level;
    spots;
};
exports.LevelInput = LevelInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], LevelInput.prototype, "level", void 0);
__decorate([
    (0, graphql_1.Field)(() => [SpotInput]),
    __metadata("design:type", Array)
], LevelInput.prototype, "spots", void 0);
exports.LevelInput = LevelInput = __decorate([
    (0, graphql_1.InputType)()
], LevelInput);
let ParkingRulesInput = class ParkingRulesInput {
    hasGate;
    maxHours;
    pricePerHour;
};
exports.ParkingRulesInput = ParkingRulesInput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], ParkingRulesInput.prototype, "hasGate", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], ParkingRulesInput.prototype, "maxHours", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], ParkingRulesInput.prototype, "pricePerHour", void 0);
exports.ParkingRulesInput = ParkingRulesInput = __decorate([
    (0, graphql_1.InputType)()
], ParkingRulesInput);
let CreateParkingInput = class CreateParkingInput {
    name;
    location;
    totalSpots;
    availableSpots;
    levels;
    spots;
    rules;
};
exports.CreateParkingInput = CreateParkingInput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateParkingInput.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateParkingInput.prototype, "location", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], CreateParkingInput.prototype, "totalSpots", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], CreateParkingInput.prototype, "availableSpots", void 0);
__decorate([
    (0, graphql_1.Field)(() => [LevelInput], { nullable: true }),
    __metadata("design:type", Array)
], CreateParkingInput.prototype, "levels", void 0);
__decorate([
    (0, graphql_1.Field)(() => [SpotInput], { nullable: true }),
    __metadata("design:type", Array)
], CreateParkingInput.prototype, "spots", void 0);
__decorate([
    (0, graphql_1.Field)(() => ParkingRulesInput, { nullable: true }),
    __metadata("design:type", ParkingRulesInput)
], CreateParkingInput.prototype, "rules", void 0);
exports.CreateParkingInput = CreateParkingInput = __decorate([
    (0, graphql_1.InputType)()
], CreateParkingInput);
//# sourceMappingURL=create-parking.input.js.map