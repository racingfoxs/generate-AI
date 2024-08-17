import axios from 'axios';

export const generateText = async (prompt, apiKey='sj-d42f54zdnmyoul9qcmvwugq7l986d2') => {
  const response = await axios.post(
    'https://shadowjourney.us.to/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

export const generateImage = async (prompt, apiKey='sj-0zuo787d8dk9w8ejt7ay5uk8fmt5x4') => {
  const response = await axios.post(
    'https://shadowjourney.us.to/v1/images/generations',
    {
      prompt,
      model: 'dalle-3',
      n: 1,
      size: '1024x1024',
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

export const textToSpeech = async (text, apiKey='sj-0zuo787d8dk9w8ejt7ay5uk8fmt5x4') => {
  const response = await axios.post(
    'https://shadowjourney.us.to/v1/audio/texttospeech',
    { text, model: 'male' },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};
