<template>
  <div class="container">
    <p>{{message}}</p>
    <div class="pics">
      <div class="img">
        <img src="../static/images/1.gif"
             alt="">
      </div>
      <div class="imgs">
      </div>
    </div>
    <Hello></Hello>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Hello from "@/components/hello";

@Component({
  components: {
   Hello
  }
})
export default class App extends Vue {
  message = "hello Vue!!!";

  mounted() {
    this.update();
  }

  update() {
    setTimeout(() => {
      console.log("test");
    }, 1e3);
  }
}
</script>
<style lang="less">
.container {
  background: pink;
  .imgs {
    width: 100px;
    height: 100px;
    background: url("../static/images/1.gif");
  }
}
</style>