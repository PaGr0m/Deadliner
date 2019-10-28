<template class="">
    <div>
        <b-navbar toggleable="lg" type="dark" variant="danger">
            <a class="navbar-brand" href="#">
                <img src="../../public/images/logo.png" alt="" height="70px" width="70px">
            </a>
            <b-navbar-brand href="#">DeadLiner</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item href="#">Текущие дэдлайны</b-nav-item>
                    <b-nav-item href="#">Контакты преподавателей</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
    export default {
        name: "Navbar.vue"
    }
</script>

<style scoped>

</style>