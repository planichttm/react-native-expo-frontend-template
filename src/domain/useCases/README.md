# Use Cases Layer

The Use Cases represent the application's business logic and define how the system responds to user actions. They orchestrate the flow of data to and from entities and implement the business rules of the application.

## Purpose

Use Cases serve several important purposes:
- Encapsulate business logic independent of UI or external systems
- Define the operations that users can perform
- Orchestrate data flow between repositories, services, and the UI
- Implement business rules and validation
- Provide a clean API for UI components

## Structure

Our Use Cases are organized by feature and follow these patterns:

1. **Feature-based Organization**: Use Cases are grouped by feature or domain area
2. **Composition over Inheritance**: Use Cases leverage helper classes rather than complex inheritance hierarchies
3. **Static Methods**: Most Use Cases use static methods for simplicity
4. **Pure Logic**: Use Cases contain business logic without direct dependencies on UI or data access details

## Using Helpers

Use Cases rely on specialized helper classes to avoid code duplication:

```typescript
import { PriceMetricsHelper } from '../../helpers';

export class TokenCompareUseCase {
  static async getTokenPriceData(tokenId: string): Promise<TimeSeriesDataPoint[]> {
    const selectedToken = this.findToken(tokenId);
    return PriceMetricsHelper.getAssetPriceData(selectedToken.asset);
  }
  
  // Other methods...
}
```

## Use Case Responsibilities

Each Use Case class is responsible for:
1. Validating inputs
2. Coordinating with repositories and services
3. Applying business rules
4. Transforming data for presentation
5. Handling errors at the domain level

## Types of Use Cases

Our application contains several types of Use Cases:
- **Query Use Cases**: Fetch and transform data
- **Command Use Cases**: Modify data or trigger actions
- **Calculation Use Cases**: Perform complex business calculations
- **Comparison Use Cases**: Compare entities against each other

## Folder Structure

```
useCases/
├── common/          # Base classes and shared functionality
├── compare/         # DEX comparison operations
├── crossCompare/    # Cross-entity comparison (DEX vs Tokens)
├── dexMetrics/      # DEX-specific metrics and calculations
├── tokenCompare/    # Token comparison operations
└── README.md        # This documentation
```

## Best Practices

1. Keep Use Cases focused on a single responsibility
2. Use helpers for shared functionality rather than deep inheritance
3. Make complex business rules explicit in the Use Case
4. Return domain objects rather than UI-specific formats
5. Handle errors at the appropriate level
6. Write unit tests for Use Cases independent of infrastructure

Use Cases form the core of the application's business logic and should remain independent of frameworks, UI, and external systems while embodying the application's true purpose.