'use server';

/**
 * @fileOverview A presence detection and automation AI agent.
 *
 * - presenceBasedAutomation - A function that handles the presence detection and automation process.
 * - PresenceBasedAutomationInput - The input type for the presenceBasedAutomation function.
 * - PresenceBasedAutomationOutput - The return type for the presenceBasedAutomation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PresenceBasedAutomationInputSchema = z.object({
  zoneDetections: z.array(
    z.object({
      zoneId: z.string().describe('The ID of the zone.'),
      isPresent: z.boolean().describe('Whether or not a person is present in the zone.'),
    })
  ).describe('An array of zone detections.'),
  preProgrammedResponses: z.array(
    z.object({
      zoneId: z.string().describe('The ID of the zone to trigger on.'),
      response: z.string().describe('The automated response to trigger.'),
    })
  ).describe('An array of pre-programmed responses.'),
});
export type PresenceBasedAutomationInput = z.infer<typeof PresenceBasedAutomationInputSchema>;

const PresenceBasedAutomationOutputSchema = z.object({
  triggeredResponses: z.array(
    z.string().describe('The list of triggered automated responses.')
  ).describe('The triggered automated responses based on zone presence.'),
});
export type PresenceBasedAutomationOutput = z.infer<typeof PresenceBasedAutomationOutputSchema>;

export async function presenceBasedAutomation(input: PresenceBasedAutomationInput): Promise<PresenceBasedAutomationOutput> {
  return presenceBasedAutomationFlow(input);
}

const presenceBasedAutomationPrompt = ai.definePrompt({
  name: 'presenceBasedAutomationPrompt',
  input: {schema: PresenceBasedAutomationInputSchema},
  output: {schema: PresenceBasedAutomationOutputSchema},
  prompt: `You are an AI responsible for triggering automated responses based on visual presence in defined zones.

You are provided with an array of zone detections, where each detection indicates whether a person is present in a specific zone.

You are also provided with an array of pre-programmed responses, where each response is associated with a specific zone.

Your task is to identify which zones have presence and trigger the corresponding pre-programmed responses.

Zone Detections:
{{#each zoneDetections}}
- Zone ID: {{this.zoneId}}, Presence: {{this.isPresent}}
{{/each}}

Pre-programmed Responses:
{{#each preProgrammedResponses}}
- Zone ID: {{this.zoneId}}, Response: {{this.response}}
{{/each}}

Trigger the responses for zones where presence is detected. Return a list of the triggered responses.

Output the triggered responses as a JSON array of strings.

Here's the output:
{
  "triggeredResponses": [
    {{#each preProgrammedResponses}}
      {{#if this.isPresent}}
       "{{this.response}}",
      {{/if}}
    {{/each}}
  ]
}
`,
});

const presenceBasedAutomationFlow = ai.defineFlow(
  {
    name: 'presenceBasedAutomationFlow',
    inputSchema: PresenceBasedAutomationInputSchema,
    outputSchema: PresenceBasedAutomationOutputSchema,
  },
  async input => {
    const triggeredResponses: string[] = [];

    input.zoneDetections.forEach(detection => {
      const matchingResponse = input.preProgrammedResponses.find(response => response.zoneId === detection.zoneId);
      if (detection.isPresent && matchingResponse) {
        triggeredResponses.push(matchingResponse.response);
      }
    });

    return {
      triggeredResponses: triggeredResponses,
    };

  }
);
