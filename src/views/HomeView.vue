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
              <option value="low">低级</option>
              <option value="medium">中级</option>
              <option value="high">高级</option>
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
        <h3 class="text-xl font-bold text-gray-800 p-5 border-b">事项列表</h3>
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
    addTodo({
      title: newTodo.value.title,
      description: newTodo.value.description,
      category: newTodo.value.category as Category || 'other',
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
  // 这里可以打开编辑对话框或跳转到编辑页面
  console.log('Edit todo:', todo);
};

// 在组件挂载时输出初始状态
onMounted(() => {
  console.log("HomeView mounted, initial todos count:", todos.value.length);
  console.log("Initial stats:", stats.value);
});

const getCategoryText = (category: Category) => {
  switch(category) {
    case 'work': return '工作';
    case 'study': return '学习';
    case 'life': return '生活';
    case 'travel': return '旅游';
    case 'other': return '其他';
    default: return category;
  }
};

const getPriorityText = (priority: Priority) => {
  switch(priority) {
    case 'low': return '低优先级';
    case 'medium': return '中优先级';
    case 'high': return '高优先级';
    default: return priority;
  }
};

const getPriorityClass = (priority: Priority) => {
  switch(priority) {
    case 'low': return 'bg-green-100 text-green-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'high': return 'bg-red-100 text-red-800';
    default: return '';
  }
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('zh-CN', options);
};
</script>