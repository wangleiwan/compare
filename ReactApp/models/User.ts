// Class properties based on current API spec + potential fields we may be saving based on UI wireframes (home phone)
class User {
	address?: string;
	birthdate?: string;
	extension?: string;
	extensionVerified?: boolean;
	home?: string;
	mobile?: string;
	mobileVerified?: boolean;
	phoneVerified?: boolean;
	photoUrl?: string;
	score?: number;
	sipAddress?: string;
	sipPassword?: string;
	userId?: string;
	work?: string;
  accountId: number;
  active?: boolean;
  createdBy?: string;
  createdOn?: Date;
  email?: string;
  emailVerified?: boolean;
  modifiedBy?: string;
  modifiedOn?: Date;
  name?: string;
  role?: string;

	constructor(userData: any) {
		if (userData) {
			Object.assign(this, userData);
		}
	}

	isAdmin(): boolean {
		return this.role === 'PARTNER_ADMIN' || this.role === 'ACCOUNT_ADMIN';
	}
}

export default User;