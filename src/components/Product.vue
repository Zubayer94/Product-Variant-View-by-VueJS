<template>
  <div class="row">
    <div class="col-lg-9 col-12 col-sm-12 col-md-12 offset-md-1 mt-5">
      <div class="row">
        <div class="col-lg-6 col-12 col-sm-6 col-md-6 p-0">
          <div class="big-img" style="display: flex; justify-content: center;">
            <div  class="image-magnifier img-thumbnail" id="myImg" style="position: relative; cursor: move;">
              <img width="300" height="300" :src="product.image" class="image-magnifier__img">
            </div>
            <!-- <div class="spinner-border" role="status" style="margin-top: 40vh">
              <span class="sr-only">Loading...</span>
            </div> -->
          </div> 
        </div> 
        <div class="col-lg-6 col-12 col-sm-6 col-md-6"> 
          <div class="text">
            <img src="https://agbd.s3.amazonaws.com/media/brand_images/Apple_1.svg" alt="" style="width: 75px; cursor: pointer;"> 
            <h2 style="font-size: 25px; color: rgb(18, 18, 18); font-weight: bold;">iPhone 12 Pro Max</h2> <!----> 
            <div>
              <h4><span style="font-size: 20px;"><b>TK. {{product.charge}}</b></span></h4> <!---->
            </div> <!----> 
            <div class="form-group" style="margin-left: 20px; margin-bottom: 0px;">
              <input type="checkbox" id="emiCheck" true-value="true" class="form-check-input" style="margin-top: 7px;"> 
              <a data-toggle="modal" data-target="#emiModal" style="font-weight: 400; color: rgb(212, 132, 62); padding-bottom: 0px; font-size: 13px; cursor: pointer;">
                <span for="emiCheck" class="form-check-label cash" style="font-weight: 400; padding-bottom: 0px; font-size: 13px; color: rgb(179, 179, 179);">
                      Available EMI Offer
                </span> 
                View Plans
              </a>
            </div> 
            <div>
              <span style="font-weight: 400; color: rgb(212, 132, 62); padding-bottom: 0px; font-size: 13px;"></span>
            </div> 

            <hr> 
            
            <div>
              <div class="d-flex" style="min-height: 50px;">
                <p class="color"> Storage :</p> 
                <div class="d-flex" style="flex-wrap: wrap;">
                  <template v-for="storage in storages" :key="storage.id">
                    <div>
                      <div :class="storage.id != pStorage ? 'default-text-item' : 'checked-text-item' " class="borders" style="margin-right: 10px; cursor: pointer;" @click="update('storage', storage.id)">
                        <div class="gb">
                          <div id="Storage">
                            <a><span id="128GB">{{storage.value}}</span></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
              <div class="d-flex" style="min-height: 50px;">
                <p class="color"> Color :</p> 
                <div class="d-flex" style="flex-wrap: wrap;">
                  <template v-for="color in colors" :key="color.id">
                    <div>
                      <div :class="color.id != pColor ? 'default-item' : 'checked-item' " class="borders" style="cursor: pointer; margin-bottom: 5px;" @click="update('color', color.id)">
                        <div class="gbr text-center" style="line-height: 29px; position: absolute; margin: 15% 13%;" :style=" {background: '#' + color.value.split('_').pop()} ">
                          <div id="Color">
                            <a><span id="Gold_FDEED7"></span> </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
              <div class="d-flex" style="min-height: 50px;">
                <p class="color"> Sim :</p> 
                <div class="d-flex" style="flex-wrap: wrap;">
                  <template v-for="sim in sims" :key="sim.id">
                    <div>
                      <div :class="sim.id != pSim ? 'default-text-item' : 'checked-text-item' " class="borders" style="margin-right: 10px; cursor: pointer;" @click="update('sim', sim.id)">
                        <div class="gb">
                          <div id="Sim">
                              <a><span id="e-Sim">{{sim.value}}</span></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
              <div class="d-flex" style="min-height: 50px;">
                <p class="color"> Region :</p> 
                <div class="d-flex" style="flex-wrap: wrap;">
                  <template v-for="region in regions" :key="region.id">
                    <div>
                      <div :class="region.id != pRegion ? 'default-text-item' : 'checked-text-item' " class="borders" style="margin-right: 10px; cursor: pointer;" @click="update('region', region.id)">
                        <div class="gb">
                          <div id="Region">
                            <a><span id="Regular">{{region.value}}</span></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
            <span v-if="product.stock  <= 1" class="badge badge-warning">Out of Stock</span>
          </div>
        </div>
        <p class="mt-5">For checking the data: {{product}} </p> 
      </div> <!---->
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Product',
  data() {
    return {
      pStorage: '',
      pColor: '',
      pSim: '',
      pRegion: '',
      loading: false,
    }
  },
  methods: {
    ...mapActions({
      getProductAttribute: 'products/getProductAttribute',
      getProduct: 'products/getProduct',
      updatedProduct: 'products/updatedProduct',
    }),
    setProductAtt() {
      this.productAtt.forEach((item, index) => {
        if (index == 0) this.pStorage = item;
        else if (index == 1) this.pColor = item;
        else if (index == 2) this.pSim = item;
        else if (index == 3) this.pRegion = item;
      });
    },
    handleUpdate(){
      this.loading = true;
      this.updatedProduct([this.pStorage, this.pColor, this.pSim, this.pRegion])
      .then(() => this.loading = false)
    },
    update(type, value){
      if (type == 'storage') {
        this.pStorage = value;
        this.handleUpdate();
      }
      else if (type == 'color') {
        this.pColor = value;
        this.handleUpdate();
      }
      else if (type == 'sim') {
        this.pSim = value;
        this.handleUpdate();
      }
      else if (type == 'region') {
        this.pRegion = value;
        this.handleUpdate();
      }
    }
  },
  computed: {
    ...mapState({
      product: state => state.products.product,
      storages: state => state.products.storages,
      colors: state => state.products.colors,
      sims: state => state.products.sims,
      regions: state => state.products.regions,
      productAtt: state => state.products.product.attribute_combination,
    }),
  },
  mounted() {
    this.getProductAttribute();
    this.getProduct()
    .then(() => this.setProductAtt())
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.image-magnifier__img{
  width: auto;
  height: 394px;
  margin-top: 4px;
  display: block;
  margin-right: auto;
}
.checked-item, .default-item {
    width: 42px;
    height: 42px;
    line-height: 42px;
    margin-left: 0;
    margin-right: 10px;
    position: relative;
}
.checked-item{
    border-radius: 50%;
    border: 1px solid #e70000!important;
    box-shadow: 0 0 3px 2px rgb(228 121 17 / 50%);
}
.default-item {
    border-radius: 50%;
    border: 1px solid #9a7676!important;
    box-shadow: 0 0 3px 2px rgb(228 121 17 / 50%);
}
.default-item:hover {
    border-radius: 50%;
    border: 1px solid #e70000!important;
    box-shadow: 0 0 3px 2px rgb(228 121 17 / 50%);
}

element.style {
    line-height: 29px;
    position: absolute;
    margin: 15% 13%;
    background-color: rgb(253, 238, 215);
}
.gbr {
    height: 32px;
    width: 32px;
    margin-right: 5px;
    cursor: pointer;
    border: 1px solid #b1b1b1;
    border-radius: 50%;
    top: -2px;
    left: -1px;
}
.checked-item {
    border-radius: 50%;
    border: 1px solid #e70000!important;
    box-shadow: 0 0 3px 2px rgb(228 121 17 / 50%);
}
.default-text-item {
    border: 1px solid #b1b1b1;
    background-color: #fefefe;
    border-radius: 16px;
    color: #929292;
    margin-top: 10px;
}
.default-text-item:hover {
    border: 1px solid #d0d0d0;
    background-color: #f3f3f3;
    color: #353535;
}
.checked-text-item{
    border: 1px solid #e70000;
    background-color: #fefaf6!important;
    border-radius: 16px;
    color: #353535;
    margin-top: 10px;
    box-shadow: 0 0 3px 2px rgb(228 121 17 / 50%);
}
.gb {
    width: auto;
    text-align: center;
    border-radius: 16px;
    padding: 0 4px;
    font-size: 15px;
    font-weight: 500!important;
}
.color{
    margin-top: 10px;
    font-weight: 500;
    font-size: 15px;
    color: #000;
    min-width: 80px;
}
</style>

