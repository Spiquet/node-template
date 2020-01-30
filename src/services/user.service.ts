import { UserRepository } from '../repository/user.repository';
import { User } from '../models/user.entyty';
import { getCustomRepository, ObjectLiteral } from 'typeorm';
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les psort doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controlleur
 */
export class userService {
	// Make service => singletonTransformation de notre service en singleton

	repository = getCustomRepository(UserRepository);

	// Récupérer les user
	get() {
		return this.repository.find();
	}

	// Créer un user
	post(user: User) {
		return this.repository.save(user);
	}

	// Modifier un user (Admin)
	async update(idElement: number, element: ObjectLiteral) {
		const one = await this.repository.findOne(idElement);
		if (!one) {
			throw new Error(`l'objet d'id ${idElement} n'existe pas `);
		}
		this.repository.merge(one, element);
		return this.repository.save(one, element);
	}

	// Supprimer un user (Admin)

	deleteById(id: number) {
		return this.repository.delete(id);
	}
}
