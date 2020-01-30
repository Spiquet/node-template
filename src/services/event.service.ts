import { EventRole } from './../models/event.entyty';
import { EventRepository } from '../repository/event.repository';
import { getCustomRepository } from 'typeorm';
import { Event } from '../models/event.entyty';

export class eventService {
	repository = getCustomRepository(EventRepository);

	//Récupérer le events
	get() {
		return this.repository.find();
	}

	// Créer un Spectacle (Admin)
	post(event: Event) {
		return this.repository.save(event);
	}

	getByIdEvent(id: number) {
		return this.repository.find({ where: { user: id }, relations: [ 'user', 'spectacle' ] });
	}

	getSpectacleEvent() {
		return this.repository.find({ where: { eventType: EventRole.SPECTACLE, relations: [ 'title' ] } });
	}
}
