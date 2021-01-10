<template>
  <div
    style="display:flex;background-color:white;padding:20px;border-radius:18px;align-items:center"
  >
    <img :src="user.picture.medium" />
    <div style="flex-grow:1;padding:0 20px;">
      <p style="font-weight:bold;line-height:0.8;font-size:14px">
        {{ `${user.name.first} ${user.name.last}` }}
      </p>
      <p style="color:#262A41;font-size:12px;font-style:italic;line-height:0.8">
        {{
          `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}`
        }}
      </p>
      <div style="line-height:0.8;display:flex;flex-wrap:wrap;">
        <div style="margin-right:1em">
          <i class="far fa-envelope" style="color:#BABDD1;font-size:12px"></i
          >&nbsp;
          <span style="color:#262A41;opacity:0.52;font-size:12px">{{
            user.email
          }}</span
          >
        </div>
        <div>
          <i class="fas fa-phone-alt" style="color:#BABDD1;font-size:12px"></i
          >
          <span style="color:#262A41;opacity:0.52;font-size:12px">{{
            user.phone
          }}</span>
        </div>
      </div>
    </div>
    <button
      style="margin-top:auto;background-color:#30bbb5;border:none;padding:8px 14px;border-radius:11px;box-shadow: 2px 13px 30px #30BBB574;"
    >
      <i class="fas fa-arrow-right" style="color:white;"></i>
    </button>
  </div>
</template>
<script>
export default {
  props: {
    user: Object,
  },
};
</script>
<style scoped>
img {
  border-radius: 50%;
  border: 5px solid #75d6d1;
  width: 60px;
  height: 60px;
  object-fit: cover;
}
</style>
