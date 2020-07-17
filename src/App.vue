<template>
  <div id="app">
    <Tree :root="root"></Tree>
  </div>
</template>

<script>
import data from "./data.json";
import keywords from "./keywords.json";
import Tree from "./components/Tree";
import { TreeParser } from "./models/tree-parser";
import { keywordTree } from "./utils/keywords-utils";

export default {
  name: "app",
  components: {
    Tree,
  },
  data() {
    const treeParser = new TreeParser();
    const model = keywordTree(keywords);

    return {
      root: treeParser.parse(model),
    };
  },
};
</script>

<style lang="scss" scoped>
li {
  list-style: none;
}
</style>
