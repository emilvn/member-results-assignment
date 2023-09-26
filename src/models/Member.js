export class Member{
	#_name;
	#_firstName;
	#_lastName;
	#_birthdate;
	id;
	isActive;

	/**
	 * Member constructor
	 * @param {MemberData} memberDetails
	 */
	constructor(memberDetails) {
		this.birthdate = memberDetails.dateOfBirth || undefined;
		this.firstName = memberDetails.firstName || undefined;
		this.lastName = memberDetails.lastName || undefined;
		Object.defineProperties(this, {
			isActive: {
				value: memberDetails.isActiveMember || undefined,
				enumerable: true
			},
			id: {
				value: memberDetails.id || undefined,
				writable: false,
				enumerable: true
			}
		});
	}
	get name(){
		return this.#_name;
	}
	set name(fullName){
		this.#_firstName = fullName.substring(0, fullName.indexOf(" "));
		this.#_lastName = fullName.substring(fullName.indexOf(" ")+1);
		this.#_name = fullName;
	}
	set firstName(firstName){
		this.#_firstName = firstName;
		this.name = firstName + " " + this.#_lastName;
	}
	set lastName(lastName){
		this.#_lastName = lastName;
		this.name = this.#_firstName + " " + lastName;
	}

	get birthdate(){
		return this.#_birthdate;
	}
	set birthdate(dateString){
		this.#_birthdate = new Date(dateString);
	}

	get age(){
		const today = new Date();
		const ageInMilliseconds = today - this.#_birthdate;
		const ageInYears = new Date(ageInMilliseconds).getUTCFullYear()-1970
		return Math.abs(ageInYears);
	}

	get isJunior(){
		return this.age < 18;
	}
	get isSenior(){
		return !this.isJunior;
	}
}