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

type Status = 'new' | 'pending' | 'answered';
type Difficulty = 1 | 2 | 3 | 4 | 5;

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
  @Column(DataType.ENUM('1', '2', '3', '4', '5'))
  difficulty: Difficulty;
}