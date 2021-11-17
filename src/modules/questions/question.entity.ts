import { Table, Column, Model, PrimaryKey, DataType, Default } from 'sequelize-typescript';

type Category = 'history' | 'geography' | 'economics' | 'mathematics' | 'languages' | 'law' | 'medicine' | 'chemistry' | 'other';

@Table
export class Question extends Model {
  @PrimaryKey
  @Column
  id: string;
  
  @Column
  question: string;

  @Column(DataType.FLOAT(1))
  average_difficulty: number;

  @Column(DataType.FLOAT(1))
  @Column
  average_rating: number;
  
  @Default('other')
  @Column(DataType.ENUM('history', 'geography', 'economics', 'mathematics', 'languages', 'law', 'medicine', 'chemistry', 'biology', 'other'))
  category: Category;
}