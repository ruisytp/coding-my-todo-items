<template>
  <div 
    :class="[
      'p-4 rounded-lg border flex items-start justify-between',
      todo.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
    ]"
  >
    <div class="flex items-start space-x-3">
      <input 
        type="checkbox" 
        :checked="todo.completed"
        @change="$emit('toggle-completed', todo.id)"
        class="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <div>
        <h4 :class="['font-medium text-gray-800', { 'line-through text-gray-500': todo.completed }]">
          {{ todo.title }}
        </h4>
        <p class="text-sm text-gray-600 mt-1">{{ todo.description }}</p>
        <div class="flex flex-wrap gap-2 mt-2">
          <span class="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
            {{ getCategoryText(todo.category) }}
          </span>
          <span 
            class="text-xs px-2 py-1 rounded-full" 
            :class="getPriorityClass(todo.priority)"
          >
            {{ getPriorityText(todo.priority) }}
          </span>
          <span 
            v-if="todo.dueDate" 
            class="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800"
          >
            截止: {{ formatDate(todo.dueDate) }}
          </span>
        </div>
      </div>
    </div>
    <div class="flex space-x-2">
      <button 
        @click="$emit('edit', todo)"
        class="text-blue-500 hover:text-blue-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
      </button>
      <button 
        @click="$emit('remove', todo.id)"
        class="text-red-500 hover:text-red-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TodoItem as TodoItemType, Category, Priority } from '@/types/todo';

interface Props {
  todo: TodoItemType;
}

defineProps<Props>();

defineEmits<{
  'toggle-completed': [id: string];
  'remove': [id: string];
  'edit': [todo: TodoItemType];
}>();

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