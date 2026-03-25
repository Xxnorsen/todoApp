import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert, TextInput, Modal, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

interface Task {
  id: string;
  timeRange: string;
  title: string;
  description: string;
  completed: boolean;
}

interface Activity {
  id: string;
  name: string;
  icon: string;
  taskCount: number;
  color: string;
}

export default function MainScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedDate, setSelectedDate] = useState(14);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState('');
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const activities = [
    { id: '1', name: 'Idea', icon: '💡', taskCount: 12, color: '#FF6B6B' },
    { id: '2', name: 'Food', icon: '🍔', taskCount: 9, color: '#4ECDC4' },
    { id: '3', name: 'Work', icon: '💼', taskCount: 14, color: '#45B7D1' },
    { id: '4', name: 'Sport', icon: '⚽', taskCount: 5, color: '#96CEB4' },
    { id: '5', name: 'Music', icon: '🎵', taskCount: 4, color: '#FFEAA7' },
  ];

  const dates = [
    { day: 14, weekday: 'Mon' },
    { day: 15, weekday: 'Tue' },
    { day: 16, weekday: 'Wed' },
    { day: 17, weekday: 'Thu' },
  ];

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const createTask = () => {
    if (!taskName.trim() || !selectedActivity) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      timeRange: 'New Task',
      title: taskName,
      description: taskDescription,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setShowCreateModal(false);
    setTaskName('');
    setTaskDescription('');
    setSelectedActivity('');
    Alert.alert('Success', 'Task created successfully!');
  };

  const renderTask = ({ item }: { item: Task }) => (
    <View style={styles.taskCard}>
      <View style={styles.taskContent}>
        <TouchableOpacity onPress={() => toggleTask(item.id)} style={styles.checkboxContainer}>
          <View style={[styles.checkbox, item.completed && styles.checked]}>
            {item.completed && <Text style={styles.checkmark}>✓</Text>}
          </View>
        </TouchableOpacity>
        <View style={styles.taskText}>
          <Text style={styles.timeRange}>{item.timeRange}</Text>
          <Text style={styles.taskTitle}>{item.title}</Text>
          <Text style={styles.taskDescription}>{item.description}</Text>
        </View>
      </View>
    </View>
  );

  const renderActivity = ({ item }: { item: Activity }) => (
    <TouchableOpacity
      style={styles.activityItem}
      onPress={() => {
        setSelectedActivity(item.name);
        setShowActivityModal(false);
        setShowCreateModal(true);
      }}
    >
      <View style={styles.activityRow}>
        <View style={[styles.activityIcon, { backgroundColor: item.color }]}>
          <Text style={styles.activityIconText}>{item.icon}</Text>
        </View>
        <View style={styles.activityContent}>
          <Text style={styles.activityName}>{item.name}</Text>
          <Text style={styles.activityCount}>{item.taskCount} Tasks</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#666" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.date}>14 Sept</Text>
          <Text style={styles.title}>Today</Text>
        </View>
        <TouchableOpacity 
          style={styles.addNewButton}
          onPress={() => setShowActivityModal(true)}
        >
          <Text style={styles.addNewText}>Add New</Text>
        </TouchableOpacity>
      </View>

      {/* Date Selector */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateSelector}>
        {dates.map((date) => (
          <TouchableOpacity
            key={date.day}
            style={[
              styles.dateButton,
              selectedDate === date.day && styles.selectedDateButton
            ]}
            onPress={() => setSelectedDate(date.day)}
          >
            <Text style={[
              styles.dateButtonDay,
              selectedDate === date.day && styles.selectedDateButtonDay
            ]}>
              {date.day}
            </Text>
            <Text style={[
              styles.dateButtonWeekday,
              selectedDate === date.day && styles.selectedDateButtonWeekday
            ]}>
              {date.weekday}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Tasks Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Tasks</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{tasks.length}</Text>
        </View>
      </View>

      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        style={styles.taskList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="assignment" size={48} color="#ccc" />
            <Text style={styles.emptyText}>No tasks yet</Text>
            <Text style={styles.emptySubtext}>Tap "Add New" to create your first task</Text>
          </View>
        }
      />

      {/* Choose Activity Modal */}
      <Modal
        visible={showActivityModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowActivityModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create Task</Text>
            
            <Text style={styles.modalSectionTitle}>Choose Activity</Text>
            <FlatList
              data={activities}
              renderItem={renderActivity}
              keyExtractor={(item) => item.id}
              style={styles.activityList}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>

      {/* Create Task Modal */}
      <Modal
        visible={showCreateModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCreateModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.createTaskHeader}>
              <TouchableOpacity onPress={() => setShowCreateModal(false)}>
                <Ionicons name="chevron-back" size={24} color="#007AFF" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Create Task</Text>
              <Ionicons name="time" size={20} color="#666" />
            </View>

            <TextInput
              style={styles.input}
              placeholder="Name"
              value={taskName}
              onChangeText={setTaskName}
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Task Description..."
              value={taskDescription}
              onChangeText={setTaskDescription}
              multiline
              numberOfLines={3}
            />

            <TouchableOpacity style={styles.createButton} onPress={createTask}>
              <Text style={styles.createButtonText}>Create Task</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  addNewButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addNewText: {
    color: 'white',
    fontWeight: '600',
  },
  dateSelector: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
  },
  dateButton: {
    alignItems: 'center',
    marginRight: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  selectedDateButton: {
    backgroundColor: '#007AFF',
  },
  dateButtonDay: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedDateButtonDay: {
    color: 'white',
  },
  dateButtonWeekday: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  selectedDateButtonWeekday: {
    color: 'white',
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  badge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  taskList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  taskCard: {
    backgroundColor: 'white',
    marginBottom: 12,
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkboxContainer: {
    marginRight: 12,
    paddingTop: 2,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
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
  },
  timeRange: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 4,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    margin: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  activityList: {
    maxHeight: 300,
  },
  activityItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  activityIconText: {
    fontSize: 20,
  },
  activityContent: {
    flex: 1,
  },
  activityName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  activityCount: {
    fontSize: 14,
    color: '#666',
  },
  createTaskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  createButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
