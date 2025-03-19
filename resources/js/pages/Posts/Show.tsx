import { Button } from "@/components/ui/button";
import { STORAGE_URL } from "@/constants/constants";
import FrontLayout from "@/layouts/front-layout";
import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";


interface Message {
    id: number;
    content: string;
    user: {
        name: string;
    };
}

export default function Show({ post }: { post: any }) {
    const [comments, setComments] = useState<Message[]>(post.comments);
    const { data, setData, post: submitComment, reset, errors, processing } = useForm({
        content: ''
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const postId = e.target.dataset.id;
        submitComment(route('comments.store', postId), {
            onSuccess: () => reset('content')
        });
    };

    // Ascolta l'evento broadcast
    useEffect(() => {
        const echo = window.Echo.private(`comments.${post.id}`)
            .listen('.new.comment', (e: any) => {
                setComments((prevComments) => [...prevComments, e.comment]);
                window.scrollTo(0, document.body.scrollHeight);
            });

        return () => {
            echo.stopListening('.new.comment');
        };
    }, []);

    return (
        <FrontLayout>
            <img src={STORAGE_URL + post.image_url} alt={post.title} className="w-full h-96 object-cover" />
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <p>{post.content}</p>

            <h2 className="mt-6 text-2xl">Commenti</h2>
            <form onSubmit={handleSubmit} data-id={post.id} className="mt-4">
                <div className="text-red-500">{errors.content}</div>
                <input
                    type="text"
                    value={data.content}
                    onChange={(e) => setData('content', e.target.value)}
                    placeholder="Scrivi un commento"
                    className="border rounded w-full p-2"
                />
                <div className="flex mt-5">
                    <Button type="submit" className="bg-blue-500 hover:bg-blue-800 transition-all text-white p-2 me-3">
                        Invia
                    </Button>
                    <Button onClick={(e) => router.get(route('posts.index'))} type="button" className="bg-red-500 hover:bg-red-800 transition-all text-white p-2">Indietro</Button>
                </div>
            </form>

            <div className="mt-6 space-y-2">
                {comments.map((comment: { id: number, user: { name: string }, content: string }) => (
                    <div key={comment.id} className="border p-2 rounded">
                        <strong>{comment.user.name}:</strong> {comment.content}
                    </div>
                ))}
            </div>
        </FrontLayout>
    );

}