/**
 * @typedef ResultData
 * @type {{date: string, competitionName: string, competitionLocation: string, id: string, discipline: string, time: string, resultType: string, competitionPlacement: number, memberId: string}}
 * @property {string} id
 * @property {string} date
 * @property {string} discipline
 * @property {string} memberId
 * @property {string} resultType
 * @property {string} time
 * @property {string} [competitionName] (optional)
 * @property {string} [competitionLocation] (optional)
 * @property {number} [competitionPlacement] (optional)
 */

/**
 * @typedef MemberData
 * @property {string} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} dateOfBirth
 * @property {string} email
 * @property {boolean} hasPayed
 * @property {string} image
 * @property {boolean} isActiveMember
 * @property {boolean} isCompetitive
 * @property {string[]} [disciplines] (optional)
 */