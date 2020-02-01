import { User } from './../models/user.entyty';
import { UserRepository } from '../repository/user.repository';
import { hash, verify } from 'argon2';
import { createTestAccount, createTransport, getTestMessageUrl } from 'nodemailer';
import { randomBytes } from 'crypto';
import { TokenService } from './token.service';
import { userService } from './user.service';
import { Token } from './../models/token.entyty';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import { environnment } from './../environnements/environment';


export class AuthService {
	private tokenService: TokenService;
	private repository: UserRepository;
	private userService: userService;
	constructor() {
	  this.repository = getCustomRepository(UserRepository);
	  this.tokenService = new TokenService();
	  this.userService = new userService();
	}

	// Crypte le password lors de la création d'un user
	async signup(user: User) {
		user.password = await hash(user.password); // argon2 hash du password
		delete user.role;
		user = this.repository.create(user); // Initialisation d'un objet user
		user = await this.repository.save(user);

		const tokenString = randomBytes(20).toString('hex')

		await this.nodemailer(tokenString, user);


		const token = new Token();
		token.user = user;
		token.value = tokenString;
		// token.expiration = new Date(getTime() + 1000 * 60 * 60 * 24 * 2);
	
		this.tokenService.create(token);
	}


	//Authentification
	async signin(email: string, password: string) {
		const error = new Error('Invalid credentials');
		const user = await this.repository.findOne({ where: { email } });

		const lblError = 'Invalide credentials'
	
		// Vérification de l'existence d'un user
		if (!user?.isActive) {
		  throw new Error('NOT_ACTIVE');  
		}
	
		if (!user) { // Si pas user
		  throw new Error(lblError);
		}
	
		const isPasswordValid = await verify(user.password, password);// Verification en comparant le password du user avec celui obtenu en entrée
	
		if (!isPasswordValid) { // Si invalide je throw une error 
		  throw new Error(lblError);
		}
	
		const payload = { id: user.id, email: user.email, role: user.role };
	
		const secret1 = process.env.SECRET; // Variable environnement
		if (!secret1) {// S'il n'y a pas la variable d'environnement
		  throw new Error('Servor not correctly configured');
		} 				

		const token = sign(// from JSONWEBTOKEN
			payload, secret1); // PrivateKey à entrer comme  une variable d'environnement.
		return { token, user };
	  }


  async confirmation(tokenStr: string) {
    const token = await this.tokenService.getByValue(tokenStr); // récupère le token associé à la valeure tokenStr
    if (!token) {
      throw new Error('Lien invalide');
	}
	await this.userService.userActivation(token.user); // on appelle méthode userActivation pour activer un compte
	

}

private async nodemailer(token: string, user: User) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    const testAccount = await createTestAccount();

    // create reusable transporter object using the default SMTP transport
    const transporter = createTransport({
      host: environnment.mailHost,
      port: environnment.mailPort,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });

    try {

      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: environnment.EMAIL, // sender address // Mettre adresse client
        to: user.email, // list of receivers
        subject: 'Activation link', // Subject line
        html: `<b><a href=${environnment.confirmationUrl + token}>
        Activation link </a>
        </b>`, // html body
      });

      console.log('Message sent: %s', info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', getTestMessageUrl(info));
      //Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    } catch (error) {
      console.error(error);

    }

  }

	 
	
	}

