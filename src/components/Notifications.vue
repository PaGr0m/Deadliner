<template>
    <div class="container mt-5">
        <b-card-group columns>
            <b-card
                    v-for="not in nots" :key="not.label"
                    v-show="not.hidden"
                    class="fix"
                    :bg-variant="not.style"
                    :text-variant="not.textColor"
                    :title="not.title"
                    :img-src="not.image"
                    :img-alt="not.image"
                    img-top
            >
                <b-card-text>
                    {{ not.desc }}
                </b-card-text>
                <b-col lg="4" class="pb-2 mx-auto">
                    <b-button variant="outline-dark" size="sm" v-on:click="not.hidden = !not.hidden">
                        Скрыть
                    </b-button>
                </b-col>
                <b-card-text class="small text-white">
                    Last updated 3 mins ago
                </b-card-text>
            </b-card>
        </b-card-group>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tasksShow: false,
                nots: [
                    {
                        title: "Организационные моменты",
                        desc: 'Отправить паспортные данные для коропоративной стипендии',
                        style: "danger",
                        textColor: "white",
                        hidden: true
                    },
                    {
                        title: "Вопросы жизни и смерти",
                        desc: 'Попросить перенести дэдлайн по алгоритмам',
                        hidden: true
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    .fix {
        display: inline-block;
        -webkit-column-break-inside: avoid;
    }
</style>