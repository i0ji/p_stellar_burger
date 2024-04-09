export default function checkEmail(email: string) {
    let regEmail = /(\S+)@(\S+)(\.)(\S+)/;
    if (!regEmail.test(email)) {
        return true;
    }
}

// let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;