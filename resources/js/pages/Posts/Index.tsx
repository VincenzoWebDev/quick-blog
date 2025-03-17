import FrontLayout from "@/layouts/front-layout";
import { Link, router, useForm } from "@inertiajs/react";
import { STORAGE_URL } from "@/constants/constants";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";


const Index = ({ posts }: { posts: any }) => {

    const handleDelete = (e: any) => {
        e.preventDefault();
        const post = e.target.dataset.id;
        if (confirm('Sei sicuro di voler eliminare questo post?')) {
            router.delete(route('posts.destroy', post));
        }
    }

    return (
        <FrontLayout>
            <h1 className="font-bold text-3xl my-3">Lista Posts</h1>
            <Link href={route('posts.create')} className="bg-blue-500 hover:bg-blue-800 transition-all text-white p-2">Crea nuovo post</Link>
            <div className="grid grid-cols-4 gap-3 my-5">
                {posts.map((post: any) => (
                    <div className="bg-gray-100 p-4" key={post.id}>
                        <img src={STORAGE_URL + post.image_url} alt="Post 1" />
                        <h3 className="text-indigo-800 font-bold">{post.title}</h3>
                        <p className="text-gray-600">{post.content}</p>
                        <div className="flex justify-between mt-3">
                            {/* <button onClick={handleEdit} className="bg-green-600 hover:bg-green-800 transition-all text-white p-2">Modifica</button> */}
                            <Button onClick={handleDelete} data-id={post.id} className="bg-red-500 hover:bg-red-800 transition-all text-white p-2">Elimina</Button>
                            <EditForm post={post} />
                        </div>
                    </div>
                ))}
            </div>
        </FrontLayout>
    );
}

const EditForm = ({ post }: { post: any }) => {
    const [open, setOpen] = useState(false);
    const { data, setData, patch, errors, processing } = useForm({
        title: post.title,
        content: post.content
    });

    const handleChange = (e: any) => {
        e.preventDefault();
        setData(e.target.id, e.target.value);

    }
    const handleUpdate = (e: any) => {
        e.preventDefault();
        patch(route('posts.update', post.id), {
            onSuccess: () => {
                setOpen(false);
            },
            onError: () => {
                console.log(errors);
            }
        });
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-800 transition-all text-white p-2" onClick={() => setOpen(true)}>Modifica</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Modifica post</DialogTitle>
                    <DialogDescription>
                        Modifica i dettagli del post
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Name
                        </Label>
                        <Input id="title" value={data.title} className="col-span-3" onChange={handleChange} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="content" className="text-right">
                            Username
                        </Label>
                        <Input id="content" value={data.content} className="col-span-3" onChange={handleChange} />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleUpdate} disabled={processing}>{processing ? 'Salvataggio...' : 'Salva'}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default Index;