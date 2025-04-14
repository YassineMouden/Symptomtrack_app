import { NextResponse } from 'next/server';
import OpenAI from 'openai';

interface RequestBody {
  symptoms: string;
}

const OpenAIConstructor = OpenAI as unknown as new (config: { apiKey: string }) => {
  chat: {
    completions: {
      create: (params: {
        messages: Array<{ role: string; content: string }>;
        model: string;
      }) => Promise<{
        choices: Array<{
          message: {
            content: string;
          };
        }>;
      }>;
    };
  };
};

export async function POST(request: Request) {
  try {
    // Log the API key status (without exposing the actual key)
    console.log('OpenAI API Key configured:', !!process.env.OPENAI_API_KEY);

    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key is missing');
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      );
    }

    const body = await request.json() as RequestBody;
    const { symptoms } = body;

    if (!symptoms) {
      return NextResponse.json(
        { error: 'Symptoms are required' },
        { status: 400 }
      );
    }

    console.log('Creating OpenAI instance...');
    const openai = new OpenAIConstructor({
      apiKey: process.env.OPENAI_API_KEY,
    });

    console.log('Sending request to OpenAI...');
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a medical professional analyzing patient symptoms. Provide a detailed analysis of possible conditions, their descriptions, and suggested treatments. Be professional and clear.',
        },
        {
          role: 'user',
          content: `Please analyze these symptoms: ${symptoms}`,
        },
      ],
      model: 'gpt-3.5-turbo',
    });

    console.log('Received response from OpenAI');
    const analysis = completion.choices[0]?.message?.content ?? 'No analysis available.';

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error('Detailed error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to analyze symptoms';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 