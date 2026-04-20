<template>
  <div class="flex w-full min-h-screen">
    <!-- 左侧列 (占2/5宽度) -->
    <div class="w-2/5 pr-2">  <!-- 修改：右边距从0增加到2（约8px），接近10px -->
      <!-- 统计功能 -->
      <div class="mb-8 w-full">
        <h2 class="text-xl font-bold text-gray-800 mb-4 text-left">统计功能</h2>
        <div class="space-y-3 border border-gray-200 rounded-lg p-4 bg-white w-full">
          <div class="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
            <span class="text-gray-700">总任务</span>
            <span class="text-2xl font-bold text-gray-800">{{ stats.total }}</span>
          </div>
          <div class="flex justify-between items-center p-3 bg-green-50 rounded-lg">
            <span class="text-gray-700">待完成</span>
            <span class="text-2xl font-bold text-gray-800">{{ stats.pending }}</span>
          </div>
          <div class="flex justify-between items-center p-3 bg-amber-50 rounded-lg">
            <span class="text-gray-700">已完成</span>
            <span class="text-2xl font-bold text-gray-800">{{ stats.completed }}</span>
          </div>
          <div class="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
            <span class="text-gray-700">完成率</span>
            <span class="text-2xl font-bold text-gray-800">{{ stats.completionRate }}%</span>
          </div>
        </div>
      </div>
      
      <!-- 分类筛选 -->
      <div class="w-full">
        <h2 class="text-xl font-bold text-gray-800 mb-4 text-left">分类筛选</h2>
        <div class="border border-gray-200 rounded-lg p-4 bg-white w-full">
          <div class="space-y-2">
            <button 
              v-for="category in ['全部任务', '工作', '学习', '生活', '旅游']" 
              :key="category"
              :class="[
                'w-full text-left px-4 py-2 rounded-lg transition-colors',
                { 'bg-blue-100 text-blue-600': activeCategory === category },
                { 'bg-gray-100 text-gray-700': activeCategory !== category }
              ]"
              @click="setActiveCategory(category)"
            >
              {{ category }}
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 右侧列 (占3/5 宽度) -->
    <div class="w-3/5 pl-2">  <!-- 修改：左边距从4减少到2，保持总间距增加10px -->
      <!-- 新增事项模块 -->
      <div class="bg-white rounded-xl shadow-sm p-5 mb-8">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold text-gray-800">新增事项</h3>
          <button 
            type="submit"
            form="addTodoForm"
            class="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity w-40"
          >
            添加待办事项
          </button>
        </div>
        <form id="addTodoForm" @submit.prevent="addNewTodo" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              v-model="newTodo.title"
              type="text" 
              placeholder="任务标题" 
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />
            <input 
              v-model="newTodo.description"
              type="text" 
              placeholder="描述" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select 
              v-model="newTodo.category"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            >
              <option value="" disabled>选择分类</option>
              <option value="work">工作</option>
              <option value="study">学习</option>
              <option value="life">生活</option>
              <option value="travel">旅游</option>
              <option value="other">其他</option>
            </select>
            
            <select 
              v-model="newTodo.priority"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            >
              <option value="" disabled>选择优先级</option>
              <option value="low">低优先级</option>
              <option value="medium">中优先级</option>
              <option value="high">高优先级</option>
            </select>
            
            <input 
              v-model="newTodo.dueDate"
              type="date" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />
          </div>
        </form>
      </div>
      
      <!-- 事项列表模块 -->
      <div class="bg-white rounded-xl shadow-sm overflow-hidden">
        <div class="flex justify-between items-center p-5 border-b">
          <h3 class="text-xl font-bold text-gray-800">事项列表</h3>
          <div class="relative">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="搜索任务..." 
              class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 w-64"
            />
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute right-3 top-2.5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
        <div class="p-5">
          <div v-if="filteredTodos.length === 0" class="text-gray-500 text-center py-8">
            {{ todos.length === 0 ? '暂无待办事项，请添加新的待办事项' : '没有符合条件的待办事项' }}
          </div>
          <ul v-else class="space-y-4">
            <TodoItem 
              v-for="todo in filteredTodos" 
              :key="todo.id"
              :todo="todo"
              @toggle-completed="toggleTodoCompleted"
              @remove="removeTodoById"
              @edit="handleEditTodo"
            />
          </ul>
        </div>
      </div>
    </div>
    
    <!-- 编辑对话框 -->
    <div 
      v-if="showEditDialog && editingTodo" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-bold text-gray-800 mb-4">编辑任务</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">任务标题</label>
            <input 
              v-model="editingTodo.title"
              type="text" 
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">描述</label>
            <input 
              v-model="editingTodo.description"
              type="text" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">分类</label>
            <select 
              v-model="editingTodo.category"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            >
              <option value="work">工作</option>
              <option value="study">学习</option>
              <option value="life">生活</option>
              <option value="travel">旅游</option>
              <option value="other">其他</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">优先级</label>
            <select 
              v-model="editingTodo.priority"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            >
              <option value="low">低优先级</option>
              <option value="medium">中优先级</option>
              <option value="high">高优先级</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">截止日期</label>
            <input 
              v-model="editingTodo.dueDate"
              type="date" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />
          </div>
        </div>
        <div class="flex justify-end space-x-3 mt-6">
          <button 
            @click="cancelEdit"
            class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            取消
          </button>
          <button 
            @click="updateTodo"
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            保存更改
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import TodoItem from '@/components/TodoItem.vue';
import { 
  addTodo, 
  removeTodo, 
  toggleComplete, 
  getStats, 
  getFilteredTodos,
  getAllTodos
} from '@/store/todoStore';
import { TodoItem as TodoItemType, Category, Priority, Status } from '@/types/todo';

