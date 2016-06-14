Vue.component('cars', {
    template:'#cars_template',
    props:[ 'list'],
    created:function () {
        this.featchCars();
           this.loading=false;
    },
    data:function () {
      return {  car : { brand:'',paletNum:'', carImage:''} , loading:true ,imageData:'' ,carsCount:0};
    },
    methods:{
      imageSelected:function (e) {

        var files = e.target.files || e.dataTransfer.files;
        var image=files[0];
        this.imageData=image;
      },
      createCar:function() {

        var form = new FormData();
        form.append('Content-Type', this.imageData.type || 'application/octet-stream');
        form.append('myFile', this.imageData);

        this.$http({ url: 'http://0.0.0.0:3000/api/Files/uploadFile',
                     data :form,
                     method: 'POST'
                  }).then(function (response) {

                      var image_url = response.data.url;
                      var form = {'brand':this.car.brand,'paletNum': this.car.paletNum,'imageUrl':image_url};
                      console.log(form);

                    this.$http({ url: 'http://0.0.0.0:3000/api/Cars',
                        data :form,
                        method: 'POST'
                      }).then(function (response) {
                        console.log('created a car!');
                        console.log(response);

                      },function () {
                        console.log('failed creating a car!');

                      });


        },function () {
          console.log('failed!');
        });


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

Vue.component('account', {
  template:'#account_template',
  data:function () {
    return {user:{username:'',email:'',id:'',avatar:''}}
  },
  methods:{
    logout:function () {
      console.log('logging out ');
      ACCESS_TOKEN = localStorage.getItem('auth_token');

      this.$http({
                url: 'http://0.0.0.0:3000/api/Customers/logout',
                method: 'POST',
                headers: {
                  Authorization:ACCESS_TOKEN
                }
         }).then(function (response) {

          localStorage.removeItem('auth_token');
          console.log('logged out!');
          this.$route.router.go('/');

      }, function (response) {
        console.log(response)
      });
    }
  }
});


var RegisterComponent = Vue.extend({
  template:'#register_template'
});

var LoginComponent = Vue.extend( {
    template:'#login_template',
    data:function () {
      return {
        credentials: { email: '',password: '' },
        error: '',
        user: {
          authenticated: false
        }
      }
    },

    methods:{

      submit:function () {

        var credentials = {
          email: this.credentials.email,
          password: this.credentials.password
        };
        this.$http({url: 'http://0.0.0.0:3000/api/Customers/login', data:credentials, method: 'POST'}).then(function (response) {
          console.log("Token => "+response.data.id);
          localStorage.setItem('auth_token', response.data.id);
          this.user.authenticated=true;

          // Redirect to a specified route
          this.$route.router.go('/dashboard');
            }, function (response) {
              // error callback
              console.log(response)
            });
          }
      },
      checkAuth: function() {
        var token = localStorage.getItem('auth_token');
        if(token) {
          this.user.authenticated = true
        }
        else {
          this.user.authenticated = false
        }
      }

    });


var DashboardComponent = Vue.extend({
  template:'#dashboard_template',
  data: {
    isAuthenticated:false
  },
  created:function () {
    this.checkAuth();
  },
  methods:{
    checkAuth: function() {
      var token = localStorage.getItem('auth_token');
      if(token) {
        this.isAuthenticated = true
      }
      else {
        this.isAuthenticated = false
      }
    }
  }

});
var HomeComponent = Vue.extend({
  template:'#home_template'

});

// Telling Vue to use the router
Vue.use(VueRouter);

// Initializing the router with options
var router = new VueRouter({
  history: false,
  root:'/'
});

// Router map for defining components
router.map({

  '/':{
    component:HomeComponent
  },
  '/dashboard': {
    component: DashboardComponent
  },
  '/login': {
    component: LoginComponent
  },
  '/signup': {
    component: RegisterComponent
  }

});

var App = Vue.extend({
  el:'#app',
  data: {
    customers: [ ],
    cars: [ ],
    rantings:[],
    isAuthenticated:false
  },
  created:function () {
    this.checkAuth();
  },
  methods:{
    checkAuth: function() {
      var token = localStorage.getItem('auth_token');
      if(token) {
        this.isAuthenticated = true
      }
      else {
        this.isAuthenticated = false
      }
    }
  }
});


Vue.filter('count', function (result, key) {
  return result.length;
});
router.start(App, '#app');
