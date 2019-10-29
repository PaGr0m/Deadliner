<template>
    <div class="container mt-5">

        <b-form-group id="input-group-3" label="Предмет" label-for="input-3">
            <b-form-select
                    id="input-3"
                    v-model="form.subjectName"
                    :options="subjectName"
                    required
            ></b-form-select>
        </b-form-group>

        <b-form-group id="input-group-2" label="Название/номер ДЗ" label-for="input-2">
            <b-form-input
                    id="input-2"
                    v-model="form.name"
                    required
                    placeholder="Название/номер ДЗ"
            ></b-form-input>
        </b-form-group>

        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
                    id="input-group-1"
                    label="Опсиание"
                    label-for="input-1"
            >
                <b-form-textarea
                        id="input-1"
                        v-model="form.description"
                        required
                        placeholder="И грянул гром..."
                ></b-form-textarea>
            </b-form-group>

            <b-form-group id="input-group-2" label="Дата дэдлайна" label-for="date">
                <b-form-input
                        id="date"
                        type='date'
                        v-model="form.date"
                        required
                ></b-form-input>
            </b-form-group>

<!--            <b-form-group id="input-group-2" label="Время дэдлайна" label-for="time">-->
<!--                <b-form-input-->
<!--                        id="time"-->
<!--                        type='time'-->
<!--                        v-model="dateFormat.time"-->
<!--                        required-->
<!--                ></b-form-input>-->
<!--            </b-form-group>-->

            <b-button type="submit" class="mr-1" variant="danger">Добавить</b-button>

        </b-form>
        <b-card class="mt-3" header="Form Data Result">
            <pre class="m-0">{{ form }}</pre>
        </b-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // dateFormat: {
                //     date: null,
                //     time: null
                // },
                form: {
                    name: null,
                    subjectName: null,
                    description: null,
                    dateTimeStart: new Date(),
                    // dateTimeFinish: this.dateFormat.date + this.dateFormat.time
                },
                subjectName: [{ text: 'Предмет:', value: null }, 'C++', 'Unix/Python', 'Алгоритмы', 'Базы данных',
                    'Комбинаторика', 'Операционные системы', 'Основы программной инженерии',
                    'Функциональное программирование'],
                show: true
            }
        },
        methods: {
            onSubmit(evt) {
                evt.preventDefault()
    alert(JSON.stringify(this.form))
    },
    onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.subject = null
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
            this.show = true
        })
    }
    }
    }
</script>