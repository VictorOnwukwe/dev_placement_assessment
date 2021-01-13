<template>
  <div style="margin-top:44px">
    <div class="transition" style="display:flex;" v-if="user">
      <img
        :src="user.picture.large"
        style="width:180px;height:180px;min-width:180px;min-height:180px;border-radius:50%;border:6px solid #75D6D1;object-fit:cover"
      />
      <div style="margin-left:28px">
        <h2 style="color:#262A41">
          {{
            `${user.name.title}. ${user.name.first} ${user.name.last}`
          }}&nbsp;<span style="font-weight:300">{{ user.dob.age }}</span>
        </h2>
        <p
          style="color:#262A41;font-weight:400;opacity:0.69;letter-spacing: -0.09px;"
        >
          {{
            `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}`
          }}
        </p>
        <button
          class="email"
          style="background-color:#E2E3EC;padding:9px 14px;border-radius:999px;border:none;align-items:center;display:block"
        >
          <div style="display:flex;align-items:center">
            <i
              class="far fa-envelope"
              style="font-size:16px;margin-right:8px;color:#BABDD1"
            ></i>
            <span
              style="font-size:14px;color:rgba(38, 42, 65,.52);letter-spacing: -0.09px;font-weight:600"
              >{{ user.email }}</span
            >
          </div>
        </button>
        <button
          style="background-color:#F7D9F2;font-size:12px;padding:9px 15px;border-radius:999px;color:rgba(38, 42, 65,.7);font-weight:700;margin-top:16px;display:block"
        >
          JOINED: {{ user.registered.date.slice(0, 10) }}
        </button>
        <p style="color:rgba(38, 42, 65,.52);font-size:14px;font-weight:500">
          <i
            class="fas fa-phone-alt"
            style="margin-right:8px;color:#BABDD1"
          ></i>
          <span>{{ user.cell }}</span>
        </p>
        <p style="color:rgba(38, 42, 65,.52);font-size:14px;font-weight:500">
          <i
            class="fas fa-mobile-alt"
            style="margin-right:8px;margin-left:4px;color:#BABDD1"
          ></i>
          <span>{{ user.phone }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: null,
    };
  },
  mounted() {
    this.user = this.$store.getters["users/allUsers"].find(
      (user) => user.email == this.$route.params.email
    );
  },
};
</script>
<style scoped>
.absolute {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 0;
}
</style>
