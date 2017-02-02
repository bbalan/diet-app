export default {
  namespaced: true,
  state: {
    ingredient: null,
  },
  mutations: {
    setIngredient(state, ingredient) {
      state.ingredient = ingredient
    },
  },
}
