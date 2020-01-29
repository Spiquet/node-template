import { Spectacle } from '../models/spectacle.entyty';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Spectacle)
export class SpectacleRepository extends Repository<Spectacle> {
	private static instance: SpectacleRepository;
}
