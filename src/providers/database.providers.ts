import { Sequelize } from 'sequelize-typescript';
import { User } from '../modules/users/user.entity';
import { Question } from '../modules/questions/question.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'bogdan',
        password: '123456',
        database: 'i_question',
      });
      sequelize.addModels([User, Question]);
      await sequelize.sync();
      return sequelize;
    },
  },
];