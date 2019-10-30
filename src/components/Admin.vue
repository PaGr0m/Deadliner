<template>
    <div>

        <gantt-elastic :tasks="tasks" :options="options" :dynamic-style="dynamicStyle">
        </gantt-elastic>

    <div class="container mt-5">
        <h1>Добавить deadline</h1>
        <b-form-group id="input-group-3" label="Предмет" label-for="input-3">
            <b-form-select
                    id="input-3"
                    v-model="formDl.subject"
                    :options="subject"
                    required
            ></b-form-select>
        </b-form-group>

        <b-form-group id="input-group-2" label="Название/номер ДЗ" label-for="input-2">
            <b-form-input
                    id="input-2"
                    v-model="formDl.name"
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
                        v-model="formDl.description"
                        required
                        placeholder="И грянул гром..."
                ></b-form-textarea>
            </b-form-group>

            <b-form-group id="input-group-2" label="Дата дэдлайна" label-for="date">
                <b-form-input
                        id="date"
                        type='date'
                        v-model="formDl.dateTimeFinish"
                        required
                ></b-form-input>
            </b-form-group>

            <b-button type="submit" class="mr-1" variant="danger">Добавить</b-button>

        </b-form>

        <div style="height: 100px; width: 100px;"></div>


        <b-form-group id="input-group-4" label="Удалить deadline" label-for="input-4">
            <b-form-select
                    id="input-4"
                    v-model="formDelete.uuidToDelete"
                    :options="this.tasks.map(t => t.label)"
                    required
            ></b-form-select>
        </b-form-group>
        <b-button type="submit" class="mr-1" variant="danger">Удалить</b-button>


        <div style="height: 100px; width: 100px;"></div>
        <div style="height: 100px; width: 100px;"></div>


        <!--<b-card class="mt-3" header="Form Data Result">-->
            <!--<pre class="m-0">{{ formDl }}</pre>-->
        <!--</b-card>-->
    </div>

    <!--<div class="container my-5">-->
        <!--<h1>Добавить напоминание</h1>-->

        <!--<b-form-group id="input-group-2" label="Заголовок" label-for="input-2">-->
            <!--<b-form-input-->
                    <!--id="input-2"-->
                    <!--v-model="formNotification.title"-->
                    <!--required-->
                    <!--placeholder="Название/номер ДЗ"-->
            <!--&gt;</b-form-input>-->
        <!--</b-form-group>-->

        <!--<b-form @submit="onSubmit" @reset="onReset" v-if="show">-->
            <!--<b-form-group-->
                    <!--id="input-group-1"-->
                    <!--label="Опсиание"-->
                    <!--label-for="input-1"-->
            <!--&gt;-->
                <!--<b-form-textarea-->
                        <!--id="input-1"-->
                        <!--v-model="formNotification.description"-->
                        <!--required-->
                        <!--placeholder="И грянул гром..."-->
                <!--&gt;</b-form-textarea>-->
            <!--</b-form-group>-->

        <!--</b-form>-->
        <!--<b-card class="mt-3" header="Form Data Result">-->
            <!--<pre class="m-0">{{ formNotification }}</pre>-->
        <!--</b-card>-->
    <!--</div>-->
    </div>
</template>

<script>
    import GanttElastic from "gantt-elastic"
    import axios from 'axios';


    function getDate(hours) {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      const currentDay = currentDate.getDate();
      const timeStamp = new Date(currentYear, currentMonth, currentDay, 0, 0, 0).getTime();
      return new Date(timeStamp + hours * 60 * 60 * 1000).getTime();
    }

    let tasks = [];
    // let options = {};

    let options = {
      scope: {
        before: 0,
        after: 100
      },
      taskList: {
        columns: [{
            id: 2,
            label: 'Предмет',
            value: 'label',
            width: 200,
            expander: true,
            html: true,
            events: {
              click({ data, column }) {
                alert('Задание по предмету: ' + data.label + '\n Вот такое: ' + data.description);
              }
            },
          style: {

          }
          }, {
            id: 5,
            label: '%',
            value: 'progress',
            width: 35,
            style: {
              'task-list-header-label': {
                'text-align': 'center',
                width: '100%'
              },
              'task-list-item-value-container': {
                'text-align': 'center',
                width: '100%'
              }
            }
          }
        ]
      },
    };

    export default {

      components: {
        'gantt-elastic': GanttElastic
      },

        data() {
            return {
                tasks,
                options,
                dynamicStyle: {},
                formDl: {
                    name: null,
                    subject: null,
                    description: null,
                    dateTimeStart: new Date(),
                    dateTimeFinish: null
                },
                formDelete: {
                  uuidToDelete: null
                },

                formNotification: {
                    title: null,
                    description: null
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
              this.formDl.dateTimeFinish = this.formDl.dateTimeFinish + "T10:44:44.308Z"
              console.log("datetime: ", this.formDl.dateTimeFinish)

              axios.post("https://deadliner.herokuapp.com/deadlines/create", {
                name: this.formDl.name,
                description: this.formDl.description,
                dateTimeStart: new Date(),
                dateTimeFinish: this.formDl.dateTimeFinish,
                subject: this.formDl.subject
              }).then(res => {

                const t = res.data

                console.log("deadline created", res)
                console.log("event: ", evt)

                tasks.push({
                  uuid: res.id,
                  id: Math.round(Math.random() * 10000),
                  label: t.subject.substring(0, 4) + ": " + t.name,
                  user: '',
                  description: t.description,
                  start: getDate(0),
                  duration: new Date(t.dateTimeFinish).getTime() - new Date(t.dateTimeStart).getTime(),
                  progress: 10,
                  type: 'project'
                })


                })
                .catch(e => console.log("err deadline create", e))

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
        },
      created() {
        axios.get('https://deadliner.herokuapp.com/deadlines/list')
          .then(res => {
            let new_t = res.data.content.map((t, i) => ({
                uuid: t.uuid,
                id: i,
                label: t.subject.substring(0, 4) + ": " + t.name,
                user: '',
                description: t.description,
                start: getDate(0),
                duration: new Date(t.dateTimeFinish).getTime() - new Date(t.dateTimeStart).getTime(),
                progress: 100 * ((new Date(t.dateTimeFinish).getTime() - new Date(t.dateTimeStart).getTime()) / (new Date().getTime() - new Date(t.dateTimeStart).getTime())),
                type: 'project'
              })
            )

            console.log("UUID: ", new_t)

            for (let i = 0; i < new_t.length; ++i) {
              tasks.push(new_t[i])
            }

            tasks.sort(function (a, b) {
              if (a.start + a.duration > b.start + b.duration) return 1;
              if (b.start + b.duration > a.start + a.duration) return -1;
              return 0;
            });


            const len = tasks.length;
            for (let i = 0; i < len; ++i) {
              tasks[i].type = "milestone";
              tasks[i].progress = Math.floor(100 * (new Date().getTime() - getDate(0)) / tasks[i].duration );

              if (i > Math.floor(2 * (len / 3)) ) {
                tasks[i].style = {
                  base: {
                    fill: '#1EBC61',
                    stroke: '#0EAC51',
                  }
                }
              } else if (i > Math.floor(len / 3)) {
                tasks[i].style = {
                  base: {
                    fill: '#bcb25e',
                    stroke: '#ac8b52',
                  }
                }
              }
            }


          })
          .catch(e => {
            console.log("err: ", e)
          })

      }
    }
</script>