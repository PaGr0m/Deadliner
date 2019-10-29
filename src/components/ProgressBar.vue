<template>
    <div>
        <div v-for="bar in bars" :key="bar.label" class="row mb-1 mr-5">
            <div v-if="bar.value < 30" class="col-sm-2 "><b>{{ bar.name }}</b></div>
            <div v-else class="col-sm-2 ">{{ bar.name }}</div>
            <div class="col-sm-2 "><b>{{ bar.dead_date.getDate() }}:{{ bar.dead_date.getMonth() }}:{{ bar.dead_date.getFullYear() }} | {{ bar.dead_date.getHours() }}:{{ bar.dead_date.getMinutes() }}</b></div>
            <div class="col-sm-5 pt-1">
                <b-progress v-if="bar.value < 25 && bar.value > 0" :value="bar.value" :variant="'danger'" :key="bar.variant"></b-progress>
                <b-progress v-else-if="bar.value < 50 && bar.value > 0" :value="bar.value" :variant="'warning'" :key="bar.variant"></b-progress>
                <b-progress v-else-if="bar.value > 0" :value="bar.value" :variant="'success'" :key="bar.variant"></b-progress>
                <div v-if="bar.value < 0" class="col-sm-10 "><b>Дедлайн просрочен! У Вас проблемы!</b></div>
            </div>
            <div class="col-sm-2 "><b>{{ bar.add_date.getDate() }}:{{ bar.add_date.getMonth() }}:{{ bar.add_date.getFullYear() }} | {{ bar.add_date.getHours() }}:{{ bar.add_date.getMinutes() }}</b></div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                cur_time: [
                    { cur_sec: new Date().getTime()},
                ],
                bars: [
                    { variant: "danger", value: 0, add_date: new Date('October 28, 2019 03:24:00'), dead_date :new Date('October 29, 2019 03:24:00'), name: 'Unix/Python' },
                    { variant: "danger", value: 0, add_date: new Date('October 28, 2019 03:24:00'), dead_date :new Date('October 30, 2019 23:24:00'), name: 'Операционные системы' },
                    { variant: "danger", value: 0, add_date: new Date('October 28, 2019 03:24:00'), dead_date :new Date('October 30, 2019 03:24:00'), name: 'C++' },
                    { variant: "danger", value: 0, add_date: new Date('October 27, 2019 23:24:00'), dead_date :new Date('October 29, 2019 03:24:00'), name: 'Комбинаторика' },
                    { variant: "danger", value: 0, add_date: new Date('October 21, 2019 03:24:00'), dead_date :new Date('October 30, 2019 03:24:00'), name: 'Базы данных' },
                    { variant: "danger", value: 0, add_date: new Date('October 23, 2019 03:24:00'), dead_date :new Date('October 29, 2019 03:24:00'), name: 'ФП' },
                    { variant: "danger", value: 0, add_date: new Date('October 21, 2019 03:24:00'), dead_date :new Date('October 29, 2019 03:24:00'), name: 'Основы програмной инженерии' }
                ],
                timer: null
            }
        },
        created() {
            this.timer = setInterval(() => {
                this.bars.forEach(bar => (bar.value = (bar.dead_date.getTime() - this.cur_time[0].cur_sec) / (bar.dead_date.getTime() - bar.add_date.getTime()) * 100));
                // if (this.value < 7) {
                //     this.variant = "warning";
                // }
                // if (this.value < 5) {
                //     this.variant = "danger";
                // }
                // else {
                //     this.variant = "success";
                // }
                this.bars.sort((prev, next) => prev.value - next.value);
                this.cur_time[0].cur_sec = new Date().getTime();

            }, 100)
        },
        beforeDestroy() {
            clearInterval(this.timer);
            this.timer = null
        }
    }
</script>

<style scoped>

</style>