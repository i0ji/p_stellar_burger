import checkEmail from 'utils/checkEmail';

describe('Email validation test', () => {
    it('should be success', () => {
        expect(checkEmail('test@gmail.com')).toBe(false);
    })

    it('should be false', () => {
        expect(checkEmail('ddda@.com')).toBe(true);
    })
})