import { User } from '../login/user.class';

export class Message {
	constructor(
		public user: User,
    public message: string,
    public date: number,
		public image: string
	) {
	}
}