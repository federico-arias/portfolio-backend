import { Controller, Get, Path, Query, Route } from "tsoa"

@Route("users")
export class UsersController extends Controller {
	@Get("{userId}")
	public async getUser(
		@Path() userId: number,
		@Query() foo: string,
	): Promise<{ foo: string; userId: number }> {
		return { userId, foo }
	}
}
