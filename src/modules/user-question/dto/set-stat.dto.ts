import { IsEnum, IsOptional } from 'class-validator';
import { RATING } from '../../../shared/constants/rating.enum';

export class SetStatDto {

  @IsEnum(RATING)
  @IsOptional()
  difficulty: RATING;

  @IsEnum(RATING)
  @IsOptional()
  rating: RATING;
}