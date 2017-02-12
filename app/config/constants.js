import Firebase from 'firebase'

const firebaseUrl = 'https://brilliant-fire-5558.firebaseio.com/'
export const ref = new Firebase(firebaseUrl)

export const usersDucksExpirationLenght = 100000
export const userExpirationLenght = 100000
export const repliesExpirationLenght = 100000
