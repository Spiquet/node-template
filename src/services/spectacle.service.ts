import { UserRepository } from '../repository/user.repository';
import { Spectacle } from '../models/spectacle.entyty';
import { getCustomRepository, ObjectLiteral } from 'typeorm';
import { SpectacleRepository } from '../repository/spectacle.repository';
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les psort doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controlleur
 */
export class spectacleService {
	// Make service => singletonTransformation de notre service en singleton

	repository = getCustomRepository(SpectacleRepository);

	// Récuperer les services
	get() {
		return this.repository.find();
	}

	// Créer un Spectacle (Admin)
	post(spectacle: Spectacle) {
		return this.repository.save(spectacle);
	}

	//// Modifier un spectacle (Admin)
	//async update(idElement: number, element: ObjectLiteral) {
	//	const one = await this.repository.findOne(idElement);
	//	if (!one) {
	//		throw new Error(`l'objet d'id ${idElement} n'existe pas `);
	//	}
	//	this.repository.merge(one, element);
	//	return this.repository.save(one, element);
	//}

	// Supprimer un spectacle (Admin)
	deleteById(id: number) {
		return this.repository.delete(id);
	}
}
