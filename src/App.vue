<template>
    <div>
        <div class="title">
            Calendrier
        </div>
        <transition name="slide-fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "App"
    }
</script>