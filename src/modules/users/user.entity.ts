import { Table, Column, Model, PrimaryKey, DataType, Default } from 'sequelize-typescript';

type Roles = 'USER' | 'MANAGER';

@Table
export class User extends Model {
  @PrimaryKey
  @Column
  id: string;
  
  @Column
  first_name: string;
  
  @Column
  last_name: string;
  
  @Default('USER')
  @Column(DataType.ENUM('USER', 'MANAGER'))
  role: Roles;
  
  @Column
  phone: string;
  
  @Column
  email: string;
}