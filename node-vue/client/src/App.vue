<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
    import jwt_decode from "jwt-decode";
    export default {
        name:'app',
        created(){
            if (localStorage.eleToken) {
                const decode = jwt_decode(localStorage.eleToken);
                this.$store.dispatch("setIsAutnenticated", !this.isEmpty(decode));
                this.$store.dispatch("setUser", decode);
            }
        },
        methods: {
            isEmpty(value) {
                return (
                    value === undefined ||
                    value === null ||
                    (typeof value === "object" && Object.keys(value).length === 0) ||
                    (typeof value === "string" && value.trim().length === 0)
                );
            }
        }
    }
</script>
<style>
    *{
        margin: 0;
        padding: 0;
    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    #nav {
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }
</style>
