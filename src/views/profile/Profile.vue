<template>
  <div class="profile">
    <profile-nav-bar/>
    <login/>
    <money/>
    <profile-list/>
  </div>
</template>

<script>
  import ProfileNavBar from "./children/ProfileNavBar";
  import Login from "./children/Login";
  import Money from "./children/Money";
  import ProfileList from "./children/ProfileList";
  export default {
    name: "Profile",
    components:{
      ProfileNavBar,
      Login,
      Money,
      ProfileList
    }
  }
</script>

<style lang="scss" scoped>
.profile{
  width: 100%;
  height: 100%;
}
</style>
