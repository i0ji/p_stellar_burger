import checkEmail from 'utils/checkEmail.ts';

test('Проверка функции валидации почты', () => {
    expect(checkEmail('test@gmail.com')).toBe(false);
})