<template>
    <div class="my-5 container">
        <h1>Напоминания</h1>
        <div v-for="task in tasks" :key=task.label>
            <div class="mt-5" v-if="task.hidden">
                <b-card :title="task.title" v-model="tasksShow">
                    <b-card-text>
                        {{task.desc}}
                    </b-card-text>
                    <b-button @click="task.hidden = !task.hidden">Выполнено</b-button>
                </b-card>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tasksShow: false,
                tasks: [
                    {
                        title: "Организационные моменты",
                        desc: 'Отправить паспортные данные для коропоративной стипендии',
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
