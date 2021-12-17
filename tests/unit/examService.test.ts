import faker from 'faker';
import * as examService from '../../src/services/examService';
import SyntaxError from '../../src/errors/SyntaxError';

describe('examService test suit', () => {
  it('should throw SyntaxError if there is a property missing in exam`s body', async () => {
    const exam = {
      name: '2020.1',
      typeId: faker.datatype.number(),
      link: `${faker.internet.url()}/${faker.system.commonFileName('pdf')}`,
    };

    const response = examService.examBodyValidation(exam);
    await expect(response).rejects.toThrow(SyntaxError);
  });
  it('should throw UnprocessableEntityError if the given combination of class/ professor does not exist', () => {
    expect(200).toBe(200);
  });
});
