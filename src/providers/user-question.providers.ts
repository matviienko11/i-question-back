import { UserQuestion } from '../modules/user-question/user-question.entity';

export const userQuestionProviders = [
  {
    provide: 'USERS_QUESTIONS_REPOSITORY',
    useValue: UserQuestion,
  },
]

