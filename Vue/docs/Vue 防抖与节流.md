---
tags:
  - Vue-review
---

## Vue 防抖与节流技术详解
> **标签** #vue #性能优化 #防抖 #节流 #交互设计

### 一、核心概念对比
| 特性        | 防抖 (Debounce)                  | 节流 (Throttle)                 |
|-------------|----------------------------------|--------------------------------|
| **原理**     | 延迟执行直到停止操作             | 固定间隔执行一次操作           |
| **适用场景** | 搜索建议输入、窗口 resize 结束   | 滚动事件、高频按钮点击         |
| **执行时机** | 最后一次操作后等待指定时间       | 操作过程中按固定频率执行       |
| **可视化**   | ![[防抖原理.png]]              | ![[节流原理.png]]            |

### 二、完整原生实现
#### 1. 防抖函数实现
```javascript
function debounce(fn, delay = 300) {
  let timer = null;
  
  return function (...args) {
    // 清除上一个定时器
    if (timer) clearTimeout(timer);
    
    // 设置新定时器
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
```

#### 2. 节流函数实现
```javascript
function throttle(fn, interval = 500) {
  let lastTime = 0;
  let timer = null;
  
  return function (...args) {
    const now = Date.now();
    
    // 清除上一次的定时器（尾调用）
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    
    // 时间间隔检测
    if (now - lastTime >= interval) {
      fn.apply(this, args);
      lastTime = now;
    } else {
      // 保证最后一次操作被执行
      timer = setTimeout(() => {
        fn.apply(this, args);
        lastTime = Date.now();
      }, interval);
    }
  };
}
```

### 三、Vue 组件实战示例
#### 场景1：搜索框防抖
```vue
<script setup>
import { ref } from 'vue';

const searchQuery = ref('');
const searchResults = ref([]);

const fetchSearchResults = debounce(async (query) => {
  if (!query.trim()) return;
  
  try {
    const response = await fetch(`/api/search?q=${query}`);
    searchResults.value = await response.json();
  } catch (error) {
    console.error('搜索失败', error);
  }
}, 500);

const handleInput = () => {
  fetchSearchResults(searchQuery.value);
};
</script>

<template>
  <input 
    v-model="searchQuery" 
    @input="handleInput"
    placeholder="输入关键词搜索..."
  />
  
  <ul v-if="searchResults.length">
    <li v-for="result in searchResults" :key="result.id">
      {{ result.title }}
    </li>
  </ul>
</template>
```

#### 场景2：滚动加载节流
```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const items = ref([]);
const isLoading = ref(false);
const page = ref(1);

const handleScroll = throttle(() => {
  const scrollTop = document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const fullHeight = document.documentElement.scrollHeight;
  
  // 距离底部200px时加载
  if (scrollTop + windowHeight >= fullHeight - 200) {
    loadMore();
  }
}, 1000);

async function loadMore() {
  if (isLoading.value) return;
  
  try {
    isLoading.value = true;
    const response = await fetch(`/api/items?page=${page.value}`);
    const newItems = await response.json();
    
    items.value = [...items.value, ...newItems];
    page.value++;
  } catch (error) {
    console.error('加载失败', error);
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  loadMore();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
```

### 四、高级优化技巧
#### 1. 组合式函数封装
```javascript
// composables/useDebounce.js
import { onUnmounted } from 'vue';

export function useDebounce(fn, delay) {
  let timer = null;
  
  const debounced = (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
  
  onUnmounted(() => clearTimeout(timer));
  return debounced;
}

// composables/useThrottle.js
import { onUnmounted } from 'vue';

export function useThrottle(fn, interval) {
  let lastTime = 0;
  let timer = null;
  
  const throttled = (...args) => {
    const now = Date.now();
    
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    
    if (now - lastTime >= interval) {
      fn(...args);
      lastTime = now;
    } else {
      timer = setTimeout(() => {
        fn(...args);
        lastTime = Date.now();
      }, interval);
    }
  };
  
  onUnmounted(() => {
    if (timer) clearTimeout(timer);
  });
  
  return throttled;
}
```

#### 2. 可取消的防抖/节流
```javascript
const debouncedSearch = useDebounce(search, 500);
const throttledScroll = useThrottle(handleScroll, 1000);

// 在需要时提前执行
function forceSearch() {
  debouncedSearch.cancel(); // 实现中需添加cancel方法
  search();
}
```

### 五、不同场景应用建议
| 场景类型           | 推荐技术 | 时间间隔 | 说明                     |
|--------------------|----------|----------|--------------------------|
| 搜索建议           | 防抖     | 300-500ms| 用户停止输入后触发搜索   |
| 无限滚动加载       | 节流     | 800-1000ms| 避免滚动事件频繁触发     |
| 按钮防重复点击     | 节流     | 1000ms   | 防止用户快速重复提交     |
| 窗口 resize 监听   | 防抖     | 200ms    | 窗口调整结束后计算布局   |
| 鼠标移动跟踪       | 节流     | 100ms    | 平衡精度与性能           |

### 六、性能分析与注意事项
1. **内存泄漏预防**
   ```javascript
   onUnmounted(() => {
     // 清除所有定时器
     window.removeEventListener('resize', resizeHandler);
     if (scrollTimer) clearTimeout(scrollTimer);
   });
   ```

2. **响应式依赖处理**
   - 避免在防抖/节流函数内直接修改响应式变量
   - 使用 `toRaw` 访问原始值减少触发依赖跟踪

3. **移动端适配**
   - 触摸事件使用 `passive: true` 提升滚动性能
   ```javascript
   window.addEventListener('touchmove', handler, { passive: true });
   ```

4. **服务端渲染(SSR)方案**
   ```javascript
   import { isClient } from '@vueuse/core';
   
   if (isClient) {
     window.addEventListener('scroll', throttledHandler);
   }
   ```

> **最佳实践总结**：
> 1. 超过50ms的操作考虑优化
> 2. 高频事件必用节流/防抖
> 3. 组合式函数封装提升复用性
> 4. 添加取消机制增强控制

### 七、扩展学习资源
1. [VueUse 的 useDebounceFn 源码解析](https://github.com/vueuse/vueuse/blob/main/packages/core/useDebounceFn/index.ts)
2. [Lodash 防抖节流实现原理](https://lodash.com/docs/4.17.15#debounce)
3. [Chrome DevTools 性能分析指南](https://developers.google.com/web/tools/chrome-devtools/rendering-tools)
4. [Web 性能优化：防抖与节流的科学应用](https://web.dev/rendering-performance/)

### 应用建议
1. 将 `useDebounce` 和 `useThrottle` 放入项目 `/composables` 目录
2. 复杂项目建议使用 VueUse 的 [useDebounceFn](https://vueuse.org/core/usedebouncefn/)
3. 在性能关键路径使用 Chrome Performance 工具验证效果
4. 表单提交场景可结合 `v-throttle` 自定义指令使用