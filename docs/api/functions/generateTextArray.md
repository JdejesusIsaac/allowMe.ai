[@elizaos/core v0.1.6-alpha.4](../index.md) / generateTextArray

# Function: generateTextArray()

> **generateTextArray**(`opts`): `Promise`\<`string`[]\>

Send a message to the model and parse the response as a string array

## Parameters

• **opts**

The options for the generateText request

• **opts.runtime**: [`IAgentRuntime`](../interfaces/IAgentRuntime.md)

• **opts.context**: `string`

The context/prompt to send to the model

• **opts.modelClass**: `string`

## Returns

`Promise`\<`string`[]\>

Promise resolving to an array of strings parsed from the model's response

## Defined in

[packages/core/src/generation.ts:764](https://github.com/elizaos/eliza/blob/main/packages/core/src/generation.ts#L764)
