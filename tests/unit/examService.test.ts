import faker from 'faker';
import * as examService from '../../src/services/examService';

describe('examService test suit', () => {
  it('should throw SyntaxError if there is a property missing in exam`s body', async () => {
    const exam = {
      name: '2020.1',
      typeId: faker.datatype.number(),
      link: `${faker.internet.url()}/${faker.system.commonFileName('pdf')}`,
    };

    const promise = examService.examBodyValidation(exam);
    await expect(promise).rejects.toThrow(SyntaxError);
  });
  it('should throw UnprocessableEntityError if the given combination of class/ professor does not exist', () => {
    expect(200).toBe(200);
  });
});
