<template>
    <div class="calendar">
        <div class="calendar__header">
            <button @click="prevMonth"> Précedent </button>
            {{ currentMonth.format('MMMM')[0].toUpperCase() + currentMonth.format('MMMM').substring(1) }} - {{ currentMonth.year() }}
            <button @click="nextMonth"> Suivant </button>
        </div>
        <ul class="calendar__day-header">
            <li v-for="dayName in dayNames">
                {{ dayName }}
            </li>
        </ul>
        <transition :name="transitionName" mode="out-in">
            <ul class="calendar__day" v-if="currentDaysInMonth">
                <li v-for="dayInMonth in currentDaysInMonth" :class="{ 'calendar__day-inactive': !dayInMonth.current}">
                    <p class="calendar__day-number" :class="{ 'calendar__day-number-active': dayInMonth.currentDay }">{{ dayInMonth.day }}</p>
                </li>
            </ul>
        </transition>
    </div>
</template>

<script>
    import moment from 'moment'

    moment.locale('fr')

    export default {
        name: "App",
        data: () => {
            return {
                dayNames: [ 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche' ],
                currentMonth: moment(),
                currentDaysInMonth: null,
                transitionName: ''
            }
        },
        methods: {
            getDaysArray(year, month) {
                // Date courante
                let dateCourante = moment()

                // Mois courant et mois d'avant
                let currentDate = new Date(year, month)
                let beforeDate = new Date(year, month)

                let result = []

                beforeDate.setDate(beforeDate.getDate() - (currentDate.getDay() - 1))

                // Set 1 jours en moin sur le mois d'avant
                for (let i = currentDate.getDay(); i > 1; i--) {
                    let dayArray = {day: beforeDate.getDate(), name: this.dayNames[beforeDate.getDay() - 1], current: false}
                    result.push(dayArray)
                    beforeDate.setDate(beforeDate.getDate() + 1)
                }

                while (currentDate.getMonth() === month) {
                    let currentDay = false
                    if (currentDate.getDate() == dateCourante.date() && currentDate.getMonth() == dateCourante.month()) {
                        currentDay = true
                    }
                    let dayArray = {day: currentDate.getDate(), name: this.dayNames[currentDate.getDay()], current: true, currentDay: currentDay}
                    result.push(dayArray)
                    currentDate.setDate(currentDate.getDate() + 1)
                }

                console.log(result)

                return result
            },
            prevMonth() {
                this.transitionName = 'slide-left'
                this.currentDaysInMonth = null
                this.currentMonth.subtract(1, 'months')
                setTimeout(() => {
                    this.currentDaysInMonth = this.getDaysArray(this.currentMonth.year(), this.currentMonth.month())
                }, 200)
            },
            nextMonth() {
                this.transitionName = 'slide-right'
                this.currentDaysInMonth = null
                this.currentMonth.add(1, 'months')
                setTimeout(() => {
                    this.currentDaysInMonth = this.getDaysArray(this.currentMonth.year(), this.currentMonth.month())
                }, 200)
            }
        },
        mounted() {
            let date = moment()
            this.currentDaysInMonth = this.getDaysArray(date.year(), date.month())
        }
    }
</script>