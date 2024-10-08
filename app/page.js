"use client"

import { useEffect, useState } from 'react';
import { generateText, generateImage, textToSpeech } from './apiService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { Loader2 } from 'lucide-react';
import TypewriterComponent from 'typewriter-effect';
import ImageCard from './ImageCard';

export default function Home() {
    const [apiKey, setApiKey] = useState('sj-pra5sc388oknwylt7pjmbt8f7ncqeo');
    const [input, setInput] = useState('');
    const [generatedText, setGeneratedText] = useState('');
    const [generatedImage, setGeneratedImage] = useState('');
    const [generatedAudio, setGeneratedAudio] = useState('');
    const [requestLogs, setRequestLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();


    useEffect(() => {
        const savedLogs = JSON.parse(localStorage.getItem('requestLogs')) || [];
        setRequestLogs(savedLogs);
    }, []);


    const logRequest = (type, status) => {
        const newLog = {
            type,
            status,
            time: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString(),
        };

        setRequestLogs((prevLogs) => {
            const updatedLogs = [...prevLogs, newLog];
            localStorage.setItem('requestLogs', JSON.stringify(updatedLogs));
            return updatedLogs;
        });

    };

    const handleGenerateText = async () => {
        try {
            setLoading(true);
            const response = await generateText(input, apiKey);
            setGeneratedText(response.choices[0].message.content);
            logRequest('Text Generation', 'Success');
            toast({ title: 'Text Generated', description: 'Text generation was successful.' });
        } catch {
            logRequest('Text Generation', 'Failed');
            toast({ title: 'Error', description: 'Text generation failed.', variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateImage = async () => {
        try {
          setLoading(true);
          const response = await generateImage(input, apiKey); 
          setGeneratedImage(`/api/image-proxy?url=${encodeURIComponent(response.data[0].url)}`);
          logRequest('Image Generation', 'Success');
          toast({ title: 'Image Generated', description: 'Image generation was successful.' });
        } catch {
          logRequest('Image Generation', 'Failed');
        } finally {
          setLoading(false);
        }
      };
      

    const handleGenerateAudio = async () => {
        try {
            setLoading(true);
            const response = await textToSpeech(input, apiKey);
            setGeneratedAudio(response.audio_url);
            logRequest('Audio Generation', 'Success');
            toast({ title: 'Audio Generated', description: 'Audio generation was successful.' });
        } catch {
            logRequest('Audio Generation', 'Failed');
            toast({ title: 'Error', description: 'Audio generation failed.', variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Generate Content</CardTitle>
                </CardHeader>
                <CardContent>
                    <Input
                        type="text"
                        placeholder="Enter a prompt"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="mb-4"
                    />
                    <div className="flex justify-center items-center gap-4 flex-col sm:flex-row flex-1">
                        <Button className="w-full" onClick={handleGenerateText} disabled={!apiKey || loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Generate Text
                        </Button>
                        <Button className="w-full" onClick={handleGenerateImage} disabled={!apiKey || loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Generate Image
                        </Button>
                        <Button className="w-full" onClick={handleGenerateAudio} disabled={!apiKey || loading || true}>
                            {/* {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} */}
                            Generate Audio <span className='text-[10px] pl-1'>(premium)</span>
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {generatedText && (
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Generated Text</CardTitle>
                    </CardHeader>
                    <CardContent className="whitespace-pre-wrap">
                        <TypewriterComponent
                            key={key}
                            options={{
                                strings: generatedText,
                                autoStart: true,
                                loop: false,
                                delay: 10,
                                cursor: '|',
                            }}
                        />
                    </CardContent>

                </Card>
            )}
            {generatedImage && (
                <ImageCard generatedImage={generatedImage}/>
            )}
            {generatedAudio && (
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Generated Audio</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <audio controls src={generatedAudio} />
                    </CardContent>
                </Card>
            )}

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Request Logs</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul>
                        {[...requestLogs].reverse().map((log, index) => (
                            <li key={index}>
                                {log.date} {log.time} - {log.type} - {log.status}
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>API Key Configuration</CardTitle>
                </CardHeader>
                <CardContent>
                    <Input
                        type="text"
                        placeholder="Enter your API key"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="mb-4"
                    />
                    {apiKey && (
                        <p className="text-sm text-gray-600">
                            <strong>Current API Key:</strong> {apiKey}
                        </p>
                    )}
                </CardContent>
            </Card>

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Version 1.0<span className="text-xs pl-2">Build From Scratch - D.Raj</span></CardTitle>
                </CardHeader>
            </Card>
            <Toaster position="top-right" />
        </div>
    );
}
