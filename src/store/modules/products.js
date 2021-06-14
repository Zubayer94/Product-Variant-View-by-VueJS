import axios from 'axios'
const state = () => ({
    product: {},
    allProducts: {},
    storages: {},
    colors: {},
    sims: {},
    regions: {},
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
            commit('SET_ALL_PRODUCT', response.data)
            commit('SET_PRODUCTS', response.data)
        } catch (error) {
            console.log(error);
        }
    },
    async updatedProduct({commit},payload) {
        try {
            let response = await axios.get('https://raw.githubusercontent.com/qtecsolution/Sample-JSON/main/variation.json')
            let data = response.data.filter(product => 
            {
                let attribute = product.attribute_combination
                return attribute.every( elm => payload.includes(elm) )
            }
            )[0];
            commit('UPDATE_PRODUCT', data)
        } catch (error) {
            console.log(error);
        }
    }
}

// mutations
const mutations = {
    SET_PRODUCT_STORAGE(state, data){
        state.storages = data;
    },
    SET_PRODUCT_COLOR(state, data){
        state.colors = data;
    },
    SET_PRODUCT_SIM(state, data){
        state.sims = data;
    },
    SET_PRODUCT_REGION(state, data){
        state.regions = data;
    },
    SET_ALL_PRODUCT(state, data){
        state.allProducts = data;
    },
    SET_PRODUCTS(state, products){
        state.product =  products.filter(product => product.is_default == true)[0];
    },
    UPDATE_PRODUCT(state, data){
        state.product = data;
    },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}