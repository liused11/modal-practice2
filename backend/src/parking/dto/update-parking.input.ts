import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateParkingInput } from './create-parking.input';

@InputType()
export class UpdateParkingInput extends PartialType(CreateParkingInput) {
  @Field(() => Int)
  id: number;
}
