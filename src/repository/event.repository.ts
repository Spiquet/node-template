import { EntityRepository, Repository } from 'typeorm';
import { Event } from '../models/event.entyty';

@EntityRepository(Event)
export class EventRepository extends Repository<Event> {
	private static instance: EventRepository;
}
