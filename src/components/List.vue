<template>
  <div class="list">
    <draggable
      :value="category"
      class="types"
      draggable=".type"
      handle=".type-handle"
      @input="handleMove"
    >
      <div
        v-for="({list, type, meta, collapsed}, i) in category"
        :key="type"
        class="type"
      >

        <div class="title">
          <span class="type-handle">=</span>
          <label
            :class="{collapsed}"
            class="collapse"
          >
            -
            <input
              type="checkbox"
              v-model="category[i].collapsed"
              style="display: none"
            >
          </label>
          <input
            :disabled="loading"
            v-model.lazy="category[i].type"
            class="text"
          >
          <label
              class="multiprice"
          >
            <input
              v-model="meta.multiprice"
              :disabled="loading"
              type="checkbox"
            >
            multiprice
          </label>
        </div>

        <draggable
          v-if="!collapsed"
          v-model="category[type]"
          class="items"
          draggable=".item"
          handle=".handle"
        >
          <div
            style="margin: 10px"
          >
            <textarea
              v-model="meta.description"
              :disabled="loading"
              cols="80"
              rows="3"
              style="margin: auto; display: block;max-width:90vw"
            />
          </div>

          <div
            v-for="(item, index) in list"
            :key="index"
            class="item"
          >
            <div class="line">
              <span class="handle">=</span>
              <input v-model="item.name" :disabled="loading">
              <input
                v-if="item.multiprice || meta.multiprice"
                v-model="item.price"
                :disabled="loading"
                style="max-width: 145px"
              >
              <span
                v-else
                class="price"
              >
                  <input
                    v-model.number="item.price"
                    :disabled="loading"
                    step="0.5"
                    style="width: 50px"
                    type="number"
                  >
                </span>
            </div>
            <div class="line">
              <textarea
                v-model="item.ingredients"
                :disabled="loading"
                cols="80"
                rows="3"
              />
            </div>
            <div class="line">
              <label>
                <span>hidden:</span>
                <select
                  v-model="item.hidden"
                  :disabled="loading"
                  style="text-align: right"
                >
                  <option
                    v-for="(k, v) in {
                    no: false,
                    yes: true,
                    season: 'season',
                    stock: 'stock'
                  }"
                    :key="k"
                    :value="k"
                  >{{ v }}
                  </option>
                </select>
              </label>
              <label
                v-if="!meta.multiprice"
                style="margin-left: 5px"
              >
                <input
                  v-model="item.multiprice"
                  :disabled="loading"
                  type="checkbox"
                >
                <span>multiprice</span>
              </label>
              <input
                :disabled="loading"
                type="button"
                value="delete"
                @click="remove(type, index)"
              >
            </div>
          </div>
          <div class="add">
            <input
              :disabled="loading"
              type="button"
              value="Add"
              @click="addItem(type)"
            >
          </div>
        </draggable>
      </div>
    </draggable>
    <div
      v-if="category"
      class="add new"
    >
      <input
        :disabled="loading"
        type="button"
        value="New"
        @click="addType"
      >
    </div>
  </div>
</template>
<script>
import Draggable from 'vuedraggable'

export default {
  name: 'List',
  components: { Draggable },
  props: {
    category: Array,
    loading: Boolean
  },
  methods: {
    addItem (type) {
      this.$emit('add', type)
    },
    remove (type, index) {
      this.$emit('remove', type, index)
    },
    addType () {
      this.$emit('new')
    },
    handleMove (order) {
      this.$emit('move', order)
    }
  }
}
</script>
<style scoped lang="scss">
@import "../style/input";

.type {
  margin-block-end: 10px;
  background-color: #222;
  padding: 3px;
}

.title {
  display: flex;

  .type-handle {
    width: min-content;
    flex: 0 0 auto;
  }

  .text {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    flex: 1 1 auto;
    max-width: 50vw;
  }

  .multiprice {
    margin-left: auto;
  }
}

%item {
  margin: 15px auto;
  width: min-content;
  padding: 10px;
}

.list {
  width: min-content;
  margin: auto;

  .item {
    @extend %item;
  }
}

.items {
  width: min-content;
  margin: auto;

  .item {
    @extend %item;
    background-color: #333;

    .line {
      display: flex;
      margin-bottom: 10px;

      > input:last-child {
        margin-left: auto;
      }

      .price {
        margin-left: auto;
        display: flex;

        &::after {
          content: '€';
          font-weight: bold;
          margin-left: 10px;
          align-self: center;
        }
      }

      textarea {
        max-width: 90vw;
      }
    }
  }
}

.add {
  @extend %item;
  width: 80ch;
  max-width: 85vw;
  background-color: #333333;

  &.new {
    width: 85ch;
    max-width: calc(90vw + 20px);
  }

  input {
    display: block;
    margin: 0 auto;
  }
}

label {
  display: flex;
  align-items: center;

  span {
    margin: 5px;
  }
}

%handle, .collapse {
  font-size: x-large;
  font-weight: bold;
  margin-right: 15px;
  background-color: #4d4d4d;
  padding: 0 10px;
  user-select: none;
  border: 1px transparent solid;

  &.collapsed {
    border: 1px wheat solid;
  }
}

.handle, .type-handle{
  @extend %handle;
  cursor: move;
}
</style>
