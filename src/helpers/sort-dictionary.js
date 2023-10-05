export const sortDictionary = {
	"Navn": {
		propertyName: "name",
		sortAscending: (a,b) => a.item.name.localeCompare(b.item.name),
		sortDescending: (a,b) => b.item.name.localeCompare(a.item.name)
	},
	"Aktiv": {
		propertyName: "isActive",
		sortAscending: (a,b) => a.item.isActive - b.item.isActive,
		sortDescending: (a,b) => b.item.isActive - a.item.isActive
	},
	"Fødselsdag": {
		propertyName: "birthdate",
		sortAscending: (a,b) => a.item.birthdate - b.item.birthdate,
		sortDescending: (a,b) => b.item.birthdate - a.item.birthdate
	},
	"Alder": {
		propertyName: "age",
		sortAscending: (a,b) => a.item.age - b.item.age,
		sortDescending: (a,b) => b.item.age - a.item.age
	},
	"Gruppe": {
		propertyName: "isJunior",
		sortAscending: (a,b) => a.item.isJunior - b.item.isJunior,
		sortDescending: (a,b) => b.item.isJunior - a.item.isJunior
	},
	"Dato": {
		propertyName: "date",
		sortAscending: (a,b) => a.item.date - b.item.date,
		sortDescending: (a,b) => b.item.date - a.item.date
	},
	"Medlem": {
		propertyName: "member",
		sortAscending: (a,b) => a.item.member.name.localeCompare(b.item.member.name),
		sortDescending: (a,b) => b.item.member.name.localeCompare(a.item.member.name)

	},
	"Disciplin": {
		propertyName: "discipline",
		sortAscending: (a,b) => a.item.discipline.localeCompare(b.item.discipline),
		sortDescending: (a,b) => b.item.discipline.localeCompare(a.item.discipline)
	},
	"Type":{
		propertyName: "type",
		sortAscending: (a,b) => a.item.type.localeCompare(b.item.type),
		sortDescending: (a,b) => b.item.type.localeCompare(a.item.type)
	},
	"Tid":{
		propertyName: "timeInMilliseconds",
		sortAscending: (a,b) => a.item.timeInMilliseconds - b.item.timeInMilliseconds,
		sortDescending: (a,b) => b.item.timeInMilliseconds - a.item.timeInMilliseconds
	}
}