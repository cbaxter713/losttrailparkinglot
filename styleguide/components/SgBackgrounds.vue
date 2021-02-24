<template>
  <div class="grid">
    <theme theme="dark"><h3>.dark</h3></theme>
    <theme theme="dark" topo
      ><h3>.dark<br />.bg-topo</h3></theme
    >
    <theme theme="gray"><h3>.gray</h3></theme>
    <theme theme="gray" topo
      ><h3>.gray<br />.bg-topo</h3></theme
    >
    <theme theme="light-gray"><h3>.light-gray</h3></theme>
    <theme theme="light-gray" topo
      ><h3>.light-gray<br />.bg-topo</h3></theme
    >
    <theme theme="light"><h3>.light</h3></theme>
    <theme theme="light" topo
      ><h3>.light<br />.bg-topo</h3></theme
    >
    <theme theme="primary"><h3>.primary</h3></theme>
    <theme theme="primary" topo
      ><h3>.primary.<br />.bg-topo</h3></theme
    >
  </div>
</template>

<script>
import Theme from '../../components/patterns/Theme';
export default {
  name: 'Backgrounds',
  components: {Theme},
};
</script>

<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns: 50% 50%;
}

.theme {
  height: 40vw;
  padding: 5vw;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  h3 {
    margin: 0;
  }
}
</style>
<docs>
```jsx
<backgrounds></backgrounds>
```
</docs>
