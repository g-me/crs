Vue.component('cars', {
    template:'#cars_template',
    props:[ 'list'],
    computed:{},
    // on component create hook method
    created:function () {
        this.featchCars();
    },
    methods:{
      createCar:function () {
        console.log('creating new car ...');

      },
      featchCars:function () {
        this.$http.get('http://0.0.0.0:3000/api/Cars',function (cars) {
          console.log(cars);
          this.list=cars;
        }).bind(this);
      },
      deleteCar:function (car) {
        console.log("deleting "+car.brand);
        this.list.$remove(car);
      }
    }
});

Vue.component('customers', {
    template:'#customers_template',
    props:[ 'list'],
    created:function () {
      this.featchCustomers();
    },
    methods: {
      createCustomer:function () {

      },
      featchCustomers:function () {
        this.$http.get('http://0.0.0.0:3000/api/Customers',function (customers) {
          if(customers){
            this.list=customers;
          }
        }).bind(this);
      },
      deleteCustomer:function (customer) {
        console.log("deleting "+customer.username);
        this.list.$remove(customer);
      }
    }
});

Vue.component('renting', {
    template:'#rentings_template',
    props:['list'],
    created:function () {
      this.list=[];
    }
});

Vue.component('app-header', {
    template:'#header_template'
});

Vue.component('app-footer', {
    template:'#footer_template'
});


Vue.component('login', {
    template:'#login_template',
    data:function () {
      return {user:{username:'',email:'',password:'',id:''}}
    },
    methods:{
      signin:function () {
          console.log('logging in '+this.user);
        this.$http({url: 'http://0.0.0.0:3000/api/Customers/login', data:this.user, method: 'POST'}).then(function (response) {
            console.log(response.data);
            console.log("Token => "+response.data.id);
            //todo store access token and redirect  to dashboard
        }, function (response) {
          // error callback
          console.log(response)
        });



      }
    }
});

Vue.component('account', {
    template:'#account_template',
    data:function () {
      return {user:{username:'',email:'',id:'',avatar:''}}
    },
    methods:{
      logout:function () {
        console.log('logging out  '+this.user);
        this.$http({url: 'http://0.0.0.0:3000/api/Customers/logout', method: 'POST'}).then(function (response) {
            //todo remove access token and redirect  to login
        }, function (response) {
          console.log(response)
        });
      }
    }
});


new Vue({
  el:'#app',
  data: {
    customers: [ {name:'Kebede'}, {name:'Abebe'} ],
    cars: [ {name:'Toyota'}, {name:'Bmw'} ],
    rantings:[],
  }

});
