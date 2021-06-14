import axios from 'axios'
const state = () => ({
    product: {},
    storage: {},
    color: {},
    sim: {},
    region: {},
})

// getters
const getters = {}

// actions
const actions = {
    async getProductAttribute({commit}) {
        try {
            let response = await axios.get('https://raw.githubusercontent.com/qtecsolution/Sample-JSON/main/combination.json')
            commit('SET_PRODUCT_STORAGE', response.data[0].Storage)
            commit('SET_PRODUCT_COLOR', response.data[1].Color)
            commit('SET_PRODUCT_SIM', response.data[2].Sim)
            commit('SET_PRODUCT_REGION', response.data[3].Region)
        } catch (error) {
            console.log(error);
        }
    },
    async getProduct({commit}) {
        try {
            let response = await axios.get('https://raw.githubusercontent.com/qtecsolution/Sample-JSON/main/variation.json')
            commit('SET_PRODUCTS', response.data)
        } catch (error) {
            console.log(error);
        }
    }
}

// mutations
const mutations = {
    SET_PRODUCT_STORAGE(state, data){
        state.storage = data;
    },
    SET_PRODUCT_COLOR(state, data){
        state.color = data;
    },
    SET_PRODUCT_SIM(state, data){
        state.sim = data;
    },
    SET_PRODUCT_REGION(state, data){
        state.region = data;
    },
    SET_PRODUCTS(state, products){
        state.product =  products.filter(product => product.is_default == true)[0];
    },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}