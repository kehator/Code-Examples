<template>
    <div class="card text-center" style="width: 20rem;">
        <div class="card-header">Featured</div>
        <div class="card-body">
            <h4 class="card-title">Special title treatment</h4>
            <p class="card-text name">{{ jobName }}</p>
            <!-- <input type="text" placeholder="oki" @blur="actionn"> -->
            <button class="btn btn-primary" @click="UserDoSomeWorMethod()">Work !</button>
            <div id="demo"></div>
        </div>
        <div class="card-footer text-muted">2 days ago</div>
    </div>
</template>

<script>
export default {
    props: ['jobName','current_job'],

    // data(){
    //     return {
    //     }
    // },

    created() {
        this.$on('noGold', (section) => {
            console.log(section);
        });

        socket.on('updated', (data) => {
            console.log(data)
        });

        socket.on('update-start', (data) => {
            // console.log(data)
            this.$parent.countDown(data.end_timestamp);
        });

        socket.on('update-done', (data) => {
            this.$parent.$emit('update-job', {current_job: 'job', action: 'add_job', value: job+1});
        });
    },

    methods: {
        UserDoSomeWorMethod() {
            if (gold >= 100) {
                socket.emit('UserDoSomeWork', { current_job: job, action: 'add_job', userRoom: userEmail });
            } else {
                this.$emit('noGold', 'There is not enough gold to do that...');
            }
        },
    }
}
</script>
