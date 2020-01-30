import { User } from '../models/user.entyty';
import { EntityRepository, Repository } from 'typeorm';

/**
 * Cette classe est un repository
 * C'est ici qu'on met tout les accès à la bdd
 * Attention, aucune logique javascript ne doit apparaitre ici.
 * Il s'agit seulement de la couche de récupération des données (requete sql)
 */

@EntityRepository(User)
export class UserRepository extends Repository<User> {
	private static instance: UserRepository;

	findByName(firstName: string, lastName: string) {
		return this.findOne({ firstName, lastName });
	}

	async findByEmail(email: string) {
		return this.findOne({ email });
	}
}
