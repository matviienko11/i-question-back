import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';

import { User } from '../users/user.entity';
import { Question } from '../questions/question.entity';

type Status = 'pending' | 'answered';

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
  
  @Default('pending')
  @Column(DataType.ENUM('pending', 'answered'))
  status: Status;
  
}