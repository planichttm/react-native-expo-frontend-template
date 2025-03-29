# Clean Architecture Overview

This application follows a Clean Architecture pattern with distinct layers, each with specific responsibilities:

1. **Repositories** - Data access layer that communicates with external sources
2. **Services** - Simple data transformation and coordination with repositories
3. **Use Cases** - Business logic and orchestration of complex operations
4. **Screen Hooks** - UI state management and bridging between use cases and UI
5. **Screens** - UI components and event handling

## Data Flow

Data typically flows in the following direction:

```
User Interaction → Screens → Hooks → Use Cases → Services → Repositories → External Data Sources
```

And back:

```
External Data Sources → Repositories → Services → Use Cases → Hooks → Screens → UI Update
```

## Benefits

- **Separation of Concerns**: Each layer has a clear, focused responsibility
- **Testability**: Layers can be tested in isolation
- **Maintainability**: Changes in one layer have minimal impact on others
- **Reusability**: Business logic in use cases can be shared across different UI components
- **Scalability**: New features can be added with minimal changes to existing code

## Guidelines

- Lower layers should not depend on higher layers (e.g., Services should not import Hooks)
- Each layer should expose clear interfaces to the layers above it
- Business logic should be concentrated in the Use Cases layer
- UI logic should be kept in Hooks and Screens
- Data access details should be encapsulated in Repositories