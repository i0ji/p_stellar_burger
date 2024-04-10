import checkEmail from 'utils/checkEmail';

test('Проверка функции валидации почты', () => {
    expect(checkEmail('test@gmail.com')).toBe(false);
})