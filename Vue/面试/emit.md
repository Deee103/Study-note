---
sr-due: 2025-06-25
sr-interval: 2
sr-ease: 230
---

#review 

在 Vue 中，`emit` 是 **同步** 的，而不是异步的。

### **1. `emit` 是同步的**
- 当子组件触发 `emit` 时，父组件的监听回调会 **立即执行**，不会进入异步队列（如 `Promise`、`setTimeout` 等）。
- 这意味着 `emits` 的执行顺序是 **可预测的**，不会像 `$nextTick` 或 `Promise` 那样延迟执行。

**示例：同步执行**
```vue
<!-- 子组件 Child.vue -->
<template>
  <button @click="handleClick">Click Me</button>
</template>

<script setup>
const emit = defineEmits(['update']);

function handleClick() {
  emit('update', 'new value'); // 同步触发
  console.log('Emitted'); // 会立即执行
}
</script>

<!-- 父组件 Parent.vue -->
<template>
  <Child @update="onUpdate" />
</template>

<script setup>
function onUpdate(value) {
  console.log('Received:', value); // 会立即执行
}
</script>
```
**输出顺序：**
1. `Emitted`
2. `Received: new value`

---

### **2. `emit` 的用途**
`emits` 主要用于 **子组件向父组件通信**，常见场景包括：

#### **① 触发父组件的事件回调**
- 子组件通过 `emit` 通知父组件某些事件发生了（如按钮点击、表单提交等）。
- 父组件可以监听这些事件并执行相应的逻辑。

#### **② 实现“双向绑定”模式（类似 `v-model`）**
- 结合 `props` 和 `emits`，可以实现类似 `v-model` 的双向绑定。
- 示例：
  ```vue
  <!-- 子组件 CustomInput.vue -->
  <template>
    <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
  </template>

  <script setup>
  defineProps(['modelValue']);
  defineEmits(['update:modelValue']);
  </script>

  <!-- 父组件 -->
  <template>
    <CustomInput v-model="text" />
  </template>
  ```

#### **③ 替代 `$emit`（在 `<script setup>` 中更规范）**
- 在 Vue 3 的 `<script setup>` 语法中，`defineEmits` 是更规范的写法，比 `this.$emit` 更清晰。

#### **④ 类型检查（TypeScript 支持）**
- 使用 `defineEmits` 可以明确指定事件名和参数类型，提高代码可维护性。
  ```ts
  const emit = defineEmits<{
    (e: 'update', value: string): void;
    (e: 'submit'): void;
  }>();
  ```

---

### **总结**
| 特性 | 说明 |
|------|------|
| **同步/异步** | `emits` 是同步的，回调立即执行 |
| **主要用途** | 子组件向父组件通信、实现 `v-model`、替代 `this.$emit` |
| **推荐写法** | Vue 3 使用 `defineEmits`，支持 TypeScript 类型检查 |

如果需要在 `emits` 之后执行异步操作（如等待 DOM 更新），可以结合 `nextTick` 使用：
```js
emit('update');
await nextTick(); // 等待 DOM 更新
console.log('DOM updated!');
```