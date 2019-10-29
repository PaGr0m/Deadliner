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
        </b-tabs>
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

  let tasks = [
    {
      id: 1001,
      label: 'Алго: дз4',
      user: '',
      start: getDate(0),
      duration: 3 * 24 * 60 * 60 * 1000,
      progress: 85,
      type: 'project',
      // collapsed: true,
    }, {
      id: 1002,
      label: 'Комб: числа Стирлинга',
      user: '',
      start: getDate(0),
      duration: 4 * 24 * 60 * 60 * 1000,
      progress: 50,
      type: 'milestone',
      collapsed: true,
      style: {
        base: {
          fill: '#1EBC61',
          stroke: '#0EAC51',
        }
      }
    }, {
      id: 1003,
      label: 'Py:дз 4. Декораторы',
      user: '',
      start: getDate(0),
      duration: 2 * 24 * 60 * 60 * 1000,
      progress: 28,
      type: 'task'
    }, {
      id: 1004,
      label: 'БД: дз 4. SQL запросы',
      user: '',
      start: getDate(0),
      duration: 2 * 24 * 60 * 60 * 1000,
      progress: 50,
      type: 'task'
      // dependentOn: [3, 2]
    }, {
      id: 1005,
      label: 'Алго: контест!',
      user: '',
      start: getDate(0),
      duration: 3.22 * 24 * 60 * 60 * 1000,
      progress: 85,
      type: 'project',
      // collapsed: true,
    }
  ];

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
              alert('description clicked!\n' + data.label + ' soo: ');
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
      // methods: {
      //     showM() {
      //         if (showModal) {
      //             showModal = false;
      //         } else {
      //             showModal = true;
      //         }
      //     }
      // },

    data() {
      return {
        tasks,
        options,
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
              label: t.name,
              user: '',
              description: t.description,
              start: new Date(t.dateTimeStart).getTime(),
              duration: new Date(t.dateTimeFinish).getTime() - new Date(t.dateTimeStart).getTime(),
              progress: 100 * ((new Date(t.dateTimeFinish).getTime() - new Date(t.dateTimeStart).getTime()) / (new Date().getTime() - new Date(t.dateTimeStart).getTime())),
              type: 'project'
            })
          )

          for (let i = 0; i < new_t.length; ++i) {
            tasks.push(new_t[i])
          }

          tasks.sort(function (a, b) {
            if (a.start + a.duration > b.start + b.duration) {
              return 1;
            }
            if (b.start + b.duration > a.start + a.duration) {
              return -1;
            }
            return 0;
          });


        })
        .catch(e => {
          console.log("err: ", e)
        })

    }

  }


</script>

<style scoped>

</style>