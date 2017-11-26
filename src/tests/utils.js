export const fingerprint = (trackFns = []) => {
  const log = []

  const spy = fn => (...args) => {
    log.push({ fn, args })
  }

  return {
    mocks: trackFns.reduce(
      (tracker, key) => ({ ...tracker, [key]: spy(key) }),
      {}
    ),
    log
  }
}
