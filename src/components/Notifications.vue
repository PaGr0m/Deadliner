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
                </b-col>
                <b-card-text class="small">
                    {{not.updated}}
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
                        title: "Расписание",
                        desc:
                            'Вам поставили лекцию по креативным технологиям в корпусе на Кронверском 5 ноября в 18:00',
                        style: "danger",
                        textColor: "white",
                        updated: "Добавлено 5 мин назад",
                        hidden: true
                    },
                    {
                        title: "Неожиданные новости",
                        desc: 'С новой недели расписание поменяется',
                        updated: "Добавлено день назад",
                        hidden: true
                    },
                    {
                        title: "Организационные моменты",
                        desc: 'Отправить паспортные данные для коропоративной стипендии',
                        style: "danger",
                        textColor: "white",
                        updated: "Добавлено 40 мин назад",
                        hidden: true
                    },
                    {
                        title: "Место проведения занятий по С++",
                        desc: 'Занятие по C++ 4 ноября пройдут в черных досках',
                        updated: "Добавлено день назад",
                        hidden: true
                    },
                    {
                        title: "Английский язык: актуальная информация",
                        desc:
                            'Некоторые из вас в пятницу столкнулись с проблемой: пары по англискому языку были отменены, но ни нас, ни вас об этом не предупредили.\n' +
                            'Представители Центра изучения иностранных языков принесли свои извинения. Их рекомендация -- отслеживать все новости в группе Вконтакте: https://vk.com/english_ifmo. Так что перед тем, как идти на пару по английскому языку, заглядывайте в группу, чтоб убедиться, что нет изменений.',
                        updated: "Добавлено день назад",
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