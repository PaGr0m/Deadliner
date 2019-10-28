<template>
    <div class="mt-5">
        <div v-for="bar in bars" :key="bar.label" class="row mb-1 m-auto">
            <div class="col-sm-2 ">{{ bar.name }}</div>
            <div class="col-sm-10 pt-1">
                <b-progress :value="bar.value" :variant="bar.variant" :key="bar.variant"></b-progress>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                bars: [
                    { variant: "danger", value: 40, name: 'Unix/Python' },
                    { variant: "danger", value: 50, name: 'ОC' },
                    { variant: "danger", value: 32, name: 'C++' },
                    { variant: "danger", value: 80, name: 'Комбинаторика' },
                    { variant: "danger", value: 50, name: 'Базы данных' },
                    { variant: "danger", value: 70, name: 'ФП' },
                    { variant: "danger", value: 90, name: 'Основы ПИ' }
                ],
                timer: null
            }
        },
        mounted() {
            this.timer = setInterval(() => {
                this.bars.forEach(bar => (bar.value -= 2));
                if (this.value < 70) {
                    this.variant = "warning";
                }
                if (this.value < 50) {
                    this.variant = "danger";
                }
                else {
                    this.variant = "success";
                }
            }, 1500)
        },
        beforeDestroy() {
            clearInterval(this.timer);
            this.timer = null
        }
    }
</script>

<style scoped>

</style>