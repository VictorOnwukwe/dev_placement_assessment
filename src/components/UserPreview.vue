<template>
  <div
    style="display:flex;background-color:#FCFCFF;padding:26px 20px;border-radius:18px;align-items:center;flex-wrap:wrap"
    v-if="user"
  >
    <img :src="user.picture.medium" style="margin:0 auto" />
    <div style="flex-grow:1;padding:0 20px;">
      <p
        style="font-weight:bold;line-height:1.1;font-size:14px;color:#262A41;margin-top:0"
      >
        {{ `${user.name.first} ${user.name.last}` }}
      </p>
      <p
        style="color:#262A41;font-size:12px;font-style:italic;line-height:1.1;font-weight:600;opacity:0.69"
        class="location"
      >
        {{
          `${user.location.street.number} ${user.location.street.name}, ${
            user.location.city
          }, ${user.location.state}${
            showCountry ? ", " + user.location.country : ""
          }`
        }}
      </p>
      <div style="line-height:1.1;display:flex;flex-wrap:wrap;">
        <div style="margin-right:16px">
          <i
            class="far fa-envelope"
            style="color:#BABDD1;font-size:15px;position:relative;top:2px"
          ></i
          >&nbsp;
          <span style="color:#262A41;opacity:0.52;font-size:13px;">{{
            user.email
          }}</span>
        </div>
        <div>
          <i class="fas fa-phone-alt" style="color:#BABDD1;font-size:12px"></i
          >&nbsp;
          <span
            style="color:#262A41;opacity:0.52;font-size:12px;font-weight:600"
            >{{ user.phone }}</span
          >
        </div>
      </div>
    </div>
    <router-link
      :to="`/users/${user.email}`"
      style="margin-top:auto;margin-bottom:-8px;margin-left:auto"
    >
      <button
        class="route-button"
        style="background-color:#30bbb5;border:none;padding:8px 14px;border-radius:11px;box-shadow: 2px 10px 30px #30BBB574;cursor:pointer"
      >
        <i class="fas fa-arrow-right" style="color:white;"></i></button
    ></router-link>
  </div>
</template>
<script>
export default {
  props: {
    user: Object,
  },
  computed: {
    showCountry() {
      return this.$store.getters["showCountry"];
    },
  },
};
</script>
<style scoped>
img {
  border-radius: 50%;
  border: 5px solid #75d6d1;
  width: 65px;
  height: 65px;
  object-fit: cover;
}
</style>
