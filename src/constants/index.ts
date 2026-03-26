export const COLORS = {
  primary: '#7c3aed',
  primaryLight: '#ede9fe',
  primaryMid: '#a78bfa',
  primaryDark: '#5b21b6',
  pink: '#f472b6',
  teal: '#2dd4bf',
  amber: '#fbbf24',
  red: '#ef4444',
  green: '#22c55e',
  white: '#ffffff',
  bg: '#f5f3ff',
  gray50: '#fafafa',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray400: '#9ca3af',
  gray600: '#4b5563',
  gray800: '#1f2937',
};

export const PRIORITY_COLORS = {
  low: '#22c55e',
  medium: '#fbbf24',
  high: '#ef4444',
};

export const PRIORITY_LABELS = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export const FILTER_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Done', value: 'completed' },
] as const;

export const STICKERS = {
  todoList: require('../../assets/stickers/todo-list.png'),
  goodJob: require('../../assets/stickers/good-job.png'),
  work:     require('../../assets/stickers/work.png'),
  agree:    require('../../assets/stickers/agree.png'),
  idea:     require('../../assets/stickers/idea.png'),
};

export const ICONS = {
  todoList: { name: 'list-alt', type: 'MaterialIcons', size: 80, color: COLORS.primary },
  goodJob: { name: 'trophy', type: 'FontAwesome5', size: 60, color: COLORS.teal },
  work: { name: 'briefcase', type: 'Ionicons', size: 56, color: COLORS.pink },
  agree: { name: 'check-circle', type: 'FontAwesome5', size: 60, color: COLORS.primary },
  idea: { name: 'lightbulb-outline', type: 'MaterialIcons', size: 120, color: COLORS.gray400 },
  edit: { name: 'edit', type: 'MaterialIcons', size: 15, color: COLORS.gray600 },
  delete: { name: 'trash', type: 'MaterialIcons', size: 15, color: COLORS.gray600 },
  check: { name: 'check', type: 'MaterialIcons', size: 14, color: COLORS.white },
  clear: { name: 'delete-sweep', type: 'MaterialIcons', size: 12, color: COLORS.red },
  urgentWarning: { name: 'warning', type: 'MaterialIcons', size: 16, color: COLORS.pink },
  celebration: { name: 'celebration', type: 'MaterialIcons', size: 16, color: COLORS.teal },
  sparkles: { name: 'auto-awesome', type: 'MaterialIcons', size: 16, color: COLORS.primary },
  add: { name: 'add-circle', type: 'MaterialIcons', size: 16, color: COLORS.primary },
  clipboard: { name: 'assignment', type: 'MaterialIcons', size: 16, color: COLORS.gray800 },
  handPointing: { name: 'arrow-upward', type: 'MaterialIcons', size: 16, color: COLORS.gray400 },
  plus: { name: 'add', type: 'MaterialIcons', size: 16, color: COLORS.primary },
  allTasks: { name: 'list', type: 'MaterialIcons', size: 16, color: COLORS.gray800 },
  activeTasks: { name: 'hourglass-empty', type: 'MaterialIcons', size: 16, color: COLORS.gray800 },
  completedTasks: { name: 'check-circle', type: 'MaterialIcons', size: 16, color: COLORS.gray800 },
};
