<template>
  <div id="app">
    <Tree :root="root"></Tree>
  </div>
</template>

<script>
import data from "./data.json";
import Tree from "./components/Tree";
import { TreeParser } from "./models/tree-parser";

export default {
  name: "app",
  components: {
    Tree,
  },
  data() {
    const treeParser = new TreeParser();

    return {
      root: treeParser.parse(data),
    };
  },
};
</script>

<style lang="scss" scoped>
li {
  list-style: none;
}
</style>
