import { UserQuestion } from '../modules/answers/answer.entity';

export const answersProviders = [
  {
    provide: 'ANSWERS_REPOSITORY',
    useValue: UserQuestion,
  },
]

