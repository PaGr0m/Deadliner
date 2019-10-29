<template>
    <div class="container mt-5">

        <b-form-group id="input-group-3" label="Предмет" label-for="input-3">
            <b-form-select
                    id="input-3"
                    v-model="form.subject"
                    :options="subject"
                    required
            ></b-form-select>
        </b-form-group>

        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
                    id="input-group-1"
                    label="Домашнее задание"
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
                        v-model="form.data"
                        required
                ></b-form-input>
            </b-form-group>

            <b-button type="submit" class="mr-1" variant="primary">Добавить</b-button>
            <b-button type="reset" variant="danger">Отмена</b-button>
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
                form: {
                    subject: null,
                    description: null,
                    data: null
                },
                subject: [{ text: 'Предмет:', value: null }, 'C++', 'Unix/Python', 'Алгоритмы', 'Базы данных',
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