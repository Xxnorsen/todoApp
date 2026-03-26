import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  starred: boolean;
}

interface Category {
  id: string;
  name: string;
  count: number;
  icon?: string;
}

export default function TaskScreen({ onLogout }: { onLogout: () => void }) {
  const [selectedCategory, setSelectedCategory] = useState('Today');
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: '3', completed: false, starred: false },
    { id: '2', title: '2', completed: false, starred: false },
    { id: '3', title: '1', completed: false, starred: false },
  ]);
  const [newTask, setNewTask] = useState('');

  const sidebarItems: Category[] = [
    { id: '1', name: 'My Day', count: 0 },
    { id: '2', name: 'Important', count: 0 },
    { id: '3', name: 'Planned', count: 0 },
    { id: '4', name: 'Assigned to me', count: 0 },
    { id: '5', name: 'Flagged email', count: 0 },
    { id: '6', name: 'Tasks', count: 0, icon: '>' },
  ];

  const taskCategories: Category[] = [
    { id: '1', name: 'Today', count: 3 },
    { id: '2', name: 'Yesterday', count: 3 },
    { id: '3', name: 'Hello', count: 3 },
  ];

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const toggleStar = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, starred: !task.starred } : task
    ));
  };

  const addTask = () => {
    if (newTask.trim()) {
      const newTaskItem: Task = {
        id: Date.now().toString(),
        title: newTask,
        completed: false,
        starred: false,
      };
      setTasks([...tasks, newTaskItem]);
      setNewTask('');
    }
  };

  const renderTask = ({ item }: { item: Task }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity 
        style={styles.checkbox}
        onPress={() => toggleTask(item.id)}
      >
        <View style={[styles.checkboxBox, item.completed && styles.checkboxChecked]}>
          {item.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>
      <Text style={[styles.taskText, item.completed && styles.taskCompleted]}>
        {item.title}
      </Text>
      <TouchableOpacity 
        style={styles.starButton}
        onPress={() => toggleStar(item.id)}
      >
        <Ionicons 
          name={item.starred ? 'star' : 'star-outline'} 
          size={20} 
          color={item.starred ? '#FFD700' : '#ccc'} 
        />
      </TouchableOpacity>
    </View>
  );

  const renderSidebarItem = ({ item }: { item: Category }) => (
    <TouchableOpacity style={styles.sidebarItem}>
      <Text style={styles.sidebarText}>{item.name}</Text>
      {item.icon && <Text style={styles.sidebarIcon}>{item.icon}</Text>}
    </TouchableOpacity>
  );

  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity 
      style={[
        styles.categoryItem, 
        selectedCategory === item.name && styles.selectedCategory
      ]}
      onPress={() => setSelectedCategory(item.name)}
    >
      <Text style={[
        styles.categoryText,
        selectedCategory === item.name && styles.selectedCategoryText
      ]}>
        {item.name}
      </Text>
      <Text style={[
        styles.categoryCount,
        selectedCategory === item.name && styles.selectedCategoryCount
      ]}>
        {item.count}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <View style={styles.sidebar}>
        <View style={styles.sidebarHeader}>
          <Text style={styles.sidebarTitle}>Tasks</Text>
        </View>
        <FlatList
          data={sidebarItems}
          renderItem={renderSidebarItem}
          keyExtractor={(item) => item.id}
          style={styles.sidebarList}
        />
        
        {/* Task Categories */}
        <View style={styles.taskCategories}>
          <FlatList
            data={taskCategories}
            renderItem={renderCategory}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <View style={styles.contentHeader}>
          <Text style={styles.contentTitle}>{selectedCategory}</Text>
        </View>

        <FlatList
          data={tasks}
          renderItem={renderTask}
          keyExtractor={(item) => item.id}
          style={styles.taskList}
        />

        {/* Add Task */}
        <View style={styles.addTaskContainer}>
          <TextInput
            style={styles.addTaskInput}
            placeholder="Add a Task"
            value={newTask}
            onChangeText={setNewTask}
            onSubmitEditing={addTask}
          />
          <TouchableOpacity style={styles.addTaskButton} onPress={addTask}>
            <Ionicons name="add" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#2D2D30',
  },
  sidebar: {
    width: 250,
    backgroundColor: '#252526',
    borderRightWidth: 1,
    borderRightColor: '#3E3E42',
  },
  sidebarHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#3E3E42',
  },
  sidebarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  sidebarList: {
    flex: 1,
  },
  sidebarItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    paddingHorizontal: 20,
  },
  sidebarText: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  sidebarIcon: {
    fontSize: 12,
    color: '#666',
  },
  taskCategories: {
    borderTopWidth: 1,
    borderTopColor: '#3E3E42',
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    paddingHorizontal: 20,
  },
  selectedCategory: {
    backgroundColor: '#094771',
  },
  categoryText: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  categoryCount: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#3E3E42',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  selectedCategoryCount: {
    backgroundColor: '#007AFF',
    color: '#FFFFFF',
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  contentHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#3E3E42',
  },
  contentTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  taskList: {
    flex: 1,
    padding: 20,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#2D2D30',
    borderRadius: 4,
    marginBottom: 8,
  },
  checkbox: {
    marginRight: 12,
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#555',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  checkmark: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: '#CCCCCC',
  },
  taskCompleted: {
    textDecorationLine: 'line-through',
    color: '#666',
  },
  starButton: {
    padding: 4,
  },
  addTaskContainer: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#3E3E42',
  },
  addTaskInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#3E3E42',
    borderRadius: 4,
    padding: 12,
    marginRight: 12,
    color: '#CCCCCC',
    backgroundColor: '#2D2D30',
  },
  addTaskButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    margin: 20,
    padding: 12,
    backgroundColor: '#FF4444',
    borderRadius: 4,
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontWeight: '600',
  },
});
