class LoginDTO {
    constructor({email, password}) {
        this.email = email;
        this.password = password;
    }

    // Gelen JSON'dan DTO oluşturur
    static fromRequest(body) {
        return new LoginDTO({
            email: body.email,
            password: body.password,
        });
    }
}

export default LoginDTO;
