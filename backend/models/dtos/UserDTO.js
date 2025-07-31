class UserDTO {
    constructor({
                    id,
                    fullName,
                    email,
                    phoneNumber,
                    address,
                    job,
                    bio,
                    password,
                    confirmPassword,
                    emailVerified,
                    role // 👈 yeni alan
                }) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.job = job;
        this.bio = bio;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.emailVerified = emailVerified;
        this.role = role;
    }

    static fromPOJOtoDTO(obj) {
        return new UserDTO({
            id: obj._id || obj.id,
            fullName: obj.fullName,
            email: obj.email,
            phoneNumber: obj.phoneNumber,
            address: obj.address,
            job: obj.job,
            bio: obj.bio,
            password: obj.password,
            confirmPassword: obj.confirmPassword,
            emailVerified: obj.emailVerified,
            role: obj.role
        });
    }

    toPOJO() {
        return {
            userID: this.id,
            fullName: this.fullName,
            email: this.email,
            phoneNumber: this.phoneNumber,
            address: this.address,
            job: this.job,
            bio: this.bio,
            password: this.password,
            confirmPassword: this.confirmPassword,
            emailVerified: this.emailVerified,
            role: this.role
        };
    }
}

export default UserDTO;
