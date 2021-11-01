import { Question } from '../modules/questions/question.entity';

export const questionsProviders = [
  {
    provide: 'QUESTIONS_REPOSITORY',
    useValue: Question,
  },
];