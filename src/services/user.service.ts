import { UserRepository } from '../repository/user.repository';
import { User } from '../models/user.entyty';
import { getCustomRepository } from 'typeorm';
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les psort doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controlleur
 */
export class userService {
	// Make service => singletonTransformation de notre service en singleton

	repository = getCustomRepository(UserRepository);

	get() {
		return this.repository.find();
	}

	post(user: User) {
		return this.repository.save(user);
	}
}
