export default function checkEmail(email: string) {
    const regEmail = /(\S+)@(\S+)(\.)(\S+)/;
    return !regEmail.test(email);
}