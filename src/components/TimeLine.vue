<template>

    <div>
        <b-tabs content-class="mt-3">
            <b-tab title="Подробно" active>
                  <div class="container">
                      <gantt-elastic :tasks="tasks" :options="options" :dynamic-style="dynamicStyle">
                          <gantt-header slot="header" :options="headerOptions" :dynamic-style="headerStyle"></gantt-header>
                      </gantt-elastic>
                  </div>
            </b-tab>
            <b-tab title="Кратко">
                <div class="container">
                    <ProgressBar />
                </div>
            </b-tab>
            <b-tab title="Сводка">
                <div class="container">
                    <p>У вас накопилось {{tasks.length}} дэдлайнов!</p>
                    <img v-if="tasks.length == 0" class="rounded" src="../assets/DL-0.png" height="250px" width="250px">
                    <img v-if="tasks.length == 1" class="rounded" src="../assets/DL-1.png" height="250px" width="250px">
                    <img v-if="tasks.length == 2" class="rounded" src="../assets/DL-2.png" height="250px" width="250px">
                    <img v-if="tasks.length == 3" class="rounded" src="../assets/DL-3.png" height="250px" width="250px">
                    <img v-if="tasks.length == 4" class="rounded" src="../assets/DL-4.png" height="250px" width="250px">
                    <img v-if="tasks.length == 5" class="rounded" src="../assets/DL-5.png" height="250px" width="250px">
                    <img v-if="tasks.length == 6" class="rounded" src="../assets/DL-6.png" height="250px" width="250px">
                    <img v-if="tasks.length > 6" class="rounded" src="../assets/DL-7.png" height="250px" width="250px">
                    <blockquote class="blockquote blockquote-custom bg-white p-5 shadow rounded mt-5">
                        <p class="mb-0 mt-2 font-italic">{{ quote.text }}</p>
                        <footer class="blockquote-footer pt-4 mt-4 border-top">
                            {{ quote.author }}
                        </footer>
                    </blockquote>

                </div>
            </b-tab>
        </b-tabs>

        <div style="height: 100px; width: 100px;"></div>

    </div>

</template>

<script>
  import GanttElastic from "gantt-elastic"

  // import GantHeader from "gantt-elastic-header"
  import GantHeader from "../components/Header"
  import ProgressBar from "./ProgressBar";
  import axios from 'axios';

  function getDate(hours) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    const timeStamp = new Date(currentYear, currentMonth, currentDay, 0, 0, 0).getTime();
    return new Date(timeStamp + hours * 60 * 60 * 1000).getTime();
  }

  const headerOptions = {
    title: {
      label: '',
      html: true
    },
    locale: {
      'X-Scale': 'Масштаб',
      'Y-Scale': 'Ширина',
      Now: 'Сейчас',
      'Display task list': 'Предметы'
    }
  };

  let tasks = [ ];

  let options = {
    maxRows: 1000,
    maxHeight: 10000,
    title: {
      label: '',
      html: false
    },
    row: {
      height: 24
    },
    calendar: {
      hour: {
        display: true
      }
    },
    scope: {
      before: 0,
      after: 100
    },
    chart: {
      progress: {
        bar: false
      },
      expander: {
        display: false
      }
    },
    taskList: {
      expander: {
        straight: true
      },
      columns: [
        {
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
          }
        },
        {
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

  let quotes = [
      {
          author: 'Пауло Коэльо',
          text: 'Дойдя до конца, люди смеются над страхами, мучившими их вначале...'
      },
      {
          author: 'Оноре де Бальзак',
          text: 'Чтобы дойти до цели, надо идти...'
      },
      {
          author: 'Александр Чернокоз',
          text: 'Не забивай, делай алгосы'
      },
      {
          author: 'Джейсон Стетхем',
          text: 'В любом процессе важна не скорость, а удовольствие'
      }
  ];

  tasks.sort(function (a, b) {
    if (a.start + a.duration > b.start + b.duration) {
      return 1;
    }
    if (b.start + b.duration > a.start + a.duration) {
      return -1;
    }
    return 0;
  });


  export default {
      components: {
        'gantt-elastic': GanttElastic,
        'gantt-header': GantHeader,
          'ProgressBar': ProgressBar
      },

    data() {
      return {
        tasks,
        options,
          quotes,
          quote: quotes[Math.floor(Math.random()*quotes.length)],
        dynamicStyle: {
          'task-list-header-label': {
            'font-weight': 'bold',
            'font-size': '17px',
            '.grid-line-time': '{ display: none }'
          }
        },
        headerOptions,
        headerStyle: {

        }
      }
    },
    created() {
      axios.get('https://deadliner.herokuapp.com/deadlines/list')
        .then(res => {
          let new_t = res.data.content.map((t, i) => ({
              id: i,
              label: t.subject.substring(0, 4) + ": " + t.name,
              user: '',
              description: t.description,
              start: getDate(0),
                // new Date(t.dateTimeStart).getTime(),
              duration: new Date(t.dateTimeFinish).getTime() - new Date(t.dateTimeStart).getTime(),
              progress: 100 * ((new Date(t.dateTimeFinish).getTime() - new Date(t.dateTimeStart).getTime()) / (new Date().getTime() - new Date(t.dateTimeStart).getTime())),
              type: 'project'
            })
          )

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

<style scoped>
    .blockquote-custom {
        position: relative;
        font-size: 1.1rem;
        max-width: 500px;
        margin-left: auto;
        margin-right: auto;
    }

    .blockquote-custom-icon {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: -25px;
        left: 50px;
    }
</style>