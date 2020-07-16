<template>
  <div>
    <div v-if="parents.length > 0" v-on:click="onback">&#60;</div>
    <input
      type="checkbox"
      :indeterminate.prop="indeterminate"
      :checked="checked"
      v-on:click="onselect"
    />
    <ul v-if="currentNode.children && currentNode.children.length">
      <node
        v-bind:key="child.key"
        v-for="child in currentNode.children"
        :node="child"
        @onchange="onchange"
        @onclick="onclick"
      ></node>
    </ul>
    <code>
      <h3>values</h3>
      {{ values }}
      <h3>tree</h3>
      {{ root }}
    </code>
  </div>
</template>

<script>
import Node from "./Node";
import { indeterminate, checked, recursive } from "../utils/recursive-utils";

export default {
  components: {
    Node,
  },
  props: {
    root: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      currentNode: this.root,
      parents: [],
    };
  },
  computed: {
    checked() {
      return checked(this.currentNode);
    },
    indeterminate() {
      return indeterminate(this.currentNode);
    },
    keys() {
      const array = [];

      recursive(this.root, (node) => {
        if (node.checked) {
          array.push(node.key);
        }
      });

      this.$emit("onchange:keys", array);

      return array;
    },
    values() {
      const array = [];

      recursive(this.root, (node) => {
        if (node.checked) {
          array.push(node.value);
        }
      });

      this.$emit("onchange:values", array);

      return array;
    },
  },
  methods: {
    onback() {
      const node = this.parents.pop();
      this.currentNode = node;
    },
    onclick(node) {
      this.parents.push(this.currentNode);
      this.currentNode = node;
    },
    onchange({ value, node }) {
      recursive(node, (node) => {
        node.checked = value;
      });
    },
    onselect(event) {
      const value = event.target.checked;

      recursive(this.currentNode, (node) => {
        node.checked = value;
      });
    },
  },
};
</script>

<style>
ul {
  padding-left: 16px;
  margin: 6px 0;
  list-style: none;
}

code {
  white-space: pre-wrap;
}

.previous {
  cursor: pointer;
}
</style>
