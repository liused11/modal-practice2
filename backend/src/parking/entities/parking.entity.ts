import { ObjectType, Field, Int } from '@nestjs/graphql';
@ObjectType()
class Spot {
  @Field()
  spotId: string;

  @Field()
  status: string;

  @Field({ nullable: true})
  vehicle?: string;
}

@ObjectType()
class Level {
  @Field(() => Int)
  level: number;

  @Field(() => [Spot])
  spots: Spot[];
}

@ObjectType()
class ParkingRules {
  @Field()
  hasGate: boolean;

  @Field({nullable: true})
  maxHours?: number;
  
  @Field({nullable: true})
  pricePerHour?: number
}

@ObjectType()
export class ParkingLot {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  location: string;

  @Field(() => Int)
  totalSpots: number;

  @Field(() => Int)
  availableSpots: number;

  // สำหรับที่จอดหลายชั้น
  @Field(() => [Level], { nullable: true })
  levels?: Level[];

  // สำหรับที่จอดภาคพื้น (ไม่มีชั้น)
  @Field(() => [Spot], { nullable: true })
  spots?: Spot[];

  @Field(() => ParkingRules)
  rules: ParkingRules;

}
