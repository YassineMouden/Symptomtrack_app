import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import OpenAI from "openai";

export const aiRouter = createTRPCRouter({
  analyzeSymptoms: publicProcedure
    .input(z.object({
      symptoms: z.string().min(1, "Please describe your symptoms"),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const apiKey = String(ctx.openaiApiKey);
        if (!apiKey) {
          throw new Error("OpenAI API key is not configured");
        }

        const openai = new OpenAI({
          apiKey,
        });

        const completion = await openai.chat.completions.create({
          messages: [
            {
              role: "system",
              content: "You are a medical professional analyzing patient symptoms. Provide a detailed analysis of possible conditions, their descriptions, and suggested treatments. Be professional and clear.",
            },
            {
              role: "user",
              content: `Please analyze these symptoms: ${input.symptoms}`,
            },
          ],
          model: "gpt-3.5-turbo",
        });

        const analysis = completion.choices[0]?.message?.content;
        if (!analysis) {
          throw new Error("No analysis available from the AI model");
        }

        return { analysis };
      } catch (error) {
        console.error("Error analyzing symptoms:", error);
        if (error instanceof Error) {
          throw new Error(`Failed to analyze symptoms: ${error.message}`);
        }
        throw new Error("Failed to analyze symptoms");
      }
    }),
}); 