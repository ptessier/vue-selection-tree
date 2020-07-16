<template>
  <li class="node-tree">
    <input
      type="checkbox"
      :indeterminate.prop="indeterminate"
      :checked="checked"
      v-on:change="onchange"
    />
    <span> {{ node.value }}</span>
    <span v-if="node.children && node.children.length" v-on:click="onclick">
      &#62;
    </span>
  </li>
</template>

<script>
import { Node } from "../models/tree-parser";
import {
  recursiveEvery,
  recursiveSome,
  indeterminate,
  checked,
} from "../utils/recursive-utils";

export default {
  name: "node",
  props: {
    node: Node,
  },
  computed: {
    checked() {
      return checked(this.node);
    },
    indeterminate() {
      return indeterminate(this.node);
    },
  },
  methods: {
    onclick() {
      const node = this.node;

      this.$emit("onclick", node);
    },
    onchange(event) {
      const value = event.target.checked;

      this.$emit("onchange", { value, node: this.node });
    },
  },
};
</script>
