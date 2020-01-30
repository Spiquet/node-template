import { Token } from './../models/token.entyty';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Token)
export class TokenRepository extends Repository<Token> {}