// 响应式数据
const newTodo = ref({
  title: '',
  description: '',
  category: '' as Category,
  priority: '' as Priority,
  dueDate: ''
});

const activeCategory = ref('全部任务');
const activePriority = ref('');
const activeStatus = ref('');
const searchQuery = ref('');

// 计算属性 - 添加错误处理
const stats = computed(() => {
  try {
    return getStats.value;
  } catch (error) {
    console.error("Error in stats computed:", error);
    return { total: 0, completed: 0, pending: 0, completionRate: 0 };
  }
});

const todos = computed(() => {
  try {
    return getAllTodos.value;
  } catch (error) {
    console.error("Error in todos computed:", error);
    return [];
  }
});

const filteredTodos = computed(() => {
  try {
    let category: Category = 'all';
    switch(activeCategory.value) {
      case '工作': category = 'work'; break;
      case '学习': category = 'study'; break;
      case '生活': category = 'life'; break;
      case '旅游': category = 'travel'; break;
      default: category = 'all';
    }
    
    return getFilteredTodos(
      category,
      activePriority.value as Priority || 'all',
      activeStatus.value as Status || 'all',
      searchQuery.value
    );
  } catch (error) {
    console.error("Error in filteredTodos computed:", error);
    return [];
  }
});

// 方法
const setActiveCategory = (category: string) => {
  activeCategory.value = category;
};

const addNewTodo = () => {
  console.log("添加待办事项被触发", newTodo.value); // 添加调试信息
  
  if (!newTodo.value.title.trim()) {
    console.log("标题为空，不执行添加操作");
    return;
  }

  try {
    console.log("准备添加待办事项", newTodo.value);
    // 确保 category 不是 'all'，因为 TodoItem 的 category 不包含 'all'
    const actualCategory = newTodo.value.category === 'all' ? 'other' : newTodo.value.category;
    addTodo({
      title: newTodo.value.title,
      description: newTodo.value.description,
      category: actualCategory || 'other',
      priority: newTodo.value.priority as Priority || 'medium',
      dueDate: newTodo.value.dueDate || undefined
    });
    
    console.log("待办事项已添加，重置表单");
    // 重置表单
    newTodo.value = {
      title: '',
      description: '',
      category: 'other',
      priority: 'medium',
      dueDate: ''
    };
    
    console.log("表单已重置");
  } catch (error) {
    console.error("Error adding todo:", error);
  }
};

const removeTodoById = (id: string) => {
  try {
    console.log("准备删除待办事项", id);
    removeTodo(id);
  } catch (error) {
    console.error("Error removing todo:", error);
  }
};

const toggleTodoCompleted = (id: string) => {
  try {
    console.log("切换完成状态", id);
    toggleComplete(id);
  } catch (error) {
    console.error("Error toggling todo:", error);
  }
};

const handleEditTodo = (todo: TodoItemType) => {
  // 打开编辑对话框并预填充当前任务数据
  editingTodo.value = { ...todo };
  showEditDialog.value = true;
};

// 在组件挂载时输出初始状态
onMounted(() => {
  console.log("HomeView mounted, initial todos count:", todos.value.length);
  console.log("Initial stats:", stats.value);
});

// 编辑相关状态
const editingTodo = ref<TodoItemType | null>(null);
const showEditDialog = ref(false);

// 更新任务
const updateTodo = () => {
  if (!editingTodo.value || !editingTodo.value.title.trim()) {
    return;
  }
  
  try {
    // 这里需要实现更新逻辑，但store中可能没有updateTodo方法
    // 我们可以通过先删除再添加的方式来模拟更新
    const updatedTodo = { ...editingTodo.value };
    removeTodo(updatedTodo.id);
    addTodo(updatedTodo);
    
    // 关闭对话框
    showEditDialog.value = false;
    editingTodo.value = null;
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};

// 取消编辑
const cancelEdit = () => {
  showEditDialog.value = false;
  editingTodo.value = null;
};
</script>