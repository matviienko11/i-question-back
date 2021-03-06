import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { User } from '../users/user.entity';
import { Question } from '../questions/question.entity';
import { RATING } from '../../shared/constants/rating.enum';

type Status = 'new' | 'pending' | 'answered';

@Table
export class UserQuestion extends Model {

  @PrimaryKey
  @Column
  id: string;

  @ForeignKey(() => User)
  @Column
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Question)
  @Column
  questionId: string;

  @BelongsTo(() => Question)
  question: Question;

  @Column
  answer: string;

  @Default('new')
  @Column(DataType.ENUM('new', 'pending', 'answered'))
  status: Status;

  @AllowNull
  @Column
  difficulty: RATING;

  @AllowNull
  @Column
  rating: RATING;
}
