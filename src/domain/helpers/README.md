# Domain Helpers

Domain Helpers provide reusable functionality that supports Use Cases by extracting common logic into specialized utility classes. They enable a composition-based approach that promotes code reuse without the limitations of inheritance.

## Purpose

Domain Helpers serve several key purposes:
- Eliminate code duplication across Use Cases
- Enable composition of functionality
- Maintain single responsibility for each helper
- Support testability by isolating specific functions
- Allow Use Cases to focus on orchestration rather than implementation details

## Helper Types

Our application includes several types of helpers:

1. **PriceMetricsHelper**: Functions related to price data and calculations
2. **VolumeMetricsHelper**: Functions related to volume calculations and market share
3. **Other specialized helpers**: Each focused on a specific domain concept

## Design Principles

The helpers follow these design principles:

1. **Stateless Operation**: Helpers contain only static methods without instance state
2. **Single Responsibility**: Each helper focuses on a specific domain concept
3. **Pure Functions**: Methods have minimal side effects and depend primarily on their inputs
4. **Domain-Focused**: Helper methods align with business domain terminology
5. **Composable**: Helpers can be used individually or together in various Use Cases

## Using Helpers in Use Cases

Use Cases can leverage multiple helpers as needed:

```typescript
import { PriceMetricsHelper, VolumeMetricsHelper } from '../../helpers';

export class AnalyticsUseCase {
  static async analyzeDex(dexId: string, timeFilter: TimeFilter) {
    // Use price-related helper
    const priceData = await PriceMetricsHelper.getAssetPriceData(dexId);
    
    // Use volume-related helper
    const [dexVolume, totalVolume] = await VolumeMetricsHelper.getVolumeData(dexId);
    const marketShare = VolumeMetricsHelper.calculateMarketShare(dexVolume, totalVolume);
    
    // Combine results and apply additional business logic
    return { priceData, marketShare };
  }
}
```

## Creating New Helpers

When implementing a new helper:

1. Create a single-purpose helper class with a descriptive name
2. Implement static methods that perform a specific function
3. Add the helper to the index.ts export
4. Refactor Use Cases to leverage the new helper

## Advantages Over Inheritance

The helpers approach provides several advantages over inheritance:

- **Flexibility**: Use Cases can combine helpers in any way needed
- **No inheritance hierarchy complexity**: Avoids deep inheritance chains
- **Easier testing**: Helpers can be tested in isolation
- **Simpler mental model**: Clear functional boundaries
- **No "diamond problem"**: Avoids multiple inheritance conflicts

## Best Practices

1. Keep helpers focused on a single domain concept
2. Document helper methods thoroughly
3. Write unit tests for helpers in isolation
4. Prefer pure functions where possible
5. Keep implementation details hidden from Use Cases
6. Use consistent naming conventions
7. Update the index.ts file when adding new helpers

Helpers are a powerful approach to code reuse that complements our Use Case architecture while avoiding the limitations of inheritance hierarchies.