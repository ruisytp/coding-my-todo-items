import { ref, computed } from 'vue';
import { TodoItem, Category, Priority, Status } from '@/types/todo';

// 初始化todos为一个空数组，然后再从localStorage加载数据
const todos = ref<TodoItem[]>([]);

// 在模块加载后，从localStorage加载数据
try {
  const savedTodos = localStorage.getItem('todos');
  const parsedData = savedTodos ? JSON.parse(savedTodos) : [];
  
  // 验证解析的数据是否为数组
  if (Array.isArray(parsedData)) {
    // 验证数组中的每一项是否为有效的TodoItem对象
    const validTodos = parsedData.filter(item => {
      return item && typeof item === 'object' && 
             typeof item.id === 'string' && 
             typeof item.title === 'string';
    });
    
    if (validTodos.length !== parsedData.length) {
      console.warn(`检测到无效的待办事项数据，已过滤 ${parsedData.length - validTodos.length} 项`);
    }
    
    todos.value = validTodos;
  } else {
    console.warn('localStorage中的todos数据不是数组格式，将使用空数组');
    todos.value = [];
  }
} catch (error) {
  console.error('Failed to parse todos from localStorage:', error);
  todos.value = [];
}

// 更新localStorage
const updateLocalStorage = () => {
  try {
    localStorage.setItem('todos', JSON.stringify(todos.value));
  } catch (error) {
    console.error('Failed to save todos to localStorage:', error);
  }
};

// 添加待办事项
export const addTodo = (todo: Omit<TodoItem, 'id' | 'completed' | 'createdAt'>) => {
  try {
    const newTodo: TodoItem = {
      ...todo,
      id: Date.now().toString(), // 使用时间戳确保唯一性
      completed: false,
      createdAt: new Date().toISOString(),
    };
    todos.value.push(newTodo);
    updateLocalStorage();
    console.log("待办事项已添加，当前总数：", todos.value.length);
  } catch (error) {
    console.error("Error adding todo:", error);
  }
};

// 删除待办事项
export const removeTodo = (id: string) => {
  try {
    todos.value = todos.value.filter(todo => todo.id !== id);
    updateLocalStorage();
    console.log("待办事项已删除，当前总数：", todos.value.length);
  } catch (error) {
    console.error("Error removing todo:", error);
  }
};

// 切换完成状态
export const toggleComplete = (id: string) => {
  try {
    const todo = todos.value.find(todo => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      updateLocalStorage();
      console.log("待办事项状态已切换：", todo.title, " -> ", todo.completed);
    } else {
      console.warn("未找到ID为", id, "的待办事项");
    }
  } catch (error) {
    console.error("Error toggling todo:", error);
  }
};

// 更新待办事项
export const updateTodo = (updatedTodo: TodoItem) => {
  try {
    const index = todos.value.findIndex(todo => todo.id === updatedTodo.id);
    if (index !== -1) {
      todos.value[index] = updatedTodo;
      updateLocalStorage();
    }
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};

// 获取所有待办事项
export const getAllTodos = computed(() => {
  try {
    return todos.value;
  } catch (error) {
    console.error("Error in getAllTodos:", error);
    return [];
  }
});

// 获取统计信息
export const getStats = computed(() => {
  try {
    const total = todos.value.length;
    const completed = todos.value.filter(todo => todo.completed).length;
    const pending = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      completed,
      pending,
      completionRate,
    };
  } catch (error) {
    console.error("Error calculating stats:", error);
    return { total: 0, completed: 0, pending: 0, completionRate: 0 };
  }
});

// 按条件过滤待办事项
export const getFilteredTodos = (
  category: Category = 'all',
  priority: Priority | 'all' = 'all',
  status: Status = 'all',
  searchQuery: string = ''
) => {
  try {
    return todos.value.filter(todo => {
      // 分类过滤
      if (category !== 'all' && todo.category !== category) return false;
      
      // 优先级过滤
      if (priority !== 'all' && todo.priority !== priority) return false;
      
      // 状态过滤
      if (status !== 'all') {
        if (status === 'completed' && !todo.completed) return false;
        if (status === 'pending' && todo.completed) return false;
      }
      
      // 搜索过滤
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !todo.title.toLowerCase().includes(query) &&
          !todo.description.toLowerCase().includes(query)
        ) {
          return false;
        }
      }
      
      return true;
    });
  } catch (error) {
    console.error("Error filtering todos:", error);
    return [];
  }
};