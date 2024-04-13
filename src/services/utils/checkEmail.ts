export default function checkEmail(email: string) {
    const regEmail = /(\S+)@(\S+)(\.)(\S+)/;
    if (!regEmail.test(email)) {
        return true;
    }
    else return false;
}