# Todo List Mobile App

A comprehensive to-do list mobile application built with React Native and Expo, featuring authentication, task management, and a beautiful user interface.

## Features

### ✅ Core Functionality

- **User Authentication**: Sign up and login functionality with secure credential management
- **Task Management**: Create, read, update, and delete tasks
- **Task Categories**: Organize tasks into different categories (My Day, Important, Planned, Personal, Work)
- **Task Status**: Mark tasks as complete/incomplete with visual feedback
- **Real-time Updates**: Instant UI updates when tasks are modified

### 🎨 User Interface

- **Modern Design**: Clean, intuitive interface following Material Design principles
- **Responsive Layout**: Optimized for mobile devices with proper spacing and typography
- **Interactive Elements**: Smooth animations and haptic feedback
- **Tab Navigation**: Easy navigation between different task views
- **Modal Forms**: Elegant modals for adding and editing tasks

### 🔧 Technical Features

- **State Management**: Redux Toolkit for efficient state management
- **Async Storage**: Persistent data storage on device
- **API Integration**: Mock backend API with real networking capabilities
- **TypeScript**: Full type safety throughout the application
- **Error Handling**: Comprehensive error handling and user feedback

## Screens

### 1. Authentication Screens

- **Sign Up Screen**: User registration with form validation
- **Login Screen**: Secure user authentication

### 2. Main Application Screens

- **Today Tab**: View and manage daily tasks
- **Important Tab**: Focus on high-priority tasks
- **Planned Tab**: Tasks with scheduled dates
- **Add Task**: Dedicated screen for creating new tasks
- **Profile Tab**: User profile and app settings

## Technology Stack

### Frontend

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and toolchain
- **TypeScript**: Type-safe JavaScript
- **Expo Router**: File-based routing system

### State Management

- **Redux Toolkit**: Modern Redux for state management
- **React Redux**: React bindings for Redux
- **Async Storage**: Local data persistence

### UI/UX

- **React Native Paper**: Material Design components
- **Expo Vector Icons**: Icon library
- **Custom Styling**: Tailored design system

### Development Tools

- **ESLint**: Code linting and formatting
- **TypeScript Compiler**: Type checking
- **Metro Bundler**: JavaScript bundling

## Project Structure

```
todoApp/
├── app/                    # Main application screens
│   ├── (tabs)/            # Tab-based navigation screens
│   │   ├── index.tsx      # Today screen
│   │   ├── important.tsx  # Important tasks
│   │   ├── planned.tsx    # Planned tasks
│   │   ├── add.tsx        # Add task screen
│   │   └── profile.tsx    # User profile
│   ├── login.tsx          # Login screen
│   ├── signup.tsx         # Sign up screen
│   └── _layout.tsx        # Root layout with Redux provider
├── store/                 # Redux store configuration
│   ├── index.ts           # Store setup
│   └── slices/            # Redux slices
│       ├── authSlice.ts   # Authentication state
│       └── todoSlice.ts    # Todo state management
├── hooks/                 # Custom React hooks
│   ├── index.ts           # Hook exports
│   ├── useAppDispatch.ts  # Typed dispatch hook
│   └── useAppSelector.ts  # Typed selector hook
└── components/            # Reusable UI components
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- Expo Go app (for testing on device)
- Android Studio or Xcode (for emulator testing)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd todoApp
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Run the application**
   - Scan QR code with Expo Go app
   - Press `a` to open Android emulator
   - Press `i` to open iOS simulator
   - Press `w` to open in web browser

## Usage

### Authentication

1. Open the app and navigate to the sign-up screen
2. Create an account with your email and password
3. Login with your credentials to access the main app

### Task Management

1. **Add Tasks**: Use the + button or dedicated add screen
2. **Edit Tasks**: Tap the Edit button on any task
3. **Delete Tasks**: Tap the Delete button with confirmation
4. **Complete Tasks**: Tap the checkbox to mark as complete
5. **Category Management**: Select appropriate category when creating tasks

### Navigation

- Use bottom tabs to switch between different task views
- Access profile and settings from the Profile tab
- Navigate back using the built-in navigation

## API Integration

The app includes mock API integration using JSONPlaceholder:

- Authentication endpoints simulate user management
- Todo endpoints demonstrate CRUD operations
- Ready for integration with real backend services

To connect to a real API:

1. Update the API endpoints in the Redux slices
2. Configure proper authentication headers
3. Handle real API responses and errors

## State Management

### Auth Slice

- User authentication state
- Login/logout functionality
- Token management
- Persistent session storage

### Todo Slice

- Task data management
- CRUD operations
- Category filtering
- Real-time updates

## Development

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Component-based architecture
- Separation of concerns

### Best Practices

- Error boundaries for graceful error handling
- Loading states for better UX
- Form validation for data integrity
- Responsive design principles

## Testing

### Manual Testing

1. Test authentication flow (signup/login/logout)
2. Verify task CRUD operations
3. Test navigation between screens
4. Validate form inputs and error handling

### Test Scenarios

- Empty task lists
- Network error conditions
- Form validation errors
- Data persistence across app restarts

## Deployment

### Expo Build

```bash
# Build for Android
expo build:android

# Build for iOS
expo build:ios

# Build for web
expo build:web
```

### Store Deployment

1. Configure app icons and splash screens
2. Update app.json with production settings
3. Build and submit to app stores

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Future Enhancements

### Planned Features

- [ ] Push notifications for task reminders
- [ ] Cloud synchronization
- [ ] Task sharing and collaboration
- [ ] Advanced filtering and search
- [ ] Task templates
- [ ] Analytics and reporting

### Technical Improvements

- [ ] Unit and integration tests
- [ ] Performance optimization
- [ ] Offline mode support
- [ ] Advanced animations
- [ ] Accessibility improvements

## Troubleshooting

### Common Issues

**Metro bundler errors**

```bash
# Clear cache
npx expo start --clear

# Reset project
npm run reset-project
```

**Dependency issues**

```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

**Build errors**

- Check TypeScript configuration
- Verify all imports are correct
- Ensure all required dependencies are installed

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:

- Check the troubleshooting section
- Review the documentation
- Open an issue on GitHub

---

**Built with ❤️ using React Native and Expo**
