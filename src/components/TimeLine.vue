<template>

    <gantt-elastic :tasks="tasks" :options="options" :dynamic-style="dynamicStyle">
        <gantt-header slot="header" :options="headerOptions" :dynamic-style="headerStyle"></gantt-header>
    </gantt-elastic>

</template>

<script>
  import GanttElastic from "gantt-elastic"
  import GantHeader from "gantt-elastic-header"


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
      id: 1,
      label: 'Алгоритмы',
      user: '',
      start: getDate(24),
      duration: 15 * 24 * 60 * 60 * 1000,
      progress: 85,
      type: 'project',
      // collapsed: true,
    },
    {
      id: 2,
      label: 'Дискретная математика',
      user:
        '<a href="https://www.google.com/search?q=Peter+Parker" target="_blank" style="color:#0077c0;">Peter Parker</a>',
      start: getDate(24),
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
    },
    {
      id: 3,
      label: 'Python',
      user: '',
      start: getDate(0),
      duration: 2 * 24 * 60 * 60 * 1000,
      progress: 70,
      type: 'task'
    },
    {
      id: 4,
      label: 'Базы данных',
      user: '',
      start: getDate((24 * 2) - 5),
      duration: 2 * 24 * 60 * 60 * 1000,
      progress: 50,
      type: 'task'
      // dependentOn: [3, 2]
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
              alert('description clicked!\n' + data.label + ' soo ' + column);
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


  function prepareStyle(userStyle) {
    let fontSize = '20px';
    let fontFamily = window
      .getComputedStyle(document.body)
      .getPropertyValue('font-family')
      .toString();
    if (typeof userStyle !== 'undefined') {
      if (typeof userStyle.fontSize !== 'undefined') {
        fontSize = userStyle.fontSize;
      }
      if (typeof userStyle.fontFamily !== 'undefined') {
        fontFamily = userStyle.fontFamily;
      }
    }
    return getStyle(fontSize, fontFamily);
  }


  export default {
      components: {
        'gantt-elastic': GanttElastic,
        'gantt-header': GantHeader
      },
    data() {
      return {
        tasks,
        options,
        dynamicStyle: {
          'task-list-header-label': {
            'font-weight': 'bold',
            'font-size': '17px'
          }
        },
        headerOptions,
        headerStyle: {

        }
      }
    },

  }




</script>

<style scoped>

</style>