<script setup lang="ts">
import { onHide, onLaunch, onShow } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style lang="scss">
@import "uview-plus/index.scss";
page {
  background-color: rgb(237, 222, 205) !important;
  width: 100vw;
  height: 100vh;
}
</style>
