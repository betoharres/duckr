import { userExpirationLenght,
         usersDucksExpirationLenght,
         repliesExpirationLenght } from '../config/constants'

export function formatUserInfo (name, avatar, uid) {
  return {
    name,
    avatar,
    uid,
  }
}
export function formatDuck (text, {name, avatar, uid}) {
  return {
    text,
    name,
    avatar,
    uid,
    timestamp: Date.now(),
  }
}

export function formatTimeStamp (timestamp) {
  const date = new Date(timestamp)
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

function getMilliseconds (timestamp) {
  return new Date().getTime() - new Date(timestamp).getTime()
}

export function staleUser (timestamp) {
  return getMilliseconds(timestamp) > userExpirationLenght
}

export function staleDucks (timestamp) {
  return getMilliseconds(timestamp) > usersDucksExpirationLenght
}

export function formatReply ({name, uid, avatar}, reply) {
  return {
    name,
    reply,
    uid,
    avatar,
    timestamp: Date.now(),
  }
}

export function staleReplies (timestamp) {
  return getMilliseconds(timestamp) > userExpirationLenght
}
