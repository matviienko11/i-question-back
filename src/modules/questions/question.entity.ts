import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

@Table
export class Question extends Model {
  @PrimaryKey
  @Column
  id: string;
  
  @Column
  question: string;
  
  @Column
  answer: string;
}