import { User } from './../models/user.entyty';
import { UserRepository } from '../repository/user.repository';
import { hash, verify } from 'argon2';
import { createTestAccount, createTransport, getTestMessageUrl } from 'nodemailer';
import { randomBytes } from 'crypto';
import { TokenService } from './token.service';
import { userService } from './user.service';
import { Token } from './../models/token.entyty';
import { sign } from 'jsonwebtoken';

export class AuthService {
	//private tokenService: TokenService;
	private repository: UserRepository;
	//private userService: userService;
	constructor() {
		this.repository = new UserRepository();
		//this.tokenService = new TokenService();
		//this.userService = new userService();
	}

	// Crypte le password
	async signup(user: User) {
		user.password = await hash(user.password); // argon2
		delete user.role;
		user = await this.repository.create(user); // Initialisation d'un objet user

		user = await this.repository.save(user);
	}
}
