# TODO List App

A feature-rich React Native TODO application built with TypeScript, Redux Toolkit for state management, and React Navigation.

## Features

✅ **Core Functionality**
- Fetch TODO items from JSONPlaceholder API on app load
- Display list of TODO items with beautiful UI
- Add new TODO items with validation
- Mark TODO items as completed/incomplete
- Delete TODO items with confirmation
- Edit existing TODO items inline

✅ **Advanced Features**
- Real-time statistics (Total, Active, Completed counts)
- Sort by Most Recent or by ID
- Filter by All, Active, or Done
- Maintain created_at and updated_at timestamps
- Pull-to-refresh functionality
- Smooth animations and transitions

✅ **Technical Features**
- Built with React Native 0.81.0
- TypeScript for enhanced type safety
- MobX for efficient state management
- React Navigation for screen navigation
- Optimized performance with React.memo
- Clean, organized folder structure
- Comprehensive error handling

## Screenshots

The app features a clean black and white design with:
- Main screen with TODO list, stats, and controls
- Add Todo screen with form validation
- Smooth animations and modern UI components

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── TodoItem.tsx    # Individual todo item component
│   ├── StatsCard.tsx   # Statistics display component
│   └── FilterSortControls.tsx # Sorting and filtering controls
├── screens/            # App screens
│   ├── MainScreen.tsx  # Main todo list screen
│   └── AddTodoScreen.tsx # Add new todo screen
├── stores/             # State management
│   ├── todoSlice.ts    # Redux Toolkit slice for todos
│   ├── store.ts        # Main Redux store configuration
│   └── hooks.ts        # Custom Redux hooks
├── navigation/         # Navigation configuration
│   └── AppNavigator.tsx # Stack navigator setup
├── types/              # TypeScript type definitions
│   └── TodoTypes.ts    # Interface definitions
└── utils/              # Utility functions
```

## Installation & Setup

### Prerequisites
- Node.js (>=18)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development)

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd TodoApp
```

### 2. Install dependencies
```bash
npm install
```

### 3. Install iOS dependencies (iOS only)
```bash
cd ios && pod install && cd ..
```

### 4. Start Metro bundler
```bash
npm start
```

### 5. Run the app

**Android:**
```bash
npm run android
```

**iOS:**
```bash
npm run ios
```

## Usage

### Main Screen
- View all your TODO items
- See real-time statistics at the top
- Use sorting options (Most Recent / By ID)
- Filter todos (All / Active / Done)
- Pull down to refresh the list
- Tap the + button to add new todos

### Adding Todos
- Navigate to Add Todo screen
- Enter a descriptive title (minimum 3 characters)
- Tap "Add Todo" to save
- Validation ensures quality input

### Managing Todos
- **Complete**: Tap the checkbox to mark as done
- **Edit**: Tap the edit button or the todo content
- **Delete**: Tap the delete button with confirmation
- **View**: See timestamps and completion status

## API Integration

The app fetches initial TODO data from:
```
https://jsonplaceholder.typicode.com/todos?_limit=20
```

All new todos are stored locally with proper timestamps.

## State Management

The app uses Redux Toolkit for efficient state management:
- **todoSlice**: Central slice managing all todo operations
- **Store**: Main Redux store that holds all app state
- **Actions**: Simple functions for modifying todo state
- **Selectors**: Helper functions to get filtered/sorted data
- **Async Thunks**: Handle API calls and async operations

## Performance Optimizations

- **React.memo**: Prevents unnecessary re-renders
- **Optimized Lists**: Efficient FlatList rendering
- **Lazy Loading**: Components load only when needed
- **Memory Management**: Proper cleanup and state management

## Styling

The app features a modern, minimalist design:
- **Color Scheme**: Black and white with subtle grays
- **Typography**: Clean, readable fonts
- **Shadows**: Subtle elevation effects
- **Animations**: Smooth transitions and feedback
- **Responsive**: Adapts to different screen sizes

## Testing

Run the test suite:
```bash
npm test
```

## Building for Production

### Android APK
```bash
cd android
./gradlew assembleRelease
```

The APK will be generated in:
```
android/app/build/outputs/apk/release/app-release.apk
```

### iOS Archive
```bash
cd ios
xcodebuild -workspace TodoApp.xcworkspace -scheme TodoApp -configuration Release archive -archivePath TodoApp.xcarchive
```

## Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   npm start -- --reset-cache
   ```

2. **iOS build issues**
   ```bash
   cd ios && pod deintegrate && pod install
   ```

3. **Android build issues**
   ```bash
   cd android && ./gradlew clean
   ```

### Dependencies

If you encounter dependency issues:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the GitHub repository.

---

**Built with ❤️ using React Native, TypeScript, and MobX**
# TodoApp
