
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

var utils = require('./scripts/utils');
var log = utils.log;

require('./bootstrap');
require('./scripts/time');


window.Vue = require('vue');
window.Event = new Vue();

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('user', require('./components/User.vue'));

const app = new Vue({
    el: '#app',

    data: {
        users: [],
    },

    created() {
        // socket.emit( 'join', userEmail );

        // socket.on('welcome', (data) => {
        //     console.log(data);
        // });

        // socket.on('message', (data) => {
        //     console.log(data);
        // });

        // Echo.private('test-channel')
        //     .listen('TestEvent', (data) => {
        //         console.log(data);
        //     });
        // console.log(userclient); // 'G5p5...'


        // socket.on('connect', () => {
        //   console.log(socket.io); // 'G5p5...'
        //   console.log(userSocket); // 'G5p5...'
        //   console.log(userSocket.nsp); // 'G5p5...'
        // });        

        // socket.on('user-channel-' + userID + ':connection-done', (data) => {
        //     console.log(data);
        // });
    },

    mounted() {
        utils.map_scroll();
        
        setInterval(utils.updateClock, 1000);

        // socket.on('test-channel:TestEvent', (data) => {
        //     this.users.push(data.username);
        // });
    },

    methods: {
        countDown: (countDownTimestampTo) => {
            let x = setInterval(() => {
                // Get todays date and time
                let nowTimestamp = ServerDate.now();
                // let nowTimestamp = new Date().getTime();

                // Find the distance between now an the count down date
                let distance = countDownTimestampTo - nowTimestamp;

                // Time calculations for days, hours, minutes and seconds
                let days = Math.floor(distance / (1000 * 60 * 60 * 24));
                let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((distance % (1000 * 60)) / 1000);

                // Display the result in the element with id="demo"
                document.getElementById("demo").innerHTML = days + "d " + hours + "h "
                + minutes + "m " + seconds + "s ";
                // console.log(distance)

                // If the count down is finished, write some text 
                if (distance < 1) {
                clearInterval(x);
                document.getElementById("demo").innerHTML = "";
                }
            }, 1000);
        },

        center_map: (orientation = null) => {
            let center_coor = [],
                window_center = [],
                window_dimensions = utils.get_window_dimentions();
            
            center_coor.push(current_pos[0], current_pos[1]);

            window_center[0] = Math.round(window_dimensions[0] / 2) - center_coor[0]; // game area center x
            window_center[1] = Math.round(window_dimensions[1] / 2) - center_coor[1]; // game area center y            

            if (orientation && orientation == 'x') {
                return window_center[0] + 'px';
            }

            if (orientation && orientation == 'y') {
                return window_center[1] + 'px';
            }

            return window_center;
        },        

        // toggleActiveObject($event) {
        //     let elementInfoBox = $event.target.parentNode.getElementsByClassName('element-info-wrapper');
        //     this.isActive = !this.isActive;

        //     console.log($event.target)
        // },          
    },

    computed: {

    }
});
