import { UserRepository } from '../repository/user.repository';
import { User, UserRole } from '../models/user.entyty';
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

	// Récupérer les user par id
	getById(id: number) {
		const getId = this.repository.findOne(id);
		if (!getId) {
			throw new Error(`l'objet d'id ${id} n'existe pas `);
		}
		return getId;
	}

	// Créer un user
	post(user: User) {
		return this.repository.save(user);
	}

	// Activation d'un user
	async userActivation(user: User) {
		user.isActive = true;
		await this.repository.update(user.id, user);
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
