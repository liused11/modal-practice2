import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class SpotInput {
  @Field()
  spotId: string;

  @Field()
  status: string;

  @Field({ nullable: true })
  vehicle?: string;
}

@InputType()
export class LevelInput {
  @Field(() => Int)
  level: number;

  @Field(() => [SpotInput])
  spots: SpotInput[];
}

@InputType()
export class ParkingRulesInput {
  @Field()
  hasGate: boolean;

  @Field({ nullable: true })
  maxHours?: number;

  @Field({ nullable: true })
  pricePerHour?: number;
}

@InputType()
export class CreateParkingInput {
  @Field()
  name: string;

  @Field()
  location: string;

  @Field(() => Int)
  totalSpots: number;

  @Field(() => Int)
  availableSpots: number;

  @Field(() => [LevelInput], { nullable: true })
  levels?: LevelInput[];

  @Field(() => [SpotInput], { nullable: true })
  spots: SpotInput[];

  @Field(() => ParkingRulesInput, { nullable: true })
  rules?: ParkingRulesInput;
}
