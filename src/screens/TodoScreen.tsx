import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import Icon from "../components/Icon";
import Input from "../components/Input";
import {
  COLORS,
  FILTER_OPTIONS,
  PRIORITY_COLORS,
  PRIORITY_LABELS,
  STICKERS,
} from "../constants/index";
import { RootState } from "../store/store";
import {
  addTodo,
  clearCompleted,
  deleteTodo,
  editTodo,
  setFilter,
  toggleTodo,
} from "../store/todoSlice";
import { Priority, Todo } from "../types/index";

interface TodoScreenProps {
  onLogout?: () => void;
}

const TodoScreen: React.FC<TodoScreenProps> = ({ onLogout }) => {
  const dispatch = useDispatch();
  const { todos, filter } = useSelector((state: RootState) => state.todos);

  const [text, setText] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editText, setEditText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const filteredTodos = todos.filter((t: Todo) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const totalCount = todos.length;
  const doneCount = todos.filter((t: Todo) => t.completed).length;
  const urgentCount = todos.filter(
    (t: Todo) => t.priority === "high" && !t.completed,
  ).length;

  const handleAdd = () => {
    if (!text.trim()) return;
    dispatch(addTodo({ text: text.trim(), priority }));
    setText("");
  };

  const handleDelete = (id: string) => {
    Alert.alert("Delete Task", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => dispatch(deleteTodo(id)),
      },
    ]);
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setEditText(todo.text);
    setModalVisible(true);
  };

  const handleSaveEdit = () => {
    if (!editText.trim() || !editingTodo) return;
    dispatch(editTodo({ id: editingTodo.id, text: editText.trim() }));
    setModalVisible(false);
    setEditingTodo(null);
  };

  const handleClearCompleted = () => {
    Alert.alert("Clear Completed", "Remove all completed tasks?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear",
        style: "destructive",
        onPress: () => dispatch(clearCompleted()),
      },
    ]);
  };

  const renderItem = ({ item }: { item: Todo }) => (
    <View style={[styles.todoCard, item.completed && styles.todoCardDone]}>
      <View
        style={[
          styles.priorityBar,
          { backgroundColor: PRIORITY_COLORS[item.priority] },
        ]}
      />
      <TouchableOpacity
        style={[styles.checkbox, item.completed && styles.checkboxDone]}
        onPress={() => dispatch(toggleTodo(item.id))}
        activeOpacity={0.7}
      >
        {item.completed && <Icon iconKey="check" />}
      </TouchableOpacity>
      <View style={styles.todoContent}>
        <Text style={[styles.todoText, item.completed && styles.todoTextDone]}>
          {item.text}
        </Text>
        <Text
          style={[
            styles.priorityLabel,
            { color: PRIORITY_COLORS[item.priority] },
          ]}
        >
          {PRIORITY_LABELS[item.priority]}
        </Text>
      </View>
      <View style={styles.todoActions}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => handleEdit(item)}
          activeOpacity={0.7}
        >
          <Icon iconKey="edit" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, styles.deleteBtn]}
          onPress={() => handleDelete(item.id)}
          activeOpacity={0.7}
        >
          <Icon iconKey="delete" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyState}>
      <Image
        source={STICKERS.idea}
        style={styles.emptySticker}
        resizeMode="contain"
      />
      <Text style={styles.emptyTitle}>No tasks yet!</Text>
      <Text style={styles.emptySubtitle}>
        Add your first task above <Icon iconKey="handPointing" />
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />
      <FlatList
        data={filteredTodos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <View>
                <Text style={styles.appTitle}>
                  My Tasks <Icon iconKey="sparkles" />
                </Text>
                <Text style={styles.appDate}>
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </Text>
              </View>
              <View style={styles.headerRight}>
                {onLogout && (
                  <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={onLogout}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.logoutButtonText}>Logout</Text>
                  </TouchableOpacity>
                )}
                <Image
                  source={STICKERS.todoList}
                  style={styles.headerSticker}
                  resizeMode="contain"
                />
              </View>
            </View>
            <View style={styles.statsRow}>
              <View
                style={[styles.statCard, { borderTopColor: COLORS.primary }]}
              >
                <Text style={[styles.statNum, { color: COLORS.primary }]}>
                  {totalCount}
                </Text>
                <Text style={styles.statLabel}>Total</Text>
              </View>
              <View style={[styles.statCard, { borderTopColor: COLORS.teal }]}>
                <Text style={[styles.statNum, { color: COLORS.teal }]}>
                  {doneCount}
                </Text>
                <Text style={styles.statLabel}>Done</Text>
              </View>
              <View style={[styles.statCard, { borderTopColor: COLORS.pink }]}>
                <Text style={[styles.statNum, { color: COLORS.pink }]}>
                  {urgentCount}
                </Text>
                <Text style={styles.statLabel}>Urgent</Text>
              </View>
            </View>
            <View style={styles.addCard}>
              <View style={styles.addCardHeader}>
                <Text style={styles.addCardTitle}>
                  <Icon iconKey="plus" /> Add New Task
                </Text>
                <Image
                  source={STICKERS.agree}
                  style={styles.addSticker}
                  resizeMode="contain"
                />
              </View>
              <Input
                value={text}
                onChangeText={setText}
                placeholder="What needs to be done?"
                onSubmit={handleAdd}
                buttonLabel="Add"
              />
              <View style={styles.priorityRow}>
                <Text style={styles.priorityTitle}>Priority:</Text>
                {(["low", "medium", "high"] as Priority[]).map((p) => (
                  <TouchableOpacity
                    key={p}
                    style={[
                      styles.priorityChip,
                      { borderColor: PRIORITY_COLORS[p] },
                      priority === p && { backgroundColor: PRIORITY_COLORS[p] },
                    ]}
                    onPress={() => setPriority(p)}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.priorityChipText,
                        {
                          color:
                            priority === p ? COLORS.white : PRIORITY_COLORS[p],
                        },
                      ]}
                    >
                      {PRIORITY_LABELS[p]}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.filterRow}>
              {FILTER_OPTIONS.map((opt) => (
                <TouchableOpacity
                  key={opt.value}
                  style={[
                    styles.filterChip,
                    filter === opt.value && styles.filterChipActive,
                  ]}
                  onPress={() => dispatch(setFilter(opt.value))}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      filter === opt.value && styles.filterChipTextActive,
                    ]}
                  >
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
              {doneCount > 0 && (
                <TouchableOpacity
                  style={styles.clearBtn}
                  onPress={handleClearCompleted}
                  activeOpacity={0.8}
                >
                  <Icon iconKey="clear" />
                </TouchableOpacity>
              )}
            </View>
            {urgentCount > 0 && (
              <View style={styles.urgentBanner}>
                <Image
                  source={STICKERS.work}
                  style={styles.urgentSticker}
                  resizeMode="contain"
                />
                <View>
                  <Icon iconKey="warning" />
                  <Text style={styles.urgentSub}>
                    You have {urgentCount} urgent task
                    {urgentCount > 1 ? "s" : ""}
                  </Text>
                </View>
              </View>
            )}
            {totalCount > 0 && doneCount === totalCount && (
              <View style={styles.goodJobBanner}>
                <Image
                  source={STICKERS.goodJob}
                  style={styles.goodJobSticker}
                  resizeMode="contain"
                />
                <Icon iconKey="celebration" />
              </View>
            )}
            <Text style={styles.sectionTitle}>
              {filter === "all" ? (
                <>
                  <Icon iconKey="clipboard" /> All Tasks
                </>
              ) : filter === "active" ? (
                <>
                  <Icon iconKey="activeTasks" /> Active Tasks
                </>
              ) : (
                <>
                  <Icon iconKey="completedTasks" /> Completed
                </>
              )}
              {"  "}
              <Text style={styles.sectionCount}>({filteredTodos.length})</Text>
            </Text>
          </View>
        }
      />
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>✏️ Edit Task</Text>
            <TextInput
              style={styles.modalInput}
              value={editText}
              onChangeText={setEditText}
              autoFocus
              multiline
            />
            <View style={styles.modalBtns}>
              <Button
                label="Cancel"
                variant="ghost"
                onPress={() => setModalVisible(false)}
                style={{ flex: 1 }}
              />
              <Button
                label="Save"
                variant="primary"
                onPress={handleSaveEdit}
                style={{ flex: 1 }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  listContent: {
    padding: 20,
    paddingBottom: 48,
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: COLORS.primaryDark,
    letterSpacing: -0.5,
  },
  appDate: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.gray400,
    marginTop: 2,
  },
  headerSticker: {
    width: 80,
    height: 80,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
    borderTopWidth: 4,
    shadowColor: "#7c3aed",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  statNum: {
    fontSize: 28,
    fontWeight: "900",
    lineHeight: 32,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.gray400,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginTop: 2,
  },
  addCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#7c3aed",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 5,
  },
  addCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  addCardTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.gray800,
  },
  addSticker: {
    width: 60,
    height: 60,
  },
  priorityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
    flexWrap: "wrap",
  },
  priorityTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.gray600,
  },
  priorityChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 2,
  },
  priorityChipText: {
    fontSize: 12,
    fontWeight: "700",
  },
  filterRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
    flexWrap: "wrap",
    alignItems: "center",
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.gray200,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.gray600,
  },
  filterChipTextActive: {
    color: COLORS.white,
  },
  clearBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#fee2e2",
  },
  clearBtnText: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.red,
  },
  urgentBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff1f2",
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    gap: 12,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.pink,
  },
  urgentSticker: { width: 56, height: 56 },
  urgentTitle: { fontSize: 15, fontWeight: "800", color: "#be123c" },
  urgentSub: { fontSize: 13, fontWeight: "600", color: "#fb7185" },
  goodJobBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0fdf4",
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    gap: 12,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.teal,
  },
  goodJobSticker: { width: 60, height: 60 },
  goodJobText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#15803d",
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.gray800,
    marginBottom: 12,
  },
  sectionCount: {
    color: COLORS.gray400,
    fontWeight: "700",
  },
  todoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginBottom: 10,
    padding: 14,
    gap: 12,
    shadowColor: "#7c3aed",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 2,
    overflow: "hidden",
  },
  todoCardDone: {
    opacity: 0.65,
    backgroundColor: COLORS.gray50,
  },
  priorityBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    borderWidth: 2.5,
    borderColor: COLORS.gray200,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  checkboxDone: {
    backgroundColor: COLORS.teal,
    borderColor: COLORS.teal,
  },
  checkmark: {
    color: COLORS.white,
    fontWeight: "900",
    fontSize: 14,
  },
  todoContent: {
    flex: 1,
    gap: 4,
  },
  todoText: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.gray800,
  },
  todoTextDone: {
    textDecorationLine: "line-through",
    color: COLORS.gray400,
  },
  priorityLabel: {
    fontSize: 11,
    fontWeight: "700",
  },
  todoActions: {
    flexDirection: "row",
    gap: 6,
  },
  actionBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: COLORS.gray100,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteBtn: {
    backgroundColor: "#fee2e2",
  },
  actionBtnText: {
    fontSize: 15,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
    gap: 12,
  },
  emptySticker: {
    width: 120,
    height: 120,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: COLORS.gray800,
  },
  emptySubtitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.gray400,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    gap: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: COLORS.gray800,
  },
  modalInput: {
    backgroundColor: COLORS.gray50,
    borderWidth: 2,
    borderColor: COLORS.gray200,
    borderRadius: 14,
    padding: 14,
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.gray800,
    minHeight: 80,
  },
  modalBtns: {
    flexDirection: "row",
    gap: 12,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logoutButton: {
    backgroundColor: COLORS.red,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 12,
  },
});

export default TodoScreen;
