// Personal info about the user

import store from 'store'
import db from 'store/db'
import setKeyValue from 'store/dbUtils'

const defaultState = {
  firstName: '',
  lastName: '',
  fullName: '',
  email: '',
  birthday: null,
  // TODO: replace default values with HTML5 form placeholder
  age: undefined,
  gender: undefined,
  height: undefined,
  weight: undefined,
  bodyFatPct: undefined,
  mass: undefined,
  tdee: undefined,
  numMeals: null, // TODO: expose this to user
  mealStops: [],
  goal: undefined,
  goalSpeed: 500,
  activityLevel: undefined,
}

const userInfo = {
  namespaced: true,
  state: defaultState,
  actions: {
    init({ commit }) {
      // console.log('dispatch userInfo/init', db)

      db.userInfo
        .toArray()
        .then((data) => {
          if (data.length === 0) {
            db.userInfo
              .add(defaultState)
              .then(() => { commit('init', defaultState) })
          } else {
            commit('init', data[0])
          }
        })
    },
    prepopulate({ dispatch, state }) {
      Promise.all([
        dispatch('setGender', 'male'),
        dispatch('setHeight', 177),
        dispatch('setWeight', 151.6),
        dispatch('setBodyFatPct', 20),
        dispatch('setGoal', 'burn-fat'),
        dispatch('setActivityLevel', 1.2),
        dispatch('setNumMeals', 6),
        dispatch('setTdee'),
      ]).then(() => {
        store.dispatch('calendar/setUserInfo', state)
      })
    },
    setFirstName({ commit }, firstName) {
      return setKeyValue({ commit }, 'userInfo', 'firstName', firstName)
    },
    setLastName({ commit }, lastName) {
      return setKeyValue({ commit }, 'userInfo', 'lastName', lastName)
    },
    setFullName({ commit }, fullName) {
      return setKeyValue({ commit }, 'userInfo', 'fullName', fullName)
    },
    setEmail({ commit }, email) {
      return setKeyValue({ commit }, 'userInfo', 'email', email)
    },
    setBirthday({ commit }, birthday) {
      const today = new Date().getTime()
      const birthdayTimestamp = new Date(birthday).getTime()
      const secondsInAYear = 365 * 24 * 60 * 60
      const age = Math.round(((today - birthdayTimestamp) / secondsInAYear / 1000) * 10) / 10

      return setKeyValue({ commit }, 'userInfo', 'birthday', birthdayTimestamp, () => {
        setKeyValue({ commit }, 'userInfo', 'age', age)
      })
    },
    setAge({ commit }, age) {
      return setKeyValue({ commit }, 'userInfo', 'age', age)
    },
    setGender({ commit }, gender) {
      return setKeyValue({ commit }, 'userInfo', 'gender', gender)
    },
    setHeight({ commit }, height) {
      return setKeyValue({ commit }, 'userInfo', 'height', height)
    },
    setWeight({ commit, dispatch }, weight) {
      let w = parseFloat(weight)
      let mass

      if (typeof w !== 'number') {
        w = null
        mass = null
      } else {
        w = weight

        const unitWeight = store.state.config.unitWeight

        if (unitWeight === 'kg') {
          mass = weight
        } else {
          mass = weight / 2.20462
        }
      }

      return setKeyValue({ commit }, 'userInfo', 'weight', weight, () => {
        dispatch('setMass', mass)
      })
    },
    setMass({ commit }, mass) {
      console.log('sdfdsfsdfdsfsdf')
      return setKeyValue({ commit }, 'userInfo', 'mass', mass, () => {
        console.log('############')
        store.dispatch('calendar/setMassUpdated')
      })
    },
    setBodyFatPct({ commit }, bodyFatPct) {
      return setKeyValue({ commit }, 'userInfo', 'bodyFatPct', bodyFatPct)
    },
    setTdee({ commit }, tdee) {
      return setKeyValue({ commit }, 'userInfo', 'tdee', tdee)
    },
    setNumMeals({ commit }, numMeals) {
      return setKeyValue({ commit }, 'userInfo', 'numMeals', numMeals)
    },
    setMealStops({ commit }, mealStops) {
      return setKeyValue({ commit }, 'userInfo', 'mealStops', mealStops)
    },
    setGoal({ commit }, goal) {
      return setKeyValue({ commit }, 'userInfo', 'goal', goal)
    },
    setGoalSpeed({ commit }, goalSpeed) {
      return setKeyValue({ commit }, 'userInfo', 'goalSpeed', goalSpeed)
    },
    setActivityLevel({ commit }, activityLevel) {
      return setKeyValue({ commit }, 'userInfo', 'activityLevel', activityLevel)
    },
  },
  mutations: {
    init(state, fromIndexedDB) {
      // console.log('commit(userInfo/init)', fromIndexedDB)

      state.firstName = fromIndexedDB.firstName
      state.lastName = fromIndexedDB.lastName
      state.fullName = fromIndexedDB.fullName
      state.email = fromIndexedDB.email
      state.birthday = fromIndexedDB.birthday
      state.age = fromIndexedDB.age
      state.gender = fromIndexedDB.gender
      state.height = fromIndexedDB.height
      state.weight = fromIndexedDB.weight
      state.bodyFatPct = fromIndexedDB.bodyFatPct
      state.mass = fromIndexedDB.mass
      state.tdee = fromIndexedDB.tdee
      state.numMeals = fromIndexedDB.numMeals
      state.mealStops = fromIndexedDB.mealStops
      state.goal = fromIndexedDB.goal
      state.goalSpeed = fromIndexedDB.goalSpeed
      state.activityLevel = fromIndexedDB.activityLevel
    },

    /** Translates the user's birthday into a timestamp, and calculates their age. */
    birthday(state, birthday) {
      // console.log('commit userInfo/birthday', birthday)

      const today = new Date().getTime()
      const birthdayTimestamp = new Date(birthday).getTime()
      const secondsInAYear = 365 * 24 * 60 * 60
      const age = Math.round(((today - birthdayTimestamp) / secondsInAYear / 1000) * 10) / 10

      state.personal.birthday = birthday
      state.personal.personal.birthdayTimestamp = birthdayTimestamp
      state.age = age

      store.dispatch('calendar/setUserInfo', state)
    },

    gender(state, gender) {
      // console.log('commit userInfo/gender', gender)

      state.gender = gender
      store.commit('userInfo/tdee')
      store.dispatch('calendar/setUserInfo', state)
    },

    height(state, height) {
      // console.log('commit userInfo/height', height)

      if (!height) {
        state.height = 0
      } else {
        state.height = height
      }
      store.commit('userInfo/tdee')
      store.dispatch('calendar/setUserInfo', state)
    },

    mass(state, mass) {
      // console.log('commit userInfo/mass', mass)

      if (!mass) {
        state.mass = 0
      } else {
        state.mass = mass
      }

      store.commit('userInfo/tdee')
      store.dispatch('calendar/setUserInfo', state)
    },

    bodyFatPct(state, bodyFatPct) {
      // console.log('commit userInfo/bodyFatPct', bodyFatPct)

      state.bodyFatPct = bodyFatPct
      store.commit('userInfo/tdee')
      store.dispatch('calendar/setUserInfo', state)
    },

    // Converts between metric and lbs
    weight(state, weight) {
      // console.log('commit userInfo/weight', weight)

      state.weight = weight
      store.commit('userInfo/tdee')
      store.dispatch('calendar/setUserInfo', state)
    },

    numMeals(state, numMeals) {
      // console.log('commit userInfo/numMeals', numMeals)

      state.numMeals = numMeals
      store.dispatch('calendar/setUserInfo', state)
    },

    goal(state, goal) {
      // console.log('commit userInfo/goal', goal)

      state.goal = goal
      store.commit('userInfo/tdee')
      store.dispatch('calendar/setUserInfo', state)
    },

    goalSpeed(state, goalSpeed) {
      // console.log('commit userInfo/goalSpeed', goalSpeed)

      state.goalSpeed = goalSpeed
      store.commit('userInfo/tdee')
      store.dispatch('calendar/setUserInfo', state)
    },

    activityLevel(state, activityLevel) {
      // console.log('commit userInfo/activityLevel', activityLevel)

      state.activityLevel = activityLevel
      store.commit('userInfo/tdee')
      store.dispatch('calendar/setUserInfo', state)
    },

    // Calculate the TDEE using various formulas
    tdee(state) {
      // console.log('commit userInfo/tdee')

      const bodyFatPct = state.bodyFatPct
      const mass = state.mass
      const height = state.height
      const goalSpeed = store.state.userInfo.goalSpeed

      let leanBodyMass
      let deficit

      switch (store.state.userInfo.goal) {
        case 'burn-fat':
          deficit = goalSpeed * -1
          break
        case 'build-muscle':
          deficit = goalSpeed
          break
        default:
          deficit = 0
          break
      }

      // calculate leanBodyMass
      // Body fat percentage
      if (bodyFatPct) {
        leanBodyMass = mass * (100 - bodyFatPct) / 100
      } else if (state.gender === 'male') {
        // Boer formula (1984)
        leanBodyMass = (0.407 * mass) + (0.267 * height) - 19.2
      } else {
        // Boer formula (1984)
        leanBodyMass = (0.252 * mass) + (0.473 * height) - 48.3
      }

      // Katch McArdle formula
      const basalMetabolicRate = 370 + (21.6 * leanBodyMass)

      // Multiply by activity level to get TDEE
      const tdee = basalMetabolicRate * store.state.userInfo.activityLevel + deficit

      state.tdee = tdee
    },
  },
}

export default userInfo
