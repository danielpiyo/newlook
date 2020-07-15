export class Login {
    username: string
    password: string
}

export class LoginResponse {
    user: {}
    token: string
}

export class AdminLogin {
    email: string
    password: string
}

export class AdminLoginResponse {
    user: {}
    token: string
}